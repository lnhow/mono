import { Socket } from 'socket.io-client'
import {
  ChatResponseDto,
  PlayerDto,
  RoomBaseDto,
  RoomCreateRequestDto,
  RoomCreateResponseDto,
  RoomInfoResponseDto,
} from './room'
import { SessionDto } from './session'

// Server to Client Events ======================================
export enum EServerToClientEvents {
  ECHO = 'echo',
  SESSION = 'session',
  MSG_CHAT = 'msg_chat',
  MSG_SYSTEM = 'msg_system',
  CANVAS = 'canvas',
  ROOM_VALIDATE = 'room_validate',
  ROOM_CREATE = 'room_create',
  ROOM_JOIN = 'room_join',
  // ROOM_INFO = 'room_info',
  ROOM_USERS = 'room_users',
  // ROUND_NEXT = 'round_next',
  // ROUND_DRAWER = 'round_drawer',
  // ROUND_START = 'round_start',
  // ROUND_END = 'round_end',
  // GAME_END = 'game_end',
  // GAME_RESULT = 'game_result',
}
export interface GrtServerToClientEvents {
  [EServerToClientEvents.ECHO]: (data: { data: string }) => void
  [EServerToClientEvents.ROOM_CREATE]: (
    data: WithError<RoomCreateResponseDto>,
  ) => void
  [EServerToClientEvents.ROOM_VALIDATE]: (data: WithError<RoomBaseDto>) => void
  [EServerToClientEvents.ROOM_JOIN]: (
    data: WithError<RoomInfoResponseDto>,
  ) => void
  [EServerToClientEvents.ROOM_USERS]: (data: PlayerDto[]) => void
  [EServerToClientEvents.MSG_CHAT]: (data: ChatResponseDto) => void
  [EServerToClientEvents.MSG_SYSTEM]: (data: ChatResponseDto) => void
  [EServerToClientEvents.SESSION]: (data: SessionDto) => void
  [EServerToClientEvents.CANVAS]: (data: string) => void
}

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
}
export interface GrtClientToServerEvents {
  [EClientToServerEvents.ECHO]: (data: string) => void
  [EClientToServerEvents.CHAT]: (data: { content: string }) => void
  [EClientToServerEvents.CANVAS]: (data: string) => void
  [EClientToServerEvents.ROOM_CREATE]: (data: RoomCreateRequestDto) => void
  [EServerToClientEvents.ROOM_VALIDATE]: (data: RoomBaseDto) => void
  [EClientToServerEvents.ROOM_JOIN]: (data: RoomBaseDto) => void
  [EClientToServerEvents.ROOM_LEAVE]: (data: never) => void
  [EClientToServerEvents.GAME_START]: (data: never) => void
  [EClientToServerEvents.ROUND_START]: (data: never) => void
}

export type GrtSocket = Socket<GrtServerToClientEvents, GrtClientToServerEvents>

export type WithError<T> = {
  data?: T
  error?: {
    code: EGrtErrorCode
  }
}

export enum EGrtErrorCode {
  UNKNOWN = 'EGRT000', // Unknown error
  INVALID_SESSION = 'EGRT001', // Bad request. Invalid session
  UNAUTHORIZED = 'EGRT002', // Unauthorized. Invalid session
  INVALID_DATA = 'EGRT003', // Bad request. Invalid data
}

export const GrtErrorMessages = {
  [EGrtErrorCode.UNKNOWN]: 'Unknown error',
  [EGrtErrorCode.INVALID_SESSION]: 'Invalid session',
  [EGrtErrorCode.UNAUTHORIZED]: 'Unauthorized',
  [EGrtErrorCode.INVALID_DATA]: 'Invalid data',
}
