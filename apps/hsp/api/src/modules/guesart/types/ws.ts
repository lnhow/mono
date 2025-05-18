import { Server, Socket } from 'socket.io'
import { EventsMap } from 'socket.io/dist/typed-events'
import { SessionDto } from '../session/session.type'
import { WsException, WsResponse } from '@nestjs/websockets'
import { ChatResponseDto } from './dto'
import { RoomCreateRequestDto, RoomCreateResponseDto } from '../room/room.type'

// Server to Client Events ======================================
export enum EServerToClientEvents {
  ECHO = 'echo',
  SESSION = 'session',
  MSG_CHAT = 'msg_chat',
  MSG_SYSTEM = 'msg_system',
  CANVAS = 'canvas',
  ROOM_CREATE = 'room_create',
  // ROOM_INFO = 'room_info',
  // ROOM_USERS = 'room_users',
  // ROUND_NEXT = 'round_next',
  // ROUND_DRAWER = 'round_drawer',
  // ROUND_START = 'round_start',
  // ROUND_END = 'round_end',
  // GAME_END = 'game_end',
  // GAME_RESULT = 'game_result',
}
export interface GrtServerToClientEvents {
  [EServerToClientEvents.ECHO]: (data: { data: string }) => void
  [EServerToClientEvents.ROOM_CREATE]: (data: {
    data?: RoomCreateResponseDto
    error?: GrtWsException
  }) => void
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
// Server to Client Events ======================================

// Client to Server Events ======================================
export enum EClientToServerEvents {
  ECHO = 'echo',
  CHAT = 'chat',
  CANVAS = 'canvas',
  ROOM_CREATE = 'room_create',
  ROOM_JOIN = 'room_join',
  ROOM_LEAVE = 'room_leave',
  GAME_START = 'game_start',
  ROUND_START = 'round_start',
}
export interface GrtClientToServerEvents {
  [EClientToServerEvents.ECHO]: (data: string) => void
  [EClientToServerEvents.CHAT]: (data: { content: string }) => void
  [EClientToServerEvents.CANVAS]: (data: string) => void
  [EClientToServerEvents.ROOM_CREATE]: (data: RoomCreateRequestDto) => void
  [EClientToServerEvents.ROOM_JOIN]: (data: { roomId: string }) => void
  [EClientToServerEvents.ROOM_LEAVE]: (data: { roomId: string }) => void
  [EClientToServerEvents.GAME_START]: (data: { roomId: string }) => void
  [EClientToServerEvents.ROUND_START]: (data: { roomId: string }) => void
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
