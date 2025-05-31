import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { socketAtom } from '../../../../state/store'
import { useRouter } from 'next/navigation'
import { EClientToServerEvents, EServerToClientEvents } from '../../../../state/type/socket'
import { getRoomUrl } from '../../../../utils'

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
        router.push(getRoomUrl(roomId))
        resolve(res)
      })

      socket.emit(EClientToServerEvents.ROOM_VALIDATE, {
        roomId,
      })
    })
  }, [router, socket])
}
