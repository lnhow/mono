import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io'
import { MessageReqDto, MessageResDto } from './guesart.dto'

// Messages that client accepts (i.e. Server sends)
export enum RES_EVENTS {
  CONNECT_CONFIRM = 'connect-confirm',
  ECHO = 'echo',
  N_CLIENTS = 'n-clients',
  CHAT = 'chat',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  RECEIVE_CANVAS = 'receive-canvas',
}

@WebSocketGateway({
  namespace: '/api/guesart/v1',
  cors: {
    origin: '*',
  },
})
export class GuesartGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server

  private logger: Logger = new Logger('GuesartGateway')

  async getClientCount(): Promise<number> {
    const clients = await this.server.fetchSockets()
    return clients.length
  }

  @SubscribeMessage('echo')
  public handleEcho(
    @MessageBody('data') data: string,
  ): WsResponse<{ data: string }> {
    console.log(`[echo] ${data}`)
    return {
      event: RES_EVENTS.ECHO,
      data: {
        data: `echo: ${data}`,
      },
    }
  }

  @SubscribeMessage('n-clients')
  public async handleGetClientCount(): Promise<
    WsResponse<{
      data: number
    }>
  > {
    const res = {
      data: await this.getClientCount(),
    }
    return {
      event: RES_EVENTS.N_CLIENTS,
      data: res,
    }
  }

  @SubscribeMessage('chat')
  public handleChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageReqDto,
  ): WsResponse<MessageResDto> {
    const res = {
      id: '1',
      content: data.content,
      sender: {
        id: client.id,
        name: 'John Doe' + Math.random(),
      },
    }

    client.broadcast.emit(RES_EVENTS.CHAT, res) // broadcast to all clients except the sender
    return {
      event: 'chat',
      data: res,
    }
  }

  @SubscribeMessage('send-canvas')
  public handleSendCanvas(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ): void {
    client.broadcast.emit(RES_EVENTS.RECEIVE_CANVAS, data)
  }

  // @SubscribeMessage('joinRoom')
  // public joinRoom(client: Socket, room: string): void {
  //   client.join(room);
  //   client.emit('joinedRoom', room);
  // }

  // @SubscribeMessage('leaveRoom')
  // public leaveRoom(client: Socket, room: string): void {
  //   client.leave(room);
  //   client.emit('leftRoom', room);
  // }

  public afterInit(): void {
    return this.logger.log('Init Gateway successfully')
  }

  public async handleDisconnect(client: Socket) {
    return this.logger.log(
      `Client disconnected: ${client.id} - [Clients: ${await this.getClientCount()}]`,
    )
  }

  public async handleConnection(client: Socket) {
    const clientsCount = await this.getClientCount()
    const message = `Client connected - ${clientsCount}`
    this.server.to(client.id).emit(RES_EVENTS.CONNECT_CONFIRM, {
      data: message,
    })

    this.logger.log(
      `Client connected: ${client.id} - [Clients: ${clientsCount}]`,
    )
  }
}
