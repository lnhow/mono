import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { gameAtom, socketAtom } from '../../../../state/store'
import { useRouter } from 'next/navigation'
import { EClientToServerEvents, EServerToClientEvents } from '../../../../state/type/socket'

export const useJoinRoom = () => {
  const { socket } = useAtomValue(socketAtom)
  const setGameAtom = useSetAtom(gameAtom)
  const router = useRouter()

  return useCallback((roomId: string) => {
    if (!socket) {
      return new Promise((_, reject) => {
        reject('Socket not connected')
      })
    }

    return new Promise((resolve, reject) => {
      socket.once(EServerToClientEvents.ROOM_JOIN, (res) => {
        const resData = res.data
        if (res.error || !resData) {
          reject(res.error)
          return
        }
        setGameAtom((prev) => {
          return {
            ...prev,
            metadata: resData,
          }
        })
        router.push(`/${resData.id}`)
        resolve(res)
      })

      socket.emit(EClientToServerEvents.ROOM_JOIN, {
        roomId: roomId,
      })
    })
  }, [router, setGameAtom, socket])
}
