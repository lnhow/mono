import { randomUUID } from 'crypto'
import { ChatResponseDto, ESystemMessageContent } from './room.type'
import { SessionDto } from '../session/session.type'

export const DEFAULT_DATE = new Date(0)
export const ROOM_PREFIX = 'room'
export const socketRoomId = (roomId: string) => {
  return `${ROOM_PREFIX}:${roomId}`
}
// Private room to send message to user
export const socketUserRoomId = (roomId: string, userId: string) => {
  return `${ROOM_PREFIX}:${roomId}:user:${userId}`
}

export function buildSystemMessage(
  content: ESystemMessageContent,
  session?: SessionDto,
): ChatResponseDto {
  return {
    id: genMsgId(),
    content,
    user: session
      ? {
          id: session.userId,
          name: session.userName,
        }
      : undefined,
  }
}

export function buildChatMessage(
  content: string,
  session: SessionDto,
): ChatResponseDto {
  return {
    id: genMsgId(),
    content,
    user: {
      id: session.userId,
      name: session.userName,
    },
  }
}

export const genMsgId = () => {
  return randomUUID()
}

export const calcPoints = ({
  now,
  endAt,
  total,
}: {
  now: number
  endAt: number
  total: number
}) => {
  const remainingTimePercentage = ((endAt - now) / total) * 100
  return {
    // 5 per correct guess +1 point if word is guessed within first half of round
    drawer: 5 + Math.floor(remainingTimePercentage / 50),
    // 10 +1 point for every 25% of time remaining
    guesser: 10 + Math.floor(remainingTimePercentage / 25),
  }
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
