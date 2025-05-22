import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import { PrismaService } from 'src/modules/_prisma/prisma.service'
import {
  EClientToServerEvents,
  EGrtErrorCode,
  EServerToClientEvents,
  GrtClientToServerEventsPayload,
  GrtServer,
  GrtSocket,
  GrtWsException,
} from '../types/ws'
import { GrtSessionService } from '../session/session.service'
import {
  ROOM_TIME_OPTIONS,
  RoomBaseDto,
  RoomChatRequestDto,
  RoomCreateResponseDto,
  ESystemMessageContent,
  RoomCreateRequestDto,
} from './room.type'
import { RoomStatus } from 'generated/prisma'
import { OnGatewayInit } from '@nestjs/websockets'
import { buildChatMessage, buildSystemMessage, socketRoomId } from './utils'
import { MAX_CORRECT_USERS } from './room.const'
import { ObjectId } from 'mongodb'

const PREFIX_VALIDATION = 'Validation:' as const

@Injectable()
export class GrtRoomService
  implements OnGatewayInit<GrtServer>, OnModuleDestroy
{
  async createRoom(
    client: GrtSocket,
    data: RoomCreateRequestDto,
  ): Promise<RoomCreateResponseDto> {
    const session = GrtSessionService.extractSession(client)

    const dataRoom = await this.prisma.room.create({
      data: {
        name: data.name,
        theme: data.theme,
        maxUsers: data.maxUsers,
        numOfRounds: data.numOfRounds,
        timePerRoundInSec: ROOM_TIME_OPTIONS[data.timeOption],
        host: {
          id: session.userId,
          name: session.userName,
        },
        // State
        status: RoomStatus.waiting,
      },
    })

    return {
      id: dataRoom.id,
    }
  }

  async validateRoom(client: GrtSocket, data: RoomBaseDto) {
    const session = GrtSessionService.extractSession(client)
    const roomId = data.roomId

    try {
      if (!roomId || !ObjectId.isValid(roomId)) {
        throw new Error(`${PREFIX_VALIDATION}Invalid roomId`)
      }
      const room = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
        include: {
          users: {
            where: {
              isValid: true,
            },
          },
        },
      })
      if (!room) {
        throw new GrtWsException(
          EGrtErrorCode.INVALID_DATA,
          EServerToClientEvents.ROOM_JOIN,
        )
      }

      const isUserInRoom = room.users.some(
        (user) => user.userId === session.userId,
      )

      if (room.status !== RoomStatus.waiting && !isUserInRoom) {
        throw new Error(`${PREFIX_VALIDATION}Room is not waiting`)
      }

      if (room.users.length === 0 && room.host.id !== session.userId) {
        throw new Error(`${PREFIX_VALIDATION}Host hasn't joined room`)
      }

      if (room.users.length >= room.maxUsers) {
        throw new Error(`${PREFIX_VALIDATION}Room is full`)
      }

      return room
    } catch (e) {
      // this.logger.error(e)
      throw new GrtWsException(
        EGrtErrorCode.INVALID_DATA,
        EServerToClientEvents.ROOM_JOIN,
        {
          message:
            e instanceof Error && e.message.startsWith(PREFIX_VALIDATION)
              ? e.message.substring(PREFIX_VALIDATION.length)
              : 'Unknown error',
        },
      )
    }
  }

  async joinRoom(client: GrtSocket, data: RoomBaseDto) {
    const session = GrtSessionService.extractSession(client)
    try {
      const tx = await this.prisma.$transaction(async (tx) => {
        await this.validateRoom(client, data)
        // room.status = RoomStatus.waiting && user joined room for the first time
        // || user rejoined room

        return await tx.room.update({
          where: {
            id: data.roomId,
          },
          data: {
            users: {
              upsert: {
                where: {
                  roomId_userId: {
                    roomId: data.roomId,
                    userId: session.userId,
                  },
                },
                create: {
                  userId: session.userId,
                  userName: session.userName,
                  isActive: true,
                  isValid: true,
                },
                update: {
                  isActive: true,
                  isValid: true,
                },
              },
            },
          },
        })
      })

      const socketRoom = socketRoomId(data.roomId)
      await client.join(socketRoom)
      client.data.currentRoomId = data.roomId
      this.server
        .to(socketRoom)
        .emit(
          EServerToClientEvents.MSG_SYSTEM,
          buildSystemMessage(ESystemMessageContent.JOIN_ROOM, session),
        )

      return tx
    } catch (e) {
      this.logger.error(e)
      if (e instanceof GrtWsException && e.message == 'Unknown error') {
        this.logger.error(e)
      }
      throw new GrtWsException(
        EGrtErrorCode.INVALID_DATA,
        EServerToClientEvents.ROOM_JOIN,
        {
          message:
            e instanceof Error && e.message.startsWith(PREFIX_VALIDATION)
              ? e.message.substring(PREFIX_VALIDATION.length)
              : 'Unknown error',
        },
      )
    }
  }

  async leaveRoom(client: GrtSocket) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId

    if (!roomId) {
      return null
    }

    const socketRoom = socketRoomId(roomId)
    await client.leave(socketRoom)
    client.data.currentRoomId = null

    const tx = await this.prisma.$transaction(async (tx) => {
      const room = await tx.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          status: true,
          users: true,
        },
      })
      if (!room) {
        return null
      }

      return await tx.room.update({
        where: {
          id: roomId,
        },
        data: {
          users: {
            update: {
              where: {
                roomId_userId: {
                  roomId,
                  userId: session.userId,
                },
              },
              data: {
                isActive: false,
                // Invalidate user to make room for other users to join if room is waiting
                isValid: room.status === RoomStatus.waiting ? false : true,
              },
            },
          },
        },
      })
    })

    if (!tx) {
      return null
    }
    this.server
      .to(socketRoom)
      .emit(
        EServerToClientEvents.MSG_SYSTEM,
        buildSystemMessage(ESystemMessageContent.LEAVE_ROOM, session),
      )

    return tx
  }

  // Handle chat and guess messages
  async handleRoomChat(client: GrtSocket, data: RoomChatRequestDto) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId
    if (!roomId) {
      return
    }

    const roomRound = await this.prisma.roomRound.findFirst({
      where: {
        roomId,
        isActive: true,
      },
      select: {
        id: true,
        roundNumber: true,
        answer: true,
        correctUsers: true,
      },
    })

    // Validate guess
    const answer = roomRound && roomRound.answer.toLocaleUpperCase()
    const guess = data.content.toLocaleUpperCase()
    const isCorrectGuess = guess.includes(answer)

    if (!roomRound || !isCorrectGuess) {
      this.server
        .to(socketRoomId(roomId))
        .emit(
          EServerToClientEvents.MSG_CHAT,
          buildChatMessage(data.content, session),
        )
      return
    }

    const isCorrectUser = roomRound.correctUsers.some(
      (user) => user === session.userId,
    )

    if (isCorrectUser && isCorrectGuess) {
      client.emit(
        EServerToClientEvents.MSG_SYSTEM,
        buildSystemMessage(
          ESystemMessageContent.GUESS_ALREADY_CORRECT,
          session,
        ),
      )
      return
    }

    try {
      const txResult = await this.prisma.$transaction(async (tx) => {
        const newCorrectUsers = [...roomRound.correctUsers, session.userId]
        return await Promise.all([
          tx.roomRound.update({
            where: {
              id: roomRound.id,
            },
            data: {
              correctUsers: newCorrectUsers,
            },
          }),
          tx.roomUser.update({
            where: {
              roomId_userId: {
                roomId,
                userId: session.userId,
              },
            },
            data: {
              score: {
                increment:
                  MAX_CORRECT_USERS - roomRound.correctUsers.length + 1,
              },
            },
          }),
        ])
      })

      this.server
        .to(socketRoomId(roomId))
        .emit(
          EServerToClientEvents.MSG_SYSTEM,
          buildSystemMessage(ESystemMessageContent.GUESS_CORRECT, session),
        )
      if (txResult[0].correctUsers.length >= MAX_CORRECT_USERS) {
        this._handleRoundEnd(roomId)
      }
      await this.emitUpdatedUserInfo(roomId)
    } catch (e) {
      this.logger.error(e)
    }
  }

  async emitUpdatedUserInfo(roomId: string) {
    try {
      const roomUsers = await this.prisma.roomUser.findMany({
        where: {
          roomId,
        },
        select: {
          userId: true,
          userName: true,
          score: true,
        },
      })
      this.server
        .to(socketRoomId(roomId))
        .emit(EServerToClientEvents.ROOM_USERS, roomUsers)
    } catch (e) {
      this.logger.error(e)
    }
  }

  // Handle canvas messages && validate drawer permissions
  handleRoomDraw(
    client: GrtSocket,
    data: GrtClientToServerEventsPayload<EClientToServerEvents.CANVAS>,
  ) {
    // const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId
    if (!roomId) {
      return
    }
    // const roomRound = await this.prisma.roomRound.findFirst({
    //   where: {
    //     roomId,
    //     isActive: true,
    //   },
    //   select: {
    //     id: true,
    //     roundNumber: true,
    //     drawerUserId: true,
    //   },
    // })
    // if (!roomRound || roomRound.drawerUserId !== session.userId) {
    //   return
    // }

    client.to(socketRoomId(roomId)).emit(EServerToClientEvents.CANVAS, data)
  }

  // Change room status to playing
  // async handleGameStart(client: GrtSocket) {
  // }

  // Pick a word & drawer for a round
  // private async _handleRoundStart() {
  // }

  // Confirm round start by drawer
  // async handleRoundStartConfirm(client: GrtSocket) {
  // }

  // private _handleRoundGuess() {}

  // Show word to all players
  private _handleRoundEnd(roomId: string) {
    console.log(
      '\x1B[35m[Dev log]\x1B[0m -> _handleRoundEnd -> roomId:',
      roomId,
    )
  }

  // Show leaderboard & end game
  // private _handleGameEnd() {}

  constructor(private prisma: PrismaService) {}

  afterInit(server: GrtServer) {
    this.server = server
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.prisma.roomUser.updateMany({
        where: {
          isValid: true,
        },
        data: {
          isActive: false,
          isValid: false,
        },
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  private server: GrtServer
  private readonly logger: Logger = new Logger(GrtRoomService.name)
}
