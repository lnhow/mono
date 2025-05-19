import { randomUUID } from 'crypto'
import { ChatResponseDto, ESystemMessageContent } from './room.type'
import { SessionDto } from '../session/session.type'

export const ROOM_PREFIX = 'room'
export const socketRoomId = (roomId: string) => {
  return `${ROOM_PREFIX}:${roomId}`
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
