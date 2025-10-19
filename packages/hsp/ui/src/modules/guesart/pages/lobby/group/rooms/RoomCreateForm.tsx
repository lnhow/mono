'use client'
import { memo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import { useAtomValue } from 'jotai'

import ViewTransition from '@hsp/ui/utils/react/view-transition'
import { Button } from '@hsp/ui/components/base/button'
import { FormInput } from '../components/input'
import { FormSelect } from '../components/select'
import {
  ERoomTheme,
  ERoomTimeOption,
  ROOM_TIME_OPTIONS,
  RoomCreateRequestDto,
  RoomCreateResponseDto,
} from '../../../../state/type/room'
import { socketAtom } from '../../../../state/store'
import {
  EClientToServerEvents,
  EServerToClientEvents,
} from '../../../../state/type/socket'

import { getRoomUrl } from '../../../../utils'

const RoomCreateForm = memo(function RoomCreateForm() {
  const { socket } = useAtomValue(socketAtom)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit, reset } = useForm<RoomFormValues>({
    defaultValues,
  })

  const onSubmit = handleSubmit(
    useDebounceCallback(async (data) => {
      if (!socket) {
        console.error('Socket is not connected')
        return
      }

      const submitData = {
        name: data.name,
        theme: data.theme,
        maxUsers: parseInt(data.maxUsers, 10),
        numOfRounds: parseInt(data.rounds, 10),
        timeOption: parseInt(data.roundTime, 10),
      } as RoomCreateRequestDto

      const promise = new Promise<RoomCreateResponseDto>((resolve, reject) => {
        socket.once(EServerToClientEvents.ROOM_CREATE, (res) => {
          const resData = res.data
          if (res.error || !resData) {
            reject(res.error)
          }
          resolve(resData as RoomCreateResponseDto)
        })
      })

      const toastId = toast.loading('Creating room...')
      try {
        setIsLoading(true)
        socket.emit(EClientToServerEvents.ROOM_CREATE, submitData)
        const data = await promise
        toast.success('Room created successfully', {
          id: toastId,
        })

        toast.dismiss(toastId)
        router.push(getRoomUrl(data.id))
      } catch (error) {
        console.error('Error creating room:', error)
        toast.error('Error creating room', { id: toastId })
        return
      } finally {
        setIsLoading(false)
      }

      console.log('Room Created:', data)
      reset()
    }, 100),
  )

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-1">Create a Room</h2>
      <p className="text-fore-200 text-sm mb-4">Create a new room and let others play with you.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          control={control}
          label="Room Name"
          name="name"
          rules={{
            required: {
              value: true,
              message: 'Room name is required',
            },
            minLength: {
              value: ROOM_CONSTRAINTS.NAME.MIN_LENGTH,
              message: `Room name must be at least ${ROOM_CONSTRAINTS.NAME.MIN_LENGTH} characters long`,
            },
            maxLength: {
              value: ROOM_CONSTRAINTS.NAME.MAX_LENGTH,
              message: `Room name cannot exceed ${ROOM_CONSTRAINTS.NAME.MAX_LENGTH} characters`,
            },
          }}
          InputProps={{
            placeholder: `Enter a room name (${ROOM_CONSTRAINTS.NAME.MIN_LENGTH}-${ROOM_CONSTRAINTS.NAME.MAX_LENGTH} characters)`,
            maxLength: ROOM_CONSTRAINTS.NAME.MAX_LENGTH,
          }}
        />
        <FormSelect
          control={control}
          label="Theme"
          name="theme"
          rules={{
            required: {
              value: true,
              message: 'Theme is required',
            },
          }}
          options={ROOM_CONSTRAINTS.THEMES_OPTIONS}
          placeholder="Select a theme"
          InputProps={{}}
        />
        <FormSelect
          control={control}
          label="Max Users"
          name="maxUsers"
          rules={{
            required: {
              value: true,
              message: 'Max Users is required',
            },
          }}
          options={ROOM_CONSTRAINTS.MAX_USERS_OPTIONS}
          placeholder="Select max users"
        />
        <FormSelect
          control={control}
          label="Rounds"
          name="rounds"
          rules={{
            required: {
              value: true,
              message: 'Rounds is required',
            },
          }}
          options={ROOM_CONSTRAINTS.ROUNDS_OPTIONS}
          placeholder="Select rounds"
        />
        <FormSelect
          control={control}
          label="Time per Round"
          name="roundTime"
          rules={{
            required: {
              value: true,
              message: 'Time per Round is required',
            },
          }}
          options={ROOM_CONSTRAINTS.ROUND_TIME_OPTIONS}
          placeholder="Select time per round"
        />
        <ViewTransition name="guesart-button-primary">
          <Button type="submit" className="w-full" disabled={isLoading}>
            Create Room
          </Button>
        </ViewTransition>
      </form>
    </div>
  )
})
export default RoomCreateForm

interface RoomFormValues {
  name: string
  theme: string
  maxUsers: string
  rounds: string
  roundTime: string
}

export const ROOM_CONSTRAINTS = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  MAX_USERS_OPTIONS: Array.from({ length: 7 }, (_, i) => '' + (i + 2)),
  ROUNDS_OPTIONS: Array.from({ length: 8 }, (_, i) => '' + (i + 3)),
  ROUND_TIME_OPTIONS: Object.values(ROOM_TIME_OPTIONS).map((time, index) => ({
    value: '' + (index + 1),
    label: `${time}s`,
  })),
  THEMES_OPTIONS: [
    {
      value: ERoomTheme.ANIMALS,
      label: 'Animals',
    },
    {
      value: ERoomTheme.FOOD,
      label: 'Food',
    },
    {
      value: ERoomTheme.EVERYDAY_OBJECTS,
      label: 'Everyday Objects',
    },
    {
      value: ERoomTheme.FRUITS,
      label: 'Fruits',
    },
    {
      value: ERoomTheme.VEHICLES,
      label: 'Vehicles',
    },
  ],
}

const defaultValues: RoomFormValues = {
  name: '',
  theme: ROOM_CONSTRAINTS.THEMES_OPTIONS[0]!.value,
  maxUsers: '4',
  rounds: '3',
  roundTime: `${ERoomTimeOption.ONE_MINUTE}`,
}
