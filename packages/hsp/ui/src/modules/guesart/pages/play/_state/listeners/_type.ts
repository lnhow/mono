import type { Getter, Setter } from 'jotai'
import type { GrtSocket } from '../../../../state/type/socket'

export type TInitListener = (
  socket: GrtSocket,
  state: { get: Getter; set: Setter },
) => () => void
