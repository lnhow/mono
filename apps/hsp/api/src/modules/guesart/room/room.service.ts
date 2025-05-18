import { Injectable } from '@nestjs/common'
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
  RoomCreateResponseDto,
} from './room.type'
import { RoomStatus, RoomUser } from 'generated/prisma'
import { OnGatewayInit } from '@nestjs/websockets'
import { ESystemMessageContent } from '../types/dto'
import { genMsgId, socketRoomId } from './utils'

@Injectable()
export class GrtRoomService implements OnGatewayInit<GrtServer> {
  constructor(private prisma: PrismaService) {}

  async createRoom(
    client: GrtSocket,
    data: GrtClientToServerEventsPayload<EClientToServerEvents.ROOM_CREATE>,
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

  async joinRoom(client: GrtSocket, data: RoomBaseDto) {
    const session = GrtSessionService.extractSession(client)
    const tx = await this.prisma.$transaction(async (tx) => {
      const room = await tx.room.findUnique({
        where: {
          id: data.roomId,
        },
      })

      if (!room) {
        throw new GrtWsException(
          EGrtErrorCode.INVALID_DATA,
          EServerToClientEvents.ROOM_CREATE,
          {
            message: 'Room not found',
          },
        )
      }

      const isUserInRoom = room.users.some((user) => user.id === session.userId)

      if (room.status !== RoomStatus.waiting && !isUserInRoom) {
        throw new GrtWsException(
          EGrtErrorCode.INVALID_DATA,
          EServerToClientEvents.ROOM_CREATE,
          {
            message: 'Room is not waiting',
          },
        )
      }

      if (room.users.length >= room.maxUsers) {
        throw new GrtWsException(
          EGrtErrorCode.INVALID_DATA,
          EServerToClientEvents.ROOM_CREATE,
          {
            message: 'Room is full',
          },
        )
      }

      // room.status = RoomStatus.waiting && user joined room for the first time
      // || user rejoined room

      const newUsersList = isUserInRoom
        ? room.users.map((user) => {
            if (user.id === session.userId) {
              return {
                ...user,
                name: session.userName,
                isActive: true,
              }
            }
            return user
          })
        : [
            ...room.users,
            {
              id: session.userId,
              name: session.userName,
              isActive: true,
            } as RoomUser,
          ]
      return await tx.room.update({
        where: {
          id: data.roomId,
        },
        data: {
          users: newUsersList,
        },
      })
    })

    const socketRoom = socketRoomId(data.roomId)
    await client.join(socketRoom)
    client.data.currentRoomId = data.roomId
    this.server.to(socketRoom).emit(EServerToClientEvents.MSG_SYSTEM, {
      id: genMsgId(),
      content: ESystemMessageContent.JOIN_ROOM,
      user: {
        id: session.userId,
        name: session.userName,
      },
    })

    console.log(tx)
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
      })
      if (!room) {
        return null
      }

      const newUsersList = room.users.map((user) => {
        if (user.id === session.userId) {
          return {
            ...user,
            isActive: false,
          }
        }
        return user
      })
      return await tx.room.update({
        where: {
          id: roomId,
        },
        data: {
          users: newUsersList,
        },
      })
    })
    if (!tx) {
      return null
    }
    this.server.to(socketRoom).emit(EServerToClientEvents.MSG_SYSTEM, {
      id: genMsgId(),
      content: ESystemMessageContent.LEAVE_ROOM,
      user: {
        id: session.userId,
        name: session.userName,
      },
    })
    return tx
  }

  afterInit(server: GrtServer) {
    this.server = server
  }

  private server: GrtServer
}
