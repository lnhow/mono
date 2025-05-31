'use client'
import { Button } from '@hsp/ui/src/components/base/button'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { socketAtom } from '../../../state/store'
import { useAtomValue } from 'jotai'
import { FormInput } from './components/input'
import { useDebounceCallback } from 'usehooks-ts'

export default function ConnectForm() {
  const { socket } = useAtomValue(socketAtom)
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

  const onConnect = handleSubmit(useDebounceCallback((data) => {
    localStorage.setItem(STORAGE_KEY.USERNAME, data.username)
    if (!socket) {
      return
    }
    socket.auth = {
      username: data.username,
    }
    socket.connect()
  }, 100))

  return (
    <form onSubmit={onConnect} className="space-y-4">
      <FormInput
        control={control}
        label='Username'
        name="username"
        InputProps={{
          maxLength: USER_NAME.MAX_LENGTH,
          placeholder: 'Enter your name',
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
      <Button type="submit" className="w-full" disabled={!socket}>
        Play
      </Button>
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
