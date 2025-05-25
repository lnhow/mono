import { Getter, Setter } from 'jotai'
import { GrtSocket } from '../../../../state/type/socket'

export type TInitListener = (
  socket: GrtSocket,
  state: { get: Getter; set: Setter },
) => () => void
