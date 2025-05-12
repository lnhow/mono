import { Injectable, Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import {
  MessageReqDto,
  MessageResDto,
  EMessageType,
  RES_EVENTS,
  ESystemMessageContent,
} from './guesart.type'
import { randomUUID } from 'crypto'
import { WsResponse } from '@nestjs/websockets'

@Injectable()
export class GuesartService {
  private readonly logger: Logger = new Logger('GuesartService')

  // joinRoom
  // leaveRoom
  // createRoom
  handleChat(client: Socket, data: MessageReqDto): WsResponse<MessageResDto> {
    const res: MessageResDto = {
      id: randomUUID(),
      type: EMessageType.USER,
      content: data.content,
      user: {
        id: client.id,
        name: 'John Doe' + Math.random(),
      },
    }

    client.broadcast.emit(RES_EVENTS.CHAT, res) // broadcast to all clients except the sender
    return {
      event: RES_EVENTS.CHAT,
      data: res,
    }
  }

  broadcastCanvas(client: Socket, canvasDataUrl: string) {
    client.broadcast.emit(RES_EVENTS.RECEIVE_CANVAS, canvasDataUrl)
  }

  async onClientConnect(server: Server, client: Socket) {
    const res: MessageResDto = {
      id: randomUUID(),
      type: EMessageType.SYSTEM,
      content: ESystemMessageContent.JOIN_ROOM,
      user: {
        id: client.id,
        name: 'John Doe' + Math.random(),
      },
    }

    client.emit(RES_EVENTS.CHAT, res)

    const clientsCount = await this._getClientCount(server)
    const message = `Client connected - ${clientsCount}`
    server.to(client.id).emit(RES_EVENTS.CONNECT_CONFIRM, {
      data: message,
    })

    this.logger.log(
      `Client connected: ${client.id} - [Clients: ${clientsCount}]`,
    )
  }

  onClientDisconnect(server: Server, client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
    const res: MessageResDto = {
      id: randomUUID(),
      type: EMessageType.SYSTEM,
      content: ESystemMessageContent.LEAVE_ROOM,
      user: {
        id: client.id,
        name: 'John Doe' + Math.random(),
      },
    }

    server.emit(RES_EVENTS.CHAT, res)
  }
  // sendCanvas
  // startGame
  // endGame
  // startRound

  async _getClientCount(server: Server): Promise<number> {
    const clients = await server.fetchSockets()
    return clients.length
  }
}
