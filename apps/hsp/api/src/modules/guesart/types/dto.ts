import { IsString } from 'class-validator'

export class ChatRequestDto {
  @IsString()
  content: string
}

export enum ESystemMessageContent {
  JOIN_ROOM = 'joined',
  LEAVE_ROOM = 'left',
  GUESS_CORRECT = 'correct',
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
  id: string
  name: string
  score: number
}
