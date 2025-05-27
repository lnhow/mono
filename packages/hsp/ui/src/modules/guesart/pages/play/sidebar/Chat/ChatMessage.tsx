import { memo } from 'react'
import { useAtomValue } from 'jotai'

import { sessionAtom } from '../../../../state/store'
import {
  MessageType,
  TBaseMessage,
  TSystemMessage,
  TUserMessage,
} from '../../_state/store'
import cn from '@hsp/ui/src/utils/cn'
import { ESystemMessageContent } from '../../../../state/type/room'

export type ChatMessageProps = {
  msg: TBaseMessage
}

const ChatMessage = memo(function ChatMessage({ msg }: ChatMessageProps) {
  const isSystem = msg.type === MessageType.SYSTEM

  if (isSystem) {
    return <SystemMessage msg={msg} />
  }

  return <UserMessage msg={msg} />
})

export default ChatMessage

const UserMessage = ({ msg }: ChatMessageProps) => {
  const { userId } = useAtomValue(sessionAtom)
  const userMsg = msg as TUserMessage
  const isCurrentUser = userMsg.user.id === userId

  return (
    <div className="text-sm text-fore-500">
      <span className="text-fore-400">
        {isCurrentUser ? 'You' : userMsg.user.name}:
      </span>{' '}
      {msg.content}
    </div>
  )
}

const SystemMessage = ({ msg }: ChatMessageProps) => {
  const { userId } = useAtomValue(sessionAtom)
  const content = getSystemMessageContent({
    msg,
    metadata: {
      currentUserId: userId,
    },
  })

  return (
    <div className={cn('text-sm font-medium text-warning-300', content.style)}>
      {content.msg}
    </div>
  )
}

const getSystemMessageContent = ({
  msg,
  metadata,
}: ChatMessageProps & {
  metadata: {
    currentUserId?: string
  }
}) => {
  const systemMsg = msg as TSystemMessage
  const isCurrentUser = systemMsg.user?.id === metadata.currentUserId
  const textUserName = isCurrentUser ? 'You' : systemMsg.user?.name || 'A player'

  switch (msg.content) {
    case ESystemMessageContent.JOIN_ROOM:
      return {
        msg: `${textUserName} joined the game`,
        style: 'text-accent-400',
      }
    case ESystemMessageContent.LEAVE_ROOM:
      return {
        msg: `${textUserName} left the game`,
        style: 'text-warning-300',
      }
    case ESystemMessageContent.ROUND_START:
      return {
        msg: 'Game started!',
        style: 'text-accent-400',
      }
    case ESystemMessageContent.ROUND_END:
      return {
        msg: 'Round ended!',
        style: 'text-accent-400',
      }
    case ESystemMessageContent.GUESS_CORRECT:
      return {
        msg: `${textUserName} guessed correct!`,
        style: 'text-primary-500',
      }
    case ESystemMessageContent.GUESS_ALREADY_CORRECT:
      return {
        msg: `${textUserName} already guessed correctly. Don't spoil the answer!`,
        style: 'text-warning-300',
      }
    case ESystemMessageContent.DRAWER_GUESS_BLOCKED:
      return {
        msg: `Please don't spoil the answer!`,
        style: 'text-warning-300',
      }
    default:
      return {
        msg: msg.content,
      }
  }
}
