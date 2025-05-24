import { memo } from "react";
// import Canvas from "./round/play/Canvas";
import Lobby from "./lobby";

function RoomMain() {
  return (
    <Lobby />
  )
  // return (
  //   <Canvas />
  // )
}

export default memo(RoomMain)