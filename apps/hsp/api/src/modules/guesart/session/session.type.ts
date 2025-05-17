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
