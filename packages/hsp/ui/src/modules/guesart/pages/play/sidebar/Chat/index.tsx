'use client'
import { useState, ChangeEvent, useEffect } from 'react'
import { Input } from '@hsp/ui/src/components/base/input'
import { Button } from '@hsp/ui/src/components/base/button'
import cn from '@hsp/ui/src/utils/cn'
import { LuSend } from 'react-icons/lu'

import { useAtom } from 'jotai'
import { messagesAtom, MessageType, socketAtom } from '../../../../state/store'

export default function Chat({ className }: { className?: string }) {
  const [socket] = useAtom(socketAtom)
  const [messages, setMessages] = useAtom(messagesAtom)
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    if (socket.socket) {
      socket.socket.on('chat', (message: MessageType) => {
        setMessages((prev) => [...prev, message])
      })
    }
  }, [socket.socket, setMessages])

  const sendMessage = (): void => {
    const trimedInput = input.trim()
    if (!trimedInput || !socket.socket || !socket.connected) {
      return
    }
    setInput('')
    socket.socket.emit('chat', {
      content: trimedInput,
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }
  return (
    <div className={cn('flex flex-col flex-1 overflow-y-auto py-2', className)}>
      <h2 className="text-xs text-fore-200 font-semibold mb-2 px-4">
        Messages
      </h2>
      <div className="space-y-2 mb-4 flex-1 overflow-y-auto px-4">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm text-fore-500">
            <span className="text-fore-400">{msg.sender.id === socket.socket?.id ? 'You' : msg.sender.name}:</span>{' '}
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2 px-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={sendMessage} size="icon">
          <LuSend />
        </Button>
      </div>
    </div>
  )
}
