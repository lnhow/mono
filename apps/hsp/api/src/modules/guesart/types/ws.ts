import { Server, Socket } from 'socket.io'
import { EventsMap } from 'socket.io/dist/typed-events'
import { SessionDto } from '../session/session.type'
import { WsException, WsResponse } from '@nestjs/websockets'
import {
  ChatResponseDto,
  PlayerDto,
  RoomBaseDto,
  RoomCreateRequestDto,
  RoomCreateResponseDto,
  RoomInfoResponseDto,
} from '../room/room.type'

// Server to Client Events ======================================
export enum EServerToClientEvents {
  ECHO = 'echo',
  ERROR = 'error',
  SESSION = 'session',
  MSG_CHAT = 'msg_chat',
  MSG_SYSTEM = 'msg_system',
  CANVAS = 'canvas',
  ROOM_CREATE = 'room_create',
  ROOM_VALIDATE = 'room_validate',
  ROOM_JOIN = 'room_join',
  // ROOM_INFO = 'room_info',
  ROOM_USERS = 'room_users',
  ROUND_NEXT = 'round_next',
  ROUND_START = 'round_start',
  ROUND_END = 'round_end',
  GAME_END = 'game_end',
  WORD_HINT = 'word_hint',
}
export interface GrtServerToClientEvents {
  [EServerToClientEvents.ECHO]: (data: { data: string }) => void
  [EServerToClientEvents.ERROR]: (data: string) => void
  [EServerToClientEvents.ROOM_CREATE]: (
    data: WithError<RoomCreateResponseDto>,
  ) => void
  [EServerToClientEvents.ROOM_VALIDATE]: (data: WithError<RoomBaseDto>) => void
  [EServerToClientEvents.ROOM_JOIN]: (
    data: WithError<RoomInfoResponseDto>,
  ) => void
  [EServerToClientEvents.ROUND_NEXT]: (data: {
    round: number
    drawer: string
    word: string
    wordImg?: string
    endAt?: number
  }) => void
  [EServerToClientEvents.ROUND_START]: (data: { endAt: number }) => void
  [EServerToClientEvents.ROUND_END]: (data: {
    word: string
    wordImg: string
  }) => void
  [EServerToClientEvents.ROOM_USERS]: (data: PlayerDto[]) => void
  [EServerToClientEvents.GAME_END]: () => void
  [EServerToClientEvents.WORD_HINT]: (data: { word: string }) => void
  [EServerToClientEvents.MSG_CHAT]: (data: ChatResponseDto) => void
  [EServerToClientEvents.MSG_SYSTEM]: (data: ChatResponseDto) => void
  [EServerToClientEvents.SESSION]: (data: SessionDto) => void
  [EServerToClientEvents.CANVAS]: (data: string) => void
}
export type GrtServerToClientEventsPayload<T extends EServerToClientEvents> =
  Parameters<GrtServerToClientEvents[T]>[0]

// Helper type to map response events to their payloads
export interface GrtWsResponse<T extends EServerToClientEvents>
  extends WsResponse<GrtServerToClientEventsPayload<T>> {
  event: T
}
export type WithError<T> = {
  data?: T
  error?: GrtWsException
}
// Server to Client Events ======================================

// Client to Server Events ======================================
export enum EClientToServerEvents {
  ECHO = 'echo',
  CHAT = 'chat',
  CANVAS = 'canvas',
  ROOM_CREATE = 'room_create',
  ROOM_VALIDATE = 'room_validate',
  ROOM_JOIN = 'room_join',
  ROOM_LEAVE = 'room_leave',
  GAME_START = 'game_start',
  ROUND_START = 'round_start',
  ROUND_END = 'round_end',
}
export interface GrtClientToServerEvents {
  [EClientToServerEvents.ECHO]: (data: string) => void
  [EClientToServerEvents.CHAT]: (data: { content: string }) => void
  [EClientToServerEvents.CANVAS]: (data: string) => void
  [EClientToServerEvents.ROOM_VALIDATE]: (data: RoomBaseDto) => void
  [EClientToServerEvents.ROOM_CREATE]: (data: RoomCreateRequestDto) => void
  [EClientToServerEvents.ROOM_JOIN]: (data: RoomBaseDto) => void
  [EClientToServerEvents.ROOM_LEAVE]: () => void
  [EClientToServerEvents.GAME_START]: () => void
  [EClientToServerEvents.ROUND_START]: () => void
  [EClientToServerEvents.ROUND_END]: () => void
}
export type GrtClientToServerEventsPayload<T extends EClientToServerEvents> =
  Parameters<GrtClientToServerEvents[T]>[0]
// Client to Server Events ======================================

// Additional Socket Data
export interface GrtSocketData {
  session: SessionDto
  currentRoomId?: string
}

export enum EGrtErrorCode {
  UNKNOWN = 'EGRT000', // Unknown error
  INVALID_SESSION = 'EGRT001', // Bad request. Invalid session
  UNAUTHORIZED = 'EGRT002', // Unauthorized. Invalid session
  INVALID_DATA = 'EGRT003', // Bad request. Invalid data
  ROOM_NOT_ENOUGH_USER = 'EGRT_ROOM001',
}

export type GrtServer = Server<
  GrtClientToServerEvents,
  GrtServerToClientEvents,
  EventsMap,
  GrtSocketData
>

export type GrtSocket = Socket<
  GrtClientToServerEvents,
  GrtServerToClientEvents,
  EventsMap,
  GrtSocketData
>

export class GrtWsException extends WsException {
  event?: EServerToClientEvents

  constructor(
    code: EGrtErrorCode,
    serverToClientEvents?: EServerToClientEvents,
    public data?: unknown,
  ) {
    super(code)
    this.event = serverToClientEvents
  }
}
