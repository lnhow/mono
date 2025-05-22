import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { socketAtom } from '../../../../state/store'
import { useRouter } from 'next/navigation'
import { EClientToServerEvents, EServerToClientEvents } from '../../../../state/type/socket'

export const useValidateRoom = () => {
  const { socket } = useAtomValue(socketAtom)
  const router = useRouter()

  return useCallback((roomId: string) => {
    if (!socket) {
      return new Promise((_, reject) => {
        reject('Socket not connected')
      })
    }

    return new Promise((resolve, reject) => {
      socket.once(EServerToClientEvents.ROOM_VALIDATE, (res) => {
        const resData = res.data
        if (res.error || !resData) {
          reject(res.error)
          return
        }
        router.push(roomUrl(roomId))
        resolve(res)
      })

      socket.emit(EClientToServerEvents.ROOM_JOIN, {
        roomId: roomId,
      })
    })
  }, [router, socket])
}

export const roomUrl = (roomId: string) => {
  return `/${roomId}`
}
