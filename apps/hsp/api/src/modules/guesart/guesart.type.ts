import { Server, Socket } from 'socket.io'
import { EventsMap } from 'socket.io/dist/typed-events'
import { SessionDto } from './session/session.type'
import { WsResponse } from '@nestjs/websockets'

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

// Server to Client Events
export enum EServerToClientEvents {
  ECHO = 'echo',
  SESSION = 'session',
  MSG_CHAT = 'msg_chat',
  MSG_SYSTEM = 'msg_system',
  CANVAS = 'canvas',
}
export interface GrtServerToClientEvents {
  [EServerToClientEvents.ECHO]: (data: { data: string }) => void
  [EServerToClientEvents.MSG_CHAT]: (data: MessageResDto) => void
  [EServerToClientEvents.MSG_SYSTEM]: (data: MessageResDto) => void
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

// Client to Server Events
export enum EClientToServerEvents {
  ECHO = 'echo',
  CHAT = 'chat',
  CANVAS = 'canvas',
  ROOM_JOIN = 'room_join',
  ROOM_LEAVE = 'room_leave',
  GAME_START = 'game_start',
  ROUND_START = 'round_start',
}
export interface GrtClientToServerEvents {
  [EClientToServerEvents.ECHO]: (data: string) => void
  [EClientToServerEvents.CHAT]: (data: { content: string }) => void
  [EClientToServerEvents.CANVAS]: (data: string) => void
  [EClientToServerEvents.ROOM_JOIN]: (data: { roomId: string }) => void
  [EClientToServerEvents.ROOM_LEAVE]: (data: { roomId: string }) => void
  [EClientToServerEvents.GAME_START]: (data: { roomId: string }) => void
  [EClientToServerEvents.ROUND_START]: (data: { roomId: string }) => void
}
export type GrtClientToServerEventsPayload<T extends EClientToServerEvents> =
  Parameters<GrtClientToServerEvents[T]>[0]

// Additional Socket Data
export interface GrtSocketData {
  session: SessionDto
}

export enum EGrtErrorCode {
  UNKNOWN = 'EGRT000', // Unknown error
  INVALID_SESSION = 'EGRT001', // Bad request. Invalid session
  UNAUTHORIZED = 'EGRT002', // Unauthorized. Invalid session
  INVALID_DATA = 'EGRT003', // Bad request. Invalid data
}

export class GrtError extends Error {
  constructor(code: EGrtErrorCode) {
    super(code)
    this.message = code
    this.data = {
      code: code,
    }
  }

  data: {
    code: EGrtErrorCode
  }
}

export type PlayerDto = {
  id: string
  name: string
  score: number
}

export enum ESystemMessageContent {
  JOIN_ROOM = 'joined',
  LEAVE_ROOM = 'left',
  GUESS_CORRECT = 'correct',
  GUESS_WRONG = 'wrong',
  ROUND_START = 'start',
  ROUND_END = 'end',
}

export type MessageResDto = {
  id: string
  content: string
  user?: {
    id: string
    name: string
  }
}
