'use server'
import { cache } from 'react'
import apiClient, { sleep } from './http'
import { cookies } from 'next/headers'

const COOKIE = {
  NAME: 'mock_auth',
  VALUE: 'mock_token',
} as const

export interface MockLoginResponse {
  id: number
  username: string
  avatarUrl: string
}

export const fetchUserData = cache(async () => {
  const cookieStore = await cookies()
  const auth = cookieStore.get(COOKIE.NAME)

  try {
    if (!auth) {
      return null
    }
    const user = JSON.parse(auth.value) as MockLoginResponse
    if (!user.id || !user.username || !user.avatarUrl) {
      return null
    }
    return user
  } catch {
    return null
  }
})

export async function login() {
  await sleep()
  const { data } = await apiClient.get<MockLoginResponse>(
    '/api/perf-test/login-info',
  )

  if (!data) {
    throw new Error('Login failed')
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE.NAME, JSON.stringify(data), {
    httpOnly: true,
    path: '/',
  })
  return { success: true }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE.NAME)
}
