'use client'
import { atom } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { TGameState } from './state.type'
import { GrtSocket } from './type/socket'
import { ERoomStatus, ERoomTheme } from './type/room'

export type SocketStateType = {
  socket: GrtSocket | null
  connected: boolean
}

export const socketAtom = atom<SocketStateType>({
  socket: null,
  connected: false,
})

export const sessionAtom = atom({
  userId: '',
  userName: '',
})

export const gameAtom = atom<TGameState>({
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
  round: 0,
  currentDrawer: '',
  currentQuestion: '',
  messages: [],
})

export const messagesAtom = focusAtom(gameAtom, (game) => game.prop('messages'))
