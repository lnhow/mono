import { initError } from './error'
import { TInitListener } from './_type'
import { initGameStateListener } from './game'

export const initSocket: TInitListener = (socket, state) => {
  const cleanups = [
    initGameStateListener(socket, state),
    initError(socket, state),
  ]
  return () => {
    cleanups.forEach((cleanupFn) => {
      cleanupFn()
    })
  }
}
