import {
  IsEnum,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

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
