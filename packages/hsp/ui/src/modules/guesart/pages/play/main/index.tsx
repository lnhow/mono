import { memo } from "react";
import RoomRound from "./round";
// import Lobby from "./lobby";

function RoomMain() {
  // return (
  //   <Lobby />
  // )

  return (
    <RoomRound />
  )
}

export default memo(RoomMain)