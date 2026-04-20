'use client'
import { Button } from '@hsp/ui/components/button'
import { Input } from '@hsp/ui/components/input'
import cn from '@hsp/ui/utils/cn'
import type { WithClassName } from '@hsp/ui/utils/react/types'
import { useAtomValue } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { LuSend } from 'react-icons/lu'
import { socketAtom } from '../../../../state/store'
import { EClientToServerEvents } from '../../../../state/type/socket'

const ChatInput = memo(function ChatInput({ className }: WithClassName) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      input: '',
    },
  })
  const { connected } = useAtomValue(socketAtom)
  const submitToServer = useAtomCallback(
    useCallback((get, _, data: string) => {
      const { socket } = get(socketAtom)
      socket?.emit(EClientToServerEvents.CHAT, {
        content: data,
      })
    }, []),
  )

  const onSubmit = handleSubmit((data) => {
    const trimedInput = data.input.trim()
    if (!trimedInput) {
      return
    }
    submitToServer(data.input)
    reset()
  })

  return (
    <form className={cn('flex gap-2', className)} onSubmit={onSubmit}>
      <Input
        {...register('input')}
        placeholder="Type a message..."
        className="flex-1"
        autoComplete="off"
      />
      <Button type="submit" size="icon" disabled={!connected}>
        <LuSend />
      </Button>
    </form>
  )
})

export default ChatInput
