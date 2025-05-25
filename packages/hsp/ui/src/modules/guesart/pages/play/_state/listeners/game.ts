import {
  EServerToClientEvents,
  GrtServerToClientEventsPayload,
} from '../../../../state/type/socket'
import { roomRoundAtom } from '../store'
import { TInitListener } from './_type'

export const initGameStateListener: TInitListener = (socket, state) => {
  function onNextRound(
    data: GrtServerToClientEventsPayload<EServerToClientEvents.ROUND_NEXT>,
  ) {
    state.set(roomRoundAtom, (prev) => ({
      ...prev,
      number: data.round,
      drawerId: data.drawer,
      word: data.word,
      wordImg: data.wordImg || '',
    }))
  }

  socket.on(EServerToClientEvents.ROUND_NEXT, onNextRound)
  return () => {
    socket.off(EServerToClientEvents.ROUND_NEXT, onNextRound)
  }
}
