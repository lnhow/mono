'use client'
import { atom } from 'jotai'
import { GrtSocket } from './type/socket'

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


