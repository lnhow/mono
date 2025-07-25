'use client'
import { Button } from '@hsp/ui/src/components/base/button'
import { useEffect, useState } from 'react'

import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'
import { useForm } from 'react-hook-form'
import { socketAtom } from '../../../state/store'
import { useAtomValue } from 'jotai'
import { FormInput } from './components/input'
import { useDebounceCallback } from 'usehooks-ts'
import CircularProgress from '@hsp/ui/src/components/base/progress/circular'

export default function ConnectForm() {
  const { socket } = useAtomValue(socketAtom)
  const [loading, setLoading] = useState(false)
  const { control, setValue, handleSubmit } = useForm<SocketFormValues>({
    defaultValues: {
      username: '',
    },
  })

  useEffect(() => {
    try {
      const defaultUsername = localStorage.getItem(STORAGE_KEY.USERNAME)
      if (defaultUsername) {
        setValue('username', defaultUsername)
      }
    } catch (error) {
      console.error('Error retrieving username from localStorage:', error)
    }
  }, [setValue])

  const onConnect = handleSubmit(
    useDebounceCallback((data) => {
      localStorage.setItem(STORAGE_KEY.USERNAME, data.username)
      if (!socket) {
        return
      }
      setLoading(true)
      socket.auth = {
        username: data.username,
      }
      socket.connect()

      const onConnection = () => {
        setLoading(false)
        socket.off('connect', onConnection)
        socket.off('connect_error', onConnectError)
      }
      const onConnectError: (err: Error) => void = (err) => {
        console.error('Connection error:', err)
        onConnection()
      }

      socket.on('connect_error', onConnectError)
      socket.on('connect', onConnection)
    }, 100),
  )

  return (
    <form onSubmit={onConnect} className="space-y-4">
      <FormInput
        control={control}
        label="Enter your display name"
        name="username"
        InputProps={{
          maxLength: USER_NAME.MAX_LENGTH,
          placeholder: `Your display name (${USER_NAME.MIN_LENGTH}-${USER_NAME.MAX_LENGTH} characters)`,
        }}
        rules={{
          required: true,
          minLength: {
            value: USER_NAME.MIN_LENGTH,
            message: `Username must be at least ${USER_NAME.MIN_LENGTH} characters`,
          },
          maxLength: {
            value: USER_NAME.MAX_LENGTH,
            message: `Username must be at most ${USER_NAME.MAX_LENGTH} characters`,
          },
        }}
      />
      <ViewTransition name="guesart-button-primary">
        <Button type="submit" className="w-full" disabled={!socket || loading}>
          {loading ? <CircularProgress /> : 'Play'}
        </Button>
      </ViewTransition>
      <p className="text-fore-200 text-sm ps-2">
        The display name can be seen by others while playing. It can only be changed after open a new tab.
      </p>
    </form>
  )
}

interface SocketFormValues {
  username: string
}

export const STORAGE_KEY = {
  USERNAME: 'defaultUsername',
} as const

export const USER_NAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 15,
} as const
