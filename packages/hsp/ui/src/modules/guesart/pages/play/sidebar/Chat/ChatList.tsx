'use client'
import { useAtom, useAtomValue } from 'jotai'
import { memo, startTransition, useEffect, useRef } from 'react'
import { messagesAtom, socketAtom } from '../../../../state/store'
import ChatMessage from './ChatMessage'
import { MessageType } from '../../../../state/state.type'
import { EServerToClientEvents } from '../../../../state/type/socket'
import { ChatResponseDto } from '../../../../state/type/room'

const ChatList = memo(function ChatList({ className }: { className?: string }) {
  const { socket } = useAtomValue(socketAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!socket) {
      return
    }

    const onNewUserMessage = (message: ChatResponseDto) => {
      startTransition(() => {
        setMessages((prev) => [...prev, {
          ...message,
          type: MessageType.USER,
        }])
      })
    }

    const onNewSystemMessage = (message: ChatResponseDto) => {
      startTransition(() => {
        setMessages((prev) => [...prev, {
          ...message,
          type: MessageType.SYSTEM,
        }])
      })
    }

    socket.on(EServerToClientEvents.MSG_CHAT, onNewUserMessage)
    socket.on(EServerToClientEvents.MSG_SYSTEM, onNewSystemMessage)

    return () => {
      socket.off(EServerToClientEvents.MSG_CHAT, onNewUserMessage)
      socket.off(EServerToClientEvents.MSG_SYSTEM, onNewSystemMessage)
    }
  }, [socket, setMessages])

  useEffect(() => {
    // scroll to bottom
    if (!refContainer.current) {
      return
    }

    const div = refContainer.current
    div.scrollTo({
      top: div.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages.length])

  return (
    <div className={className} ref={refContainer}>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} msg={msg} />
      ))}
    </div>
  )
})

export default ChatList
