'use client'
import { memo, useCallback, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { RESET, useAtomCallback } from 'jotai/utils'
import { usePathname, useRouter } from 'next/navigation'
import { debounce } from 'lodash'

import { sessionAtom, socketAtom } from '../../state/store'
import { roomAtom, roomIsLoadingAtom, roomMetadataAtom } from './_state/store'
import { SESSION_STORAGE_KEY } from '../../state/type/session'
import {
  EClientToServerEvents,
  EServerToClientEvents,
} from '../../state/type/socket'
import { LOBBY_URL } from '../../utils'

import Sidebar from './sidebar'
import RoomSkeleton from './skeleton'
import RoomMain from './main'
import { initSocket } from './_state/listeners'

function PagePlay() {
  const isLoading = useAtomValue(roomIsLoadingAtom)

  useInitRoom()

  if (isLoading) {
    return <RoomSkeleton />
  }

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <RoomMain />
      <Sidebar className="w-full md:w-[360px] md:max-w-4/12" />
    </div>
  )
}
export default memo(PagePlay)

const debouncedInit = debounce((fn: () => void) => {
  fn()
}, 50)

const useInitRoom = () => {
  const router = useRouter()
  const pathname = usePathname()
  const session = useAtomValue(sessionAtom)

  const loadGameState = useAtomCallback(
    useCallback(
      (get, set) => {
        const { socket } = get(socketAtom)
        if (!socket) {
          return
        }

        const cleanup = initSocket(socket)

        debouncedInit(() => {
          new Promise((resolve, reject) => {
            socket.once(EServerToClientEvents.ROOM_JOIN, (res) => {
              const resData = res.data
              if (res.error || !resData) {
                reject(res.error)
                return
              }

              set(roomIsLoadingAtom, false)
              set(roomMetadataAtom, resData)
              resolve(res)
            })

            const roomId = pathname.split('/').pop()
            if (!roomId) {
              return reject('Room id not found')
            }
            socket.emit(EClientToServerEvents.ROOM_JOIN, {
              roomId,
            })
          }).catch((err) => {
            console.error(err)
            router.push(LOBBY_URL)
          })
        })

        return () => {
          cleanup()
          socket.off(EServerToClientEvents.ROOM_JOIN)
          const { metadata } = get(roomAtom)
          if (metadata.id) {
            socket.emit(EClientToServerEvents.ROOM_LEAVE)
          }
          set(roomAtom, RESET)
        }
      },
      [pathname, router],
    ),
  )

  return useEffect(() => {
    if (!session.userId) {
      try {
        const session = sessionStorage.getItem(SESSION_STORAGE_KEY)
        if (!session) {
          router.push(LOBBY_URL)
          return
        }
      } catch {
        /*ignore*/
      }
    }
    // Wait for socket to connect & log in
    const cleanup = loadGameState()

    return cleanup
  }, [router, session, loadGameState])
}
