export type SessionDto = {
  userId: string
  userName: string
  session: string
}

export const USER_NAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 15,
} as const

export const SESSION_STORAGE_KEY = 'session'
