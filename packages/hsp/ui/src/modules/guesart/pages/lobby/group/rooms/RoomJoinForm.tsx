'use client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useAtomValue } from 'jotai'

import { Button } from '@hsp/ui/src/components/base/button'
import { FormInput } from '../components/input'
import { socketAtom } from '../../../../state/store'
import { EGrtErrorCode } from '../../../../state/type/socket'
import { useState } from 'react'
import { useJoinRoom } from './utils'
import { useDebounceCallback } from 'usehooks-ts'

interface JoinRoomFormValues {
  roomId: string
}

export default function RoomJoinForm() {
  const { socket } = useAtomValue(socketAtom)
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit } = useForm<JoinRoomFormValues>({
    defaultValues: {
      roomId: '',
    },
  })
  const handleJoinRoom = useJoinRoom()

  const onSubmit = handleSubmit(useDebounceCallback((data) => {
    if (!socket) {
      toast.error('Socket is not connected')
      return
    }
    setIsLoading(true)
    const promise = handleJoinRoom(data.roomId).finally(() => {
      setIsLoading(false)
    })

    toast.promise(promise, {
      loading: 'Joining Room...',
      success: 'Joined Room!',
      error: (error) => {
        if (error?.error === EGrtErrorCode.INVALID_DATA) {
          return 'Room not found'
        }
        return 'Unexcepted error. Please try again later.'
      },
    })
  }, 100))

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-4">Join a Room</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          label="Room ID"
          name="roomId"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Room ID is required',
            },
          }}
          InputProps={{
            placeholder: 'Room ID',
          }}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Join Room
        </Button>
      </form>
    </div>
  )
}
