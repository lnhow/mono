'use client'
import { Input } from '@hsp/ui/src/components/base/input'
import { Button } from '@hsp/ui/src/components/base/button'
import { useForm, SubmitHandler } from 'react-hook-form'

interface JoinRoomFormValues {
  roomId: string
}

export default function RoomJoinForm() {
  const { register, handleSubmit, reset } = useForm<JoinRoomFormValues>()

  const onSubmit: SubmitHandler<JoinRoomFormValues> = (data) => {
    console.log('Joining Room:', data.roomId)
    reset()
  }

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-4">Join a Room</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          placeholder="Room ID"
          {...register('roomId', { required: true })}
          className="w-full"
        />
        <Button type="submit" className="w-full">
          Join Room
        </Button>
      </form>
    </div>
  )
}
