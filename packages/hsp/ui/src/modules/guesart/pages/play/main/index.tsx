import { useAtomValue } from 'jotai'
import { memo } from 'react'
import { ERoomStatus } from '../../../state/type/room'
import { roomStatusAtom } from '../_state/store'
// import RoomRound from "./round";
import GameEnd from './end'
import GameRound from './round'
import GameStart from './start'

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
