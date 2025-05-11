export type PlayerDto = {
  id: string
  name: string
  score: number
}

export type MessageResDto = {
  id: string
  content: string
  sender: {
    id: string
    name: string
  }
}

export type MessageReqDto = {
  content: string
}
