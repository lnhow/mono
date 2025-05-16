export type SessionCreateDto = {
  userId: string
}

export type SessionPayload = {
  userId: string
  userName: string
}

export type SessionDto = SessionPayload & {
  session: string
}
