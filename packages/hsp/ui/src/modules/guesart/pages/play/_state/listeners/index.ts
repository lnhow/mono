import { toast } from 'sonner'
import {
  EGrtErrorCode,
  EServerToClientEvents,
  GrtErrorMessages,
  GrtServerToClientEventsPayload,
  GrtSocket,
} from '../../../../state/type/socket'

export const initSocket = (socket?: GrtSocket) => {
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

function onError(
  message: GrtServerToClientEventsPayload<EServerToClientEvents.ERROR>,
) {
  toast.error(
    GrtErrorMessages[message as EGrtErrorCode]
      ? GrtErrorMessages[message as EGrtErrorCode]
      : GrtErrorMessages['EGRT000'],
  )
}
