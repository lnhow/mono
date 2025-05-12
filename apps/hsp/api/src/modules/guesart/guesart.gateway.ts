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
import { Inject, Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io'
import { MessageReqDto, MessageResDto, RES_EVENTS } from './guesart.type'
import { GuesartService } from './guesart.service'

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

  constructor(
    @Inject(GuesartService)
    private service: GuesartService,
  ) {}

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
    return this.service.handleChat(client, data)
  }

  @SubscribeMessage('send-canvas')
  public handleSendCanvas(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string, // Canvas data URL
  ): void {
    this.service.broadcastCanvas(client, data)
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

  public handleDisconnect(client: Socket) {
    this.service.onClientDisconnect(this.server, client)
  }

  public async handleConnection(client: Socket) {
    await this.service.onClientConnect(this.server, client)
  }
}
