import { toast } from 'sonner'
import {
  EGrtErrorCode,
  EServerToClientEvents,
  GrtErrorMessages,
  GrtServerToClientEventsPayload,
} from '../../../../state/type/socket'

export function onError(
  message: GrtServerToClientEventsPayload<EServerToClientEvents.ERROR>,
) {
  toast.error(
    GrtErrorMessages[message as EGrtErrorCode]
      ? GrtErrorMessages[message as EGrtErrorCode]
      : GrtErrorMessages['EGRT000'],
  )
}
