import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets'
import {
  Inject,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  EGrtErrorCode,
  GrtServer,
  GrtSocket,
  GrtWsException,
  EClientToServerEvents,
  GrtClientToServerEventsPayload,
  GrtWsResponse,
  EServerToClientEvents,
} from './types/ws'
import { GrtService } from './guesart.service'
import { GrtSessionService } from './session/session.service'
import { GrtAuthGuard } from './guesart.guard'
import { GrtWsExceptionsFilter } from './guesart.exception'
import { GrtRoomService } from './room/room.service'
import { RoomCreateRequestDto } from './room/room.type'

@UseFilters(new GrtWsExceptionsFilter())
@UseGuards(GrtAuthGuard) // Run on every events, except handleConnection and handleDisconnect
@WebSocketGateway({
  namespace: '/api/guesart/v1',
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class GrtGateway
  implements OnGatewayInit<GrtServer>, OnGatewayConnection, OnGatewayDisconnect
{
  @UsePipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new GrtWsException(
          EGrtErrorCode.INVALID_DATA,
          EServerToClientEvents.ROOM_CREATE,
          errors,
        )
      },
    }),
  )
  @SubscribeMessage(EClientToServerEvents.ROOM_CREATE)
  public async handleRoomCreate(
    @ConnectedSocket() client: GrtSocket,
    @MessageBody('data')
    data: RoomCreateRequestDto,
  ): Promise<GrtWsResponse<EServerToClientEvents.ROOM_CREATE>> {
    const roomData = await this.roomService.createRoom(client, data)
    console.log('\x1B[35m[Dev log]\x1B[0m -> data:', data, roomData)

    return {
      event: EServerToClientEvents.ROOM_CREATE,
      data: {
        data: roomData,
      },
    }
  }
  @SubscribeMessage(EClientToServerEvents.ECHO)
  public handleEcho(
    @MessageBody('data')
    data: GrtClientToServerEventsPayload<EClientToServerEvents.ECHO>,
  ): GrtWsResponse<EServerToClientEvents.ECHO> {
    return {
      event: EServerToClientEvents.ECHO,
      data: {
        data: `echo: ${data}`,
      },
    }
  }

  @SubscribeMessage(EClientToServerEvents.CHAT)
  public handleChat(
    @ConnectedSocket() client: GrtSocket,
    @MessageBody()
    data: GrtClientToServerEventsPayload<EClientToServerEvents.CHAT>,
  ): GrtWsResponse<EServerToClientEvents.MSG_CHAT> {
    return this.service.handleChat(client, data)
  }

  @SubscribeMessage(EClientToServerEvents.CANVAS)
  public handleCanvas(
    @ConnectedSocket() client: GrtSocket,
    @MessageBody()
    data: GrtClientToServerEventsPayload<EClientToServerEvents.CANVAS>, // Canvas data URL
  ): void {
    this.service.broadcastCanvas(client, data)
  }

  public handleDisconnect(client: GrtSocket) {
    this.service.onClientDisconnect(client)
  }

  // Called after connection is established
  public async handleConnection(client: GrtSocket) {
    await this.service.onClientConnect(client)
  }

  constructor(
    @Inject(GrtService)
    private service: GrtService,
    @Inject(GrtSessionService)
    private sessionService: GrtSessionService,
    @Inject(GrtRoomService)
    private roomService: GrtRoomService,
  ) {}

  // After websocket server is initialized
  public afterInit(server: GrtServer): void {
    // Socket.io middleware - Called once, before any connection is established
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    server.use(async (socket, next) => {
      const session =
        await this.sessionService.getOrCreateSessionIfNotExist(socket)
      if (!session) {
        const err = new GrtWsException(EGrtErrorCode.INVALID_SESSION)
        return next(err)
      }

      socket.data.session = session
      next()
    })
    this.service.afterInit(server)
  }
}
