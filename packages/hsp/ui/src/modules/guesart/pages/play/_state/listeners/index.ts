import {
  EServerToClientEvents,
  GrtSocket,
} from '../../../../state/type/socket'
import { onError } from './error'

export const initSocket = (socket?: GrtSocket, ) => {
  if (!socket) {
    return () => {
      /* noop */
    }
  }

  socket.on(EServerToClientEvents.ERROR, onError)
  return () => {
    socket.off(EServerToClientEvents.ERROR, onError)
  }
}
