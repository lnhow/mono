'use client'
import { atom } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { Socket } from 'socket.io-client'
import { TGameState } from './state.type'

export type SocketStateType = {
  socket: Socket | null
  connected: boolean
}

export const socketAtom = atom<SocketStateType>({
  socket: null,
  connected: false,
})

export const sessionAtom = atom({
  userId: '',
  userName: '',
  roomId: '',
})

export const gameAtom = atom<TGameState>({
  roomId: '',
  players: [],
  round: 0,
  maxRound: 0,
  currentPlayer: '',
  currentQuestion: '',
  messages: [],
})

export const messagesAtom = focusAtom(gameAtom, (game) => game.prop('messages'))
