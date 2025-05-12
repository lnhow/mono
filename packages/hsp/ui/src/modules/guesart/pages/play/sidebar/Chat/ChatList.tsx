'use client'
import { useAtom, useAtomValue } from 'jotai'
import { memo, startTransition, useEffect, useRef } from 'react'
import { messagesAtom, socketAtom } from '../../../../state/store'
import ChatMessage from './ChatMessage'
import { TBaseMessage } from '../../../../state/state.type'

const ChatList = memo(function ChatList({ className }: { className?: string }) {
  const { socket } = useAtomValue(socketAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!socket) {
      return
    }

    const onNewMessage = (message: TBaseMessage) => {
      startTransition(() => {
        setMessages((prev) => [...prev, message])
      })
    }

    socket.on('chat', onNewMessage)

    return () => {
      socket.off('chat', onNewMessage)
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
