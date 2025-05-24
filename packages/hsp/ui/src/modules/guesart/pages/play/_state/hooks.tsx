import { useAtomValue, useSetAtom } from 'jotai'
import { socketAtom } from '../../../state/store'
import {
  EServerToClientEvents,
  GrtServerToClientEventsPayload,
} from '../../../state/type/socket'
import { useEffect } from 'react'
import { roomPlayersAtom } from './store'

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
