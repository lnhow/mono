import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/_prisma/prisma.service'
import {
  EClientToServerEvents,
  GrtClientToServerEventsPayload,
  GrtSocket,
} from '../types/ws'
import { GrtSessionService } from '../session/session.service'
import { ROOM_TIME_OPTIONS, RoomCreateResponseDto } from './room.type'
import { RoomStatus } from 'generated/prisma'

@Injectable()
export class GrtRoomService {
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
}
