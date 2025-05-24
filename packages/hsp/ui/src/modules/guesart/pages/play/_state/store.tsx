'use client'
import { focusAtom } from 'jotai-optics'
import { ERoomStatus, ERoomTheme, PlayerDto, RoomInfoResponseDto } from '../../../state/type/room'
import { atomWithReset } from 'jotai/utils'

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
  isLoading: boolean
  metadata: RoomInfoResponseDto
  players: PlayerDto[]
  round: {
    number: number
    currentDrawer: string
    currentQuestion: string
  }
  messages: TBaseMessage[]
}

export const roomAtom = atomWithReset<TGameState>({
  isLoading: true,
  metadata: {
    id: '',
    name: '',
    theme: ERoomTheme.ANIMALS,
    maxUsers: 0,
    numOfRounds: 0,
    timePerRoundInSec: 0,
    host: {
      userId: '',
      userName: '',
    },
    status: ERoomStatus.WAITING,
  },
  players: [],
  round: {
    number: 0,
    currentDrawer: '',
    currentQuestion: '',
  },
  messages: [],
})

export const roomIsLoadingAtom = focusAtom(roomAtom, (game) => game.prop('isLoading'))
export const roomPlayersAtom = focusAtom(roomAtom, (game) => game.prop('players'))
export const roomMetadataAtom = focusAtom(roomAtom, (game) => game.prop('metadata'))
export const roomMessagesAtom = focusAtom(roomAtom, (game) => game.prop('messages'))
