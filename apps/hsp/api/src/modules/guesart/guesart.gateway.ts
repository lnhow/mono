import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  MessageBody,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io'

// Messages that client accepts (i.e. Server sends)
export enum CLIENT_EVENTS {
  CONNECT_CONFIRM = 'connect-confirm',
  ECHO = 'echo',
  N_CLIENTS = 'n-clients',
}

@WebSocketGateway({
  namespace: '/guesart',
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
      event: CLIENT_EVENTS.ECHO,
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
      event: CLIENT_EVENTS.N_CLIENTS,
      data: res,
    }
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
    this.server.to(client.id).emit(CLIENT_EVENTS.CONNECT_CONFIRM, {
      data: message,
    })
    this.logger.log(
      `Client connected: ${client.id} - [Clients: ${clientsCount}]`,
    )
  }
}
