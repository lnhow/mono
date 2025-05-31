'use client'
import { memo, useCallback } from 'react'
import { Input } from '@hsp/ui/src/components/base/input'
import { Button } from '@hsp/ui/src/components/base/button'
import cn from '@hsp/ui/src/utils/cn'
import { LuSend } from 'react-icons/lu'
import { WithClassName } from '@hsp/ui/src/types/react'
import { useForm } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
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
