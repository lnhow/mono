import { memo } from 'react'
// import RoomRound from "./round";
import GameEnd from './end'
import GameStart from './start'
import GameRound from './round'

function RoomMain() {
  return <GameStart />
  return <GameRound />
  return <GameEnd />
}

export default memo(RoomMain)
