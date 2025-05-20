'use client'
import { Button } from '@hsp/ui/src/components/base/button'
import { Card } from '@hsp/ui/src/components/base/card'
import { Input } from '@hsp/ui/src/components/base/input'
import { Label } from '@hsp/ui/src/components/base/label'
import { useEffect } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { socketAtom } from '../../state/store'
import { useAtomValue } from 'jotai'

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

  const onConnect = handleSubmit((data) => {
    localStorage.setItem(STORAGE_KEY.USERNAME, data.username)
    if (!socket) {
      return
    }
    socket.auth = {
      username: data.username,
    }
    socket.connect()
  })

  return (
    <Card className="p-6 shadow-md max-w-sm w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Guesart</h2>
      <form onSubmit={onConnect} className="space-y-4">
        <Label htmlFor="username" className='block mb-2'>
          Username
        </Label>
        <Controller
          name="username"
          control={control}
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
          render={({ field, formState }) => {
            return (
              <div>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  className="w-full"
                  maxLength={USER_NAME.MAX_LENGTH}
                />
                <span className="text-error-300">
                  {formState.errors?.username?.message || <>&nbsp;</>}
                </span>
              </div>
            )
          }}
        />
        <Button type="submit" className="w-full" disabled={!socket}>
          Play
        </Button>
      </form>
    </Card>
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
