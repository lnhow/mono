import {
  IsEnum,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'
import { Room } from 'generated/prisma'

export enum ERoomTheme {
  ANIMALS = 'animals',
  EVERYDAY_OBJECTS = 'everyday_objects',
  FOOD = 'food',
  FRUITS = 'fruits',
  VEHICLES = 'vehicles',
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

export class RoomCreateRequestDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsEnum(ERoomTheme)
  theme: ERoomTheme

  @Min(2)
  @Max(8)
  maxUsers: number

  @Min(3)
  @Max(10)
  numOfRounds: number

  @IsEnum(ERoomTimeOption)
  timeOption: ERoomTimeOption
}

export type RoomCreateResponseDto = {
  id: string
}

export type RoomInfoResponseDto = Pick<
  Room,
  | 'id'
  | 'name'
  | 'theme'
  | 'maxUsers'
  | 'numOfRounds'
  | 'timePerRoundInSec'
  | 'host'
  | 'status'
>

export type RoomBaseDto = {
  roomId: string
}

export class RoomChatRequestDto {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  content: string
}

export enum ESystemMessageContent {
  JOIN_ROOM = 'joined',
  LEAVE_ROOM = 'left',
  GUESS_CORRECT = 'correct',
  GUESS_ALREADY_CORRECT = 'already_correct',
  DRAWER_GUESS_BLOCKED = 'drawer_guess_blocked',
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
