import { toast } from 'sonner'
import {
  EGrtErrorCode,
  EServerToClientEvents,
  GrtErrorMessages,
  GrtServerToClientEventsPayload,
} from '../../../../state/type/socket'
import { TInitListener } from './_type'

export const initError: TInitListener = (socket) => {
  socket.on(EServerToClientEvents.ERROR, onError)
  return () => {
    socket.off(EServerToClientEvents.ERROR, onError)
  }
}

export function onError(
  message: GrtServerToClientEventsPayload<EServerToClientEvents.ERROR>,
) {
  toast.error(
    GrtErrorMessages[message as EGrtErrorCode]
      ? GrtErrorMessages[message as EGrtErrorCode]
      : GrtErrorMessages['EGRT000'],
  )
}
