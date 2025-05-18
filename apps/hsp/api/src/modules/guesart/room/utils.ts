import { randomUUID } from 'crypto'

export const genMsgId = () => {
  return randomUUID()
}

export const ROOM_PREFIX = 'room'
export const socketRoomId = (roomId: string) => {
  return `${ROOM_PREFIX}:${roomId}`
}
