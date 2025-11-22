'use client'
import { useTransition } from 'react'
import { login, logout, MockLoginResponse } from '../../../data/api-server'
import { Button } from '@hsp/ui/components/button'
import cn from '@hsp/ui/utils/cn'

export function UserInfo({ data }: { data: MockLoginResponse }) {
  const [isPending, setTransition] = useTransition()

  const handleLogout = () => {
    setTransition(async () => {
      await logout()
    })
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      disabled={isPending}
      aria-label="User menu"
      onClick={handleLogout}
    >
      {/* Testing only */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.avatarUrl}
        alt={data.username}
        className="h-6 w-6 rounded-full"
      />
    </Button>
  )
}

export function LoginButton() {
  const [isPending, setTransition] = useTransition()

  const handleLogin = () => {
    setTransition(async () => {
      await login()
    })
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={handleLogin}
      disabled={isPending}
    >
      Login
    </Button>
  )
}
