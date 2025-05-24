import { useAtomValue, useSetAtom } from 'jotai'
import { sessionAtom, socketAtom } from '../../../state/store'
import {
  EServerToClientEvents,
  GrtServerToClientEventsPayload,
} from '../../../state/type/socket'
import { useEffect, useMemo } from 'react'
import { roomPlayersAtom, roomRoundAtom } from './store'

export const useIsDrawer = () => {
  const { userId } = useAtomValue(sessionAtom)
  const { drawerId: drawer } = useAtomValue(roomRoundAtom)

  return useMemo(() => {
    return drawer === userId
  }, [drawer, userId])
}

export const useListenRoomPlayers = () => {
  const { socket } = useAtomValue(socketAtom)
  const setPlayers = useSetAtom(roomPlayersAtom)

  useEffect(() => {
    if (!socket) {
      return
    }

    function updateUserInfo(
      players: GrtServerToClientEventsPayload<EServerToClientEvents.ROOM_USERS>,
    ) {
      setPlayers(players)
    }

    socket.on(
      EServerToClientEvents.ROOM_USERS,
      updateUserInfo,
    )
    return () => {
      socket.off(EServerToClientEvents.ROOM_USERS, updateUserInfo)
    }
  })
}
