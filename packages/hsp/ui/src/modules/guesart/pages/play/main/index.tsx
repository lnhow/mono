import { memo } from 'react'
// import RoomRound from "./round";
import GameEnd from './end'
import GameStart from './start'
import GameRound from './round'
import { useAtomValue } from 'jotai'
import { roomStatusAtom } from '../_state/store'
import { ERoomStatus } from '../../../state/type/room'

function RoomMain() {
  const status = useAtomValue(roomStatusAtom)

  if (status === ERoomStatus.waiting) {
    return <GameStart />
  }

  if (status === ERoomStatus.playing) {
    return <GameRound />
  }

  return <GameEnd />
}

export default memo(RoomMain)
