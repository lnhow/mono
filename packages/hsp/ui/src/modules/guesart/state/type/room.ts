export enum ERoomTheme {
  ANIMALS = 'animals',
  EVERYDAY_OBJECTS = 'everyday_objects',
  FOOD = 'food',
  FRUITS = 'fruits',
  VEHICLES = 'vehicles',
}

export enum ERoomStatus {
  waiting = 'waiting',
  playing = 'playing',
  finished = 'finished',
}

export enum ERoomTimeOption {
  THIRTY_SECONDS = 1,
  FOURTY_FIVE_SECONDS = 2,
  ONE_MINUTE = 3,
}

export const ROOM_TIME_OPTIONS = {
  [ERoomTimeOption.THIRTY_SECONDS]: 30,
  [ERoomTimeOption.FOURTY_FIVE_SECONDS]: 45,
  [ERoomTimeOption.ONE_MINUTE]: 60,
} as const

export type RoomCreateRequestDto = {
  name: string
  theme: ERoomTheme
  maxUsers: number
  numOfRounds: number
  timeOption: ERoomTimeOption
}

export type RoomCreateResponseDto = {
  id: string
}

export type RoomInfoResponseDto = {
  id: string
  name: string
  theme: ERoomTheme
  maxUsers: number
  numOfRounds: number
  timePerRoundInSec: number
  host: {
    id: string
    name: string
  }
  status: string
}

export type RoomBaseDto = {
  roomId: string
}

export type RoomChatRequestDto = {
  content: string
}

export enum ESystemMessageContent {
  JOIN_ROOM = 'joined',
  LEAVE_ROOM = 'left',
  GUESS_CORRECT = 'correct',
  GUESS_ALREADY_CORRECT = 'already_correct',
  GUESS_WRONG = 'wrong',
  ROUND_START = 'start',
  ROUND_END = 'end',
}

export type ChatResponseDto = {
  id: string
  content: string
  user?: {
    id: string
    name: string
  }
}

export type PlayerDto = {
  userId: string
  userName: string
  score: number
}
