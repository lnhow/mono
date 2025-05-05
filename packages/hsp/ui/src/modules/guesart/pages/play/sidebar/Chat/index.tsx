'use client'
import { useState, ChangeEvent } from 'react'
import { Input } from '@hsp/ui/src/components/base/input'
import { Button } from '@hsp/ui/src/components/base/button'
import { Message } from '../type'
import cn from '@hsp/ui/src/utils/cn'
import { LuSend } from 'react-icons/lu'

const initialMessages: Message[] = [
  { sender: 'Alice', text: 'Hi there!' },
  { sender: 'Bob', text: 'Hello!' },
  { sender: 'Charlie', text: "How's it going?" },
]

export default function Chat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState<string>('')

  const sendMessage = (): void => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input }])
      setInput('')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }
  return (
    <div className={cn('flex flex-col flex-1 overflow-y-auto py-2', className)}>
      <h2 className="text-xs text-fore-200 font-semibold mb-2 px-4">Messages</h2>
      <div className="space-y-2 mb-4 flex-1 overflow-y-auto px-4">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm text-fore-500">
            <span className="text-fore-400">{msg.sender}:</span>{' '}
            {msg.text}
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
