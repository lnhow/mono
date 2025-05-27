import { memo } from 'react'
import { useAtomValue } from 'jotai'

import { sessionAtom } from '../../../../state/store'
import {
  MessageType,
  SystemMessageContent,
  TBaseMessage,
  TSystemMessage,
  TUserMessage,
} from '../../_state/store'
import cn from '@hsp/ui/src/utils/cn'

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

  switch (msg.content) {
    case SystemMessageContent.JOIN_ROOM:
      return {
        msg: `${isCurrentUser ? 'You' : systemMsg.user?.name || 'A player'} joined the game`,
        style: 'text-accent-400',
      }
    case SystemMessageContent.LEAVE_ROOM:
      return {
        msg: `${systemMsg.user?.name || 'A player'} left the game`,
        style: 'text-warning-300',
      }
    case SystemMessageContent.ROUND_START:
      return {
        msg: 'Game started!',
        style: 'text-accent-400',
      }
    case SystemMessageContent.ROUND_END:
      return {
        msg: 'Round ended!',
        style: 'text-accent-400',
      }
    case SystemMessageContent.GUESS_CORRECT:
      return {
        msg: `${systemMsg.user?.name || 'A player'} guessed correctly`,
        style: 'text-primary-500',
      }
    case SystemMessageContent.GUESS_WRONG:
      return {
        msg: 'Incorrect guess!',
        style: 'text-warning-300',
      }
    default:
      return {
        msg: msg.content,
      }
  }
}
