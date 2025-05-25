import { ERoomStatus } from '../../../../state/type/room'
import {
  EServerToClientEvents,
  GrtServerToClientEventsPayload,
} from '../../../../state/type/socket'
import { roomRoundAtom, roomStatusAtom } from '../store'
import { TInitListener } from './_type'

export const initGameStateListener: TInitListener = (socket, state) => {
  function onNextRound(
    data: GrtServerToClientEventsPayload<EServerToClientEvents.ROUND_NEXT>,
  ) {
    console.log('\x1B[35m[Dev log]\x1B[0m -> data:', data)
    state.set(roomStatusAtom, ERoomStatus.playing)
    state.set(roomRoundAtom, (prev) => ({
      ...prev,
      number: data.round,
      drawerId: data.drawer,
      word: data.word,
      wordImg: data.wordImg || '',
      status: ERoomStatus.waiting,
    }))
  }

  function onStartRound(
    data: GrtServerToClientEventsPayload<EServerToClientEvents.ROUND_START>,
  ) {
    state.set(roomRoundAtom, (prev) => ({
      ...prev,
      endAt: data.endAt,
      status: ERoomStatus.playing,
    }))
  }

  function onEndRound(
    data: GrtServerToClientEventsPayload<EServerToClientEvents.ROUND_END>,
  ) {
    state.set(roomRoundAtom, (prev) => ({
      ...prev,
      word: data.word,
      status: ERoomStatus.finished,
    }))
  }

  function onEndGame() {
    state.set(roomStatusAtom, ERoomStatus.finished)
  }

  socket.on(EServerToClientEvents.ROUND_NEXT, onNextRound)
  socket.on(EServerToClientEvents.ROUND_START, onStartRound)
  socket.on(EServerToClientEvents.ROUND_END, onEndRound)
  socket.on(EServerToClientEvents.GAME_END, onEndGame)
  return () => {
    socket.off(EServerToClientEvents.ROUND_NEXT, onNextRound)
    socket.off(EServerToClientEvents.ROUND_START, onStartRound)
    socket.off(EServerToClientEvents.ROUND_END, onEndRound)
    socket.off(EServerToClientEvents.GAME_END, onEndGame)
  }
}
