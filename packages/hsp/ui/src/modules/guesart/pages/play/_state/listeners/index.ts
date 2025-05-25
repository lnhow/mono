import { EServerToClientEvents } from '../../../../state/type/socket'
import { onError } from './error'
import { TInitListener } from './_type';
import { initGameStateListener } from './game';

export const initSocket: TInitListener = (
  socket,
  state,
) => {
  const cleanups = [
    initGameStateListener(socket, state)
  ]

  socket.on(EServerToClientEvents.ERROR, onError)
  return () => {
    socket.off(EServerToClientEvents.ERROR, onError)
    cleanups.forEach((cleanupFn) => {
      cleanupFn()
    })
  }
}
