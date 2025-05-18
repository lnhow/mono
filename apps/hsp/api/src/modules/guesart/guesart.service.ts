import { Injectable, Logger } from '@nestjs/common'
import {
  GrtServer,
  GrtSocket,
  GrtClientToServerEventsPayload,
  EClientToServerEvents,
  GrtWsResponse,
  GrtServerToClientEventsPayload,
  EServerToClientEvents,
} from './types/ws'
import { randomUUID } from 'crypto'
import { OnGatewayInit } from '@nestjs/websockets'
import { GrtSessionService } from './session/session.service'
import { ChatResponseDto, ESystemMessageContent } from './types/dto'

@Injectable()
export class GrtService implements OnGatewayInit<GrtServer> {
  private readonly logger: Logger = new Logger(GrtService.name)
  private server: GrtServer

  // joinRoom
  // leaveRoom
  // createRoom
  // startGame
  // endGame
  // startRound

  handleChat(
    client: GrtSocket,
    data: GrtClientToServerEventsPayload<EClientToServerEvents.CHAT>,
  ): GrtWsResponse<EServerToClientEvents.MSG_CHAT> {
    const session = GrtSessionService.extractSession(client)
    const res: GrtServerToClientEventsPayload<EServerToClientEvents.MSG_CHAT> =
      {
        id: randomUUID(),
        content: data.content,
        user: {
          id: session.userId,
          name: session.userName,
        },
      }

    client.broadcast.emit(EServerToClientEvents.MSG_CHAT, res) // broadcast to all clients except the sender
    return {
      event: EServerToClientEvents.MSG_CHAT,
      data: res,
    }
  }

  broadcastCanvas(client: GrtSocket, canvasDataUrl: string) {
    client.broadcast.emit(EServerToClientEvents.CANVAS, canvasDataUrl)
  }

  async onClientConnect(client: GrtSocket) {
    const session = GrtSessionService.extractSession(client)
    client.emit(EServerToClientEvents.SESSION, session)
    const res: ChatResponseDto = {
      id: randomUUID(),
      content: ESystemMessageContent.JOIN_ROOM,
      user: {
        id: session.userId,
        name: session.userName,
      },
    }

    client.emit(EServerToClientEvents.MSG_SYSTEM, res)
    const clientsCount = await this.getClientCount()
    this.logger.log(
      `Client connected: ${client.id} [UID: ${session.userId}, Count: ${clientsCount}]`,
    )
  }

  onClientDisconnect(client: GrtSocket) {
    const session = GrtSessionService.extractSession(client)
    this.logger.log(
      `Client disconnected: ${client.id} [UID: ${session.userId}]`,
    )
    const res: ChatResponseDto = {
      id: randomUUID(),
      content: ESystemMessageContent.LEAVE_ROOM,
      user: {
        id: session.userId,
        name: session.userName,
      },
    }

    this.server.emit(EServerToClientEvents.MSG_SYSTEM, res)
  }

  async getClientCount(): Promise<number> {
    const clients = await this.server.fetchSockets()
    return clients.length
  }

  afterInit(server: GrtServer) {
    this.server = server
    this.logger.log('GuesartService initialized')
  }
}
