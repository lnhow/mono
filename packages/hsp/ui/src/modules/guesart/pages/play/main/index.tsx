import { memo } from "react";
// import RoomRound from "./round";
import GameEnd from "./end";
// import Lobby from "./lobby";

function RoomMain() {
  // return (
  //   <Lobby />
  // )

  return (
    <GameEnd />
  )

  // return (
  //   <RoomRound />
  // )
}

export default memo(RoomMain)