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
import { RoomBaseDto, RoomCreateRequestDto } from './room/room.type'

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
    @MessageBody()
    data: RoomCreateRequestDto,
  ): Promise<GrtWsResponse<EServerToClientEvents.ROOM_CREATE>> {
    const roomData = await this.roomService.create(client, data)

    return {
      event: EServerToClientEvents.ROOM_CREATE,
      data: {
        data: roomData,
      },
    }
  }

  @SubscribeMessage(EClientToServerEvents.ROOM_VALIDATE)
  public async handleRoomValidate(
    @ConnectedSocket() client: GrtSocket,
    @MessageBody()
    data: RoomBaseDto,
  ): Promise<GrtWsResponse<EServerToClientEvents.ROOM_VALIDATE>> {
    const roomData = await this.roomService.validate(client, data)
    return {
      event: EServerToClientEvents.ROOM_VALIDATE,
      data: {
        data: {
          roomId: roomData.id,
        },
      },
    }
  }

  @SubscribeMessage(EClientToServerEvents.ROOM_JOIN)
  public async handleRoomJoin(
    @ConnectedSocket() client: GrtSocket,
    @MessageBody()
    data: RoomBaseDto,
  ) {
    if (!data.roomId) {
      throw new GrtWsException(
        EGrtErrorCode.INVALID_DATA,
        EServerToClientEvents.ROOM_JOIN,
      )
    }
    const roomData = await this.roomService.join(client, data)

    return {
      event: EServerToClientEvents.ROOM_JOIN,
      data: {
        data: roomData,
      },
    }
  }

  @SubscribeMessage(EClientToServerEvents.ROOM_LEAVE)
  public async handleRoomLeave(@ConnectedSocket() client: GrtSocket) {
    const roomData = await this.roomService.leave(client)
    console.log('\x1B[35m[Dev log]\x1B[0m -> room leave -> roomData:', roomData)
  }

  @SubscribeMessage(EClientToServerEvents.GAME_START)
  public async handleRoomStartGame(@ConnectedSocket() client: GrtSocket) {
    await this.roomService.startGame(client)
  }

  @SubscribeMessage(EClientToServerEvents.ROUND_START)
  public async handleRoomStartRound(@ConnectedSocket() client: GrtSocket) {
    await this.roomService.startRound(client)
  }

  @SubscribeMessage(EClientToServerEvents.ROUND_END)
  public async handleRoomEndRound(@ConnectedSocket() client: GrtSocket) {
    await this.roomService.endRound(client)
  }

  @SubscribeMessage(EClientToServerEvents.CHAT)
  public async handleChat(
    @ConnectedSocket() client: GrtSocket,
    @MessageBody()
    data: GrtClientToServerEventsPayload<EClientToServerEvents.CHAT>,
  ) {
    await this.roomService.chat(client, data)
  }

  @SubscribeMessage(EClientToServerEvents.CANVAS)
  public async handleCanvas(
    @ConnectedSocket() client: GrtSocket,
    @MessageBody()
    data: GrtClientToServerEventsPayload<EClientToServerEvents.CANVAS>, // Canvas data URL
  ) {
    await this.roomService.draw(client, data)
  }

  // Called when client disconnects
  public async handleDisconnect(client: GrtSocket) {
    await Promise.allSettled([
      this.service.onClientDisconnect(client),
      this.roomService.leave(client),
    ])
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
    this.roomService.afterInit(server)
  }
}
