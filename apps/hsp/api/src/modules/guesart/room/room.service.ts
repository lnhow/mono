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
  ERoomTheme,
} from './room.type'
import { RoomStatus } from 'generated/prisma'
import { OnGatewayInit } from '@nestjs/websockets'
import {
  buildChatMessage,
  buildSystemMessage,
  calcPoints,
  capitalizeFirstLetter,
  DEFAULT_DATE,
  socketRoomId,
  socketUserRoomId,
} from './utils'
import { ObjectId } from 'mongodb'
import WordRepository, { RandomRepository } from './word.repository'
import { sleep } from 'src/_utils/sleep'

const PREFIX_VALIDATION = 'Validation:' as const

@Injectable()
export class GrtRoomService
  implements OnGatewayInit<GrtServer>, OnModuleDestroy
{
  async create(
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

  async validate(client: GrtSocket, data: RoomBaseDto) {
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

      const { isUserInRoom, isHostInRoom } = room.users.reduce(
        (acc, user) => {
          if (user.userId === session.userId) {
            acc.isUserInRoom = true
          }
          if (user.userId === room.host.id) {
            acc.isHostInRoom = true
          }
          return acc
        },
        { isUserInRoom: false, isHostInRoom: false },
      )

      if (room.status !== RoomStatus.waiting && !isUserInRoom) {
        throw new Error(`${PREFIX_VALIDATION}Room is not waiting`)
      }

      if (
        room.maxUsers - room.users.length <= 1 &&
        !isHostInRoom &&
        room.host.id !== session.userId
      ) {
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
        EServerToClientEvents.ROOM_VALIDATE,
        {
          message:
            e instanceof Error && e.message.startsWith(PREFIX_VALIDATION)
              ? e.message.substring(PREFIX_VALIDATION.length)
              : 'Unknown error',
        },
      )
    }
  }

  async join(client: GrtSocket, data: RoomBaseDto) {
    const session = GrtSessionService.extractSession(client)
    try {
      const tx = await this.prisma.$transaction(async (tx) => {
        await this.validate(client, data)
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
      await Promise.all([
        client.join(socketRoom),
        client.join(socketUserRoomId(data.roomId, session.userId)),
      ])
      client.data.currentRoomId = data.roomId
      this.server
        .to(socketRoom)
        .emit(
          EServerToClientEvents.MSG_SYSTEM,
          buildSystemMessage(ESystemMessageContent.JOIN_ROOM, session),
        )

      await Promise.all([
        client.emit(EServerToClientEvents.ROOM_JOIN, {
          data: tx,
        }),
        this.emitUpdatedUserInfo(data.roomId),
        this._emitCurrentRoundInfo(client),
      ])

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

  async leave(client: GrtSocket) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId

    if (!roomId) {
      return null
    }

    const socketRoom = socketRoomId(roomId)
    await Promise.all([
      client.leave(socketRoom),
      client.leave(socketUserRoomId(roomId, session.userId)),
    ])
    client.data.currentRoomId = null

    const tx = await this.prisma.$transaction(async (tx) => {
      const room = await tx.room.findUnique({
        where: {
          id: roomId,
        },
        select: {
          status: true,
          users: {
            where: {
              isValid: true,
              isActive: true,
            },
          },
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
          // There are 2 cases while playing:
          // 1. User is the last user in the room => Invalidate room
          // 2. User is not the last user in the room
          status:
            room.users.length === 1 && room.status === RoomStatus.playing
              ? RoomStatus.finished
              : room.status,
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
    await this.emitUpdatedUserInfo(roomId)

    return tx
  }

  private async _emitCurrentRoundInfo(client: GrtSocket) {
    const { userId } = GrtSessionService.extractSession(client)
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
        drawerUserId: true,
        answer: true,
        endTime: true,
        room: {
          select: {
            theme: true,
          },
        },
      },
    })
    if (!roomRound) {
      return
    }
    const isDrawer = roomRound.drawerUserId === userId
    if (isDrawer) {
      return client.emit(EServerToClientEvents.ROUND_NEXT, {
        round: roomRound.roundNumber,
        drawer: roomRound.drawerUserId,
        word: capitalizeFirstLetter(roomRound.answer),
        wordImg: WordRepository.findWordImage(
          roomRound.room.theme as ERoomTheme,
          roomRound.answer,
        ),
        endAt: roomRound.endTime.getTime(),
      })
    }

    return client.emit(EServerToClientEvents.ROUND_NEXT, {
      round: roomRound.roundNumber,
      drawer: roomRound.drawerUserId,
      word: WordRepository.obstructWord(roomRound.answer),
    })
  }

  // Handle chat and guess messages
  async chat(client: GrtSocket, data: RoomChatRequestDto) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId
    const now = Date.now()
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
        drawerUserId: true,
        duration: true,
        endTime: true,
      },
    })

    // Validate guess
    const answer = roomRound && roomRound.answer.toLocaleLowerCase()
    const guess = data.content.toLocaleLowerCase()
    const isCorrectGuess = guess.includes(answer)

    if (!roomRound || !isCorrectGuess) {
      this.server
        .to(socketRoomId(roomId))
        .emit(
          EServerToClientEvents.MSG_CHAT,
          buildChatMessage(data.content, session),
        )
      client.emit(EServerToClientEvents.WORD_HINT, {
        word: capitalizeFirstLetter(
          WordRepository.unobstructWord(answer, guess),
        ),
      })
      return
    }

    const isCorrectUser = roomRound.correctUsers.some(
      (user) => user === session.userId,
    )
    if (isCorrectUser) {
      client.emit(
        EServerToClientEvents.MSG_SYSTEM,
        buildSystemMessage(
          ESystemMessageContent.GUESS_ALREADY_CORRECT,
          session,
        ),
      )
      return
    }

    const isDrawer = roomRound.drawerUserId === session.userId
    if (isDrawer) {
      client.emit(
        EServerToClientEvents.MSG_SYSTEM,
        buildSystemMessage(ESystemMessageContent.DRAWER_GUESS_BLOCKED, session),
      )
      return
    }

    const points = calcPoints({
      now,
      endAt: roomRound.endTime.getTime(),
      total: roomRound.duration * 1000,
    })
    try {
      const [txResult, roomUsers] = await Promise.all([
        this.prisma.$transaction(async (tx) => {
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
            // Update guesser point
            this._updateUserScore(tx, {
              roomId,
              userId: session.userId,
              increment: points.guesser,
            }),
            // Update drawer points
            this._updateUserScore(tx, {
              roomId,
              userId: roomRound.drawerUserId,
              increment: points.drawer,
            }),
          ])
        }),
        this.prisma.roomUser.count({
          where: {
            roomId: roomId,
            isActive: true,
            isValid: true,
          },
        }),
      ])

      await Promise.all([
        this.emitUpdatedUserInfo(roomId),
        txResult[0].correctUsers.length >= roomUsers - 1
          ? this.endRound(client, roomRound.roundNumber)
          : Promise.resolve(),
        this.server
          .to(socketRoomId(roomId))
          .emit(
            EServerToClientEvents.MSG_SYSTEM,
            buildSystemMessage(ESystemMessageContent.GUESS_CORRECT, session),
          ),
        client.emit(EServerToClientEvents.WORD_HINT, {
          word: capitalizeFirstLetter(answer),
        }),
      ])
    } catch (e) {
      this.logger.error(e)
    }
  }

  private _updateUserScore(
    prisma: Parameters<Parameters<PrismaService['$transaction']>[0]>[0],
    {
      roomId,
      userId,
      increment,
    }: { roomId: string; userId: string; increment: number },
  ) {
    return prisma.roomUser.update({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
      data: {
        score: {
          increment,
        },
      },
    })
  }

  async emitUpdatedUserInfo(roomId: string) {
    try {
      const roomUsers = await this.prisma.roomUser.findMany({
        where: {
          roomId,
          isActive: true,
          isValid: true,
        },
        select: {
          userId: true,
          userName: true,
          score: true,
        },
        orderBy: {
          score: 'desc',
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
  async draw(
    client: GrtSocket,
    data: GrtClientToServerEventsPayload<EClientToServerEvents.CANVAS>,
  ) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId
    console.log('\x1B[35m[Dev log]\x1B[0m -> roomId:', roomId)
    if (!roomId) {
      return
    }
    const roomRound = await this.prisma.roomRound.findFirst({
      where: {
        roomId: roomId,
        drawerUserId: session.userId,
        isActive: true,
      },
      select: {
        id: true,
        roundNumber: true,
        drawerUserId: true,
      },
    })
    console.log('\x1B[35m[Dev log]\x1B[0m -> roomRound:', roomRound)
    if (!roomRound) {
      return
    }

    client.to(socketRoomId(roomId)).emit(EServerToClientEvents.CANVAS, data)
  }

  // Change room status to playing
  async startGame(client: GrtSocket) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId
    if (!roomId) {
      return
    }
    try {
      const room = await this.prisma.room.findUnique({
        where: {
          id: roomId,
          status: RoomStatus.waiting,
        },
        select: {
          id: true,
          status: true,
          host: true,
          _count: {
            select: {
              users: true,
            },
          },
        },
      })

      if (!room || room.host.id !== session.userId) {
        return
      }

      if (room._count.users < 2) {
        client.emit(
          EServerToClientEvents.ERROR,
          EGrtErrorCode.ROOM_NOT_ENOUGH_USER,
        )
        return
      }

      await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          status: RoomStatus.playing,
        },
      })

      await this._nextRound(roomId)
    } catch (e) {
      this.logger.error(e)
      return
    }
  }

  // Pick a word & drawer for a round
  private async _nextRound(roomId: string) {
    try {
      const room = await this.prisma.room.findUnique({
        where: {
          id: roomId,
        },
        include: {
          users: {
            where: {
              isActive: true,
              isValid: true,
            },
          },
          rounds: true,
        },
      })

      if (!room) {
        return
      }
      const users = room.users
      const rounds = room.rounds
      const userIds = users.map((user) => user.userId)
      const prevRounds = rounds.reduce(
        (acc, round) => {
          acc.drawers.push(round.drawerUserId)
          acc.answers.push(round.answer)
          return acc
        },
        { drawers: [], answers: [] } as {
          drawers: string[]
          answers: string[]
        },
      )

      const word = WordRepository.getRandomWord(
        room.theme as ERoomTheme,
        prevRounds.answers,
      )
      const nextRoundDrawer = RandomRepository.getRandomArray(
        userIds,
        (userId) => {
          return !prevRounds.drawers.includes(userId)
        },
      )

      const roomRound = await this.prisma.roomRound.create({
        data: {
          roomId,
          roundNumber: rounds.length + 1,
          drawerUserId: nextRoundDrawer,
          answer: word.word,
          isActive: true,
          correctUsers: [],
          startTime: DEFAULT_DATE,
          endTime: DEFAULT_DATE,
          duration: room.timePerRoundInSec,
        },
      })

      const userRoom = socketUserRoomId(roomId, nextRoundDrawer)
      // Emit to drawer
      this.server.to(userRoom).emit(EServerToClientEvents.ROUND_NEXT, {
        round: roomRound.roundNumber,
        drawer: roomRound.drawerUserId,
        word: capitalizeFirstLetter(word.word),
        wordImg: word.wordImg,
      })

      this.server
        .in(socketRoomId(roomId))
        .except(userRoom)
        .emit(EServerToClientEvents.ROUND_NEXT, {
          round: roomRound.roundNumber,
          drawer: roomRound.drawerUserId,
          word: WordRepository.obstructWord(word.word),
        })
    } catch (e) {
      this.logger.error(e)
    }
  }

  // Confirm round start by drawer
  async startRound(client: GrtSocket) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId
    if (!roomId) {
      return
    }
    try {
      const roomRound = await this.prisma.roomRound.findFirst({
        where: {
          roomId,
          isActive: true,
          drawerUserId: session.userId,
        },
        select: {
          id: true,
          duration: true,
        },
      })

      if (!roomRound) {
        return
      }
      const startTime = new Date()
      const endTime = new Date(startTime.getTime() + roomRound.duration * 1000)

      await this.prisma.roomRound.update({
        where: {
          id: roomRound.id,
        },
        data: {
          startTime,
          endTime,
        },
      })

      this.server
        .in(socketRoomId(roomId))
        .emit(EServerToClientEvents.ROUND_START, {
          endAt: endTime.getTime(),
        })
    } catch (e) {
      this.logger.error(e)
    }
  }

  // Show word to all players
  async endRound(client: GrtSocket, internalRoundNumber?: number) {
    const session = GrtSessionService.extractSession(client)
    const roomId = client.data.currentRoomId
    if (!roomId) {
      return
    }

    try {
      const round = await this.prisma.roomRound.findFirst({
        where: internalRoundNumber
          ? {
              roundNumber: internalRoundNumber,
              roomId,
              isActive: true,
            }
          : {
              drawerUserId: session.userId,
              roomId,
              isActive: true,
            },
        include: {
          room: {
            select: {
              numOfRounds: true,
              theme: true,
              _count: {
                select: {
                  rounds: true,
                },
              },
            },
          },
        },
      })

      if (!round) {
        return
      }

      const resUpdate = await this.prisma.roomRound.update({
        where: {
          id: round.id,
        },
        data: {
          isActive: false,
        },
        select: {
          answer: true,
        },
      })

      this.server
        .in(socketRoomId(roomId))
        .emit(EServerToClientEvents.ROUND_END, {
          word: capitalizeFirstLetter(resUpdate.answer),
          wordImg: WordRepository.findWordImage(
            round.room.theme as ERoomTheme,
            resUpdate.answer,
          ),
          isLastRound: round.room._count.rounds >= round.room.numOfRounds,
        })
      await sleep(10000)

      if (round.room._count.rounds >= round.room.numOfRounds) {
        await this._endGame(roomId)
        return
      }
      await this._nextRound(roomId)
    } catch (error) {
      this.logger.log(error)
    }
  }

  // Show leaderboard & end game
  private async _endGame(roomId: string) {
    try {
      await this.prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          status: RoomStatus.finished,
        },
      })
      this.server.emit(EServerToClientEvents.GAME_END)
    } catch (error) {
      this.logger.error(error)
    }
  }

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
