import { RoomInfoResponseDto } from "./type/room"

// Messages that client sends (i.e. Server accepts)
export enum REQ_EVENTS {
  CHAT = 'chat',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  SEND_CANVAS = 'send-canvas',
}

export type PlayerType = {
  id: string
  name: string
  score: number
}

export enum MessageType {
  SYSTEM = -1,
  USER = 0,
}

export enum SystemMessageContent {
  JOIN_ROOM = 'joined',
  LEAVE_ROOM = 'left',
  GUESS_CORRECT = 'correct',
  GUESS_WRONG = 'wrong',
  ROUND_START = 'start',
  ROUND_END = 'end',
}

export type TBaseMessage = {
  id: string
  type: MessageType
  content?: string
  user?: {
    id: string
    name: string
  }
}

export type TSystemMessage = TBaseMessage & {
  type: MessageType.SYSTEM
  content: SystemMessageContent
}

export type TUserMessage = TBaseMessage & {
  type: MessageType.USER
  content: string
  user: {
    id: string
    name: string
  }
}

export type TGameState = {
  metadata: RoomInfoResponseDto
  players: PlayerType[]
  round: number
  currentDrawer: string
  currentQuestion: string
  messages: TBaseMessage[]
}
