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
// Messages that client sends (i.e. Server accepts)
export enum REQ_EVENTS {
  CHAT = 'chat',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  SEND_CANVAS = 'send-canvas',
}

export type PlayerDto = {
  id: string
  name: string
  score: number
}

export enum EMessageType {
  SYSTEM = -1,
  USER = 0,
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
  type: EMessageType
  content: string
  user?: {
    id: string
    name: string
  }
}

export type MessageReqDto = {
  content: string
}
