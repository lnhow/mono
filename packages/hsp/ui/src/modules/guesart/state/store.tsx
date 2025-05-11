'use client'
import { atom } from 'jotai'
import { focusAtom } from 'jotai-optics'
import { Socket } from 'socket.io-client'

export type SocketStateType = {
  socket: Socket | null
  connected: boolean
}

export const socketAtom = atom<SocketStateType>({
  socket: null,
  connected: false,
})

export type PlayerType = {
  id: string
  name: string
  score: number
}

export type MessageType = {
  id: string
  content: string
  sender: {
    id: string
    name: string
  }
}

export type GameStateType = {
  roomId: string
  players: PlayerType[]
  round: number
  maxRound: number
  currentPlayer: string
  currentQuestion: string
  messages: MessageType[]
}

export const gameAtom = atom<GameStateType>({
  roomId: '',
  players: [],
  round: 0,
  maxRound: 0,
  currentPlayer: '',
  currentQuestion: '',
  messages: [],
})

export const messagesAtom = focusAtom(gameAtom, (game) => game.prop('messages'))
