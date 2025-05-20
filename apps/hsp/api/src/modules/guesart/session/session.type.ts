export type SessionCreateDto = {
  userId: string
}

export type SessionPayload = {
  sub: string // userId, in JWT standard
  userName: string
}

export type SessionDto = {
  userId: string
  userName: string
  session: string
}

export const USER_NAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 15,
} as const
