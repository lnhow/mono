import { useSyncExternalStore } from 'react'
import { PLAYER_STATE, PlayerBaseSubCompProps } from '../types'
import { PlayerButton } from '../_base/button'

export const ButtonPlayback = ({ getVideoEl }: PlayerBaseSubCompProps) => {
  const videoState = useSyncExternalStore(
    (onChange) => {
      const videoEl = getVideoEl()
      if (!videoEl) return () => {}
      const events = ['play', 'pause', 'ended']
      events.forEach((event) => {
        videoEl.addEventListener(event, onChange)
      })

      return () => {
        events.forEach((event) => {
          videoEl.removeEventListener(event, onChange)
        })
      }
    },
    () => {
      const videoEl = getVideoEl()
      if (!videoEl) return PLAYER_STATE.PAUSED
      return videoEl.ended
        ? PLAYER_STATE.ENDED
        : videoEl.paused
          ? PLAYER_STATE.PAUSED
          : PLAYER_STATE.PLAYING
    },
    () => {
      return PLAYER_STATE.PAUSED
    },
  )

  return (
    <PlayerButton
      onClick={() => {
        const videoEl = getVideoEl()
        if (!videoEl) return
        videoState.nextState.action(videoEl)
      }}
    >
      <videoState.nextState.icon />
    </PlayerButton>
  )
}
