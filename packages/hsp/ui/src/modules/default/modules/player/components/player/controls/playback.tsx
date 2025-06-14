import { PLAYER_STATE, PlayerBaseSubCompProps } from '../types'
import { PlayerButton } from '../_base/button'
import { useHTMLElState } from '../_utils/useHTMLVideoState'

export const ButtonPlayback = ({ getVideoEl }: PlayerBaseSubCompProps) => {
  const playbackState = useHTMLElState(
    getVideoEl,
    ['play', 'pause', 'ended', 'timeupdate'],
    () => {
      const videoEl = getVideoEl()
      if (!videoEl) return PLAYER_STATE.PAUSED
      return videoEl.ended
        ? PLAYER_STATE.ENDED
        : videoEl.paused
          ? PLAYER_STATE.PAUSED
          : PLAYER_STATE.PLAYING
    },
    () => PLAYER_STATE.PAUSED,
  )

  return (
    <PlayerButton
      onClick={() => {
        const videoEl = getVideoEl()
        if (!videoEl) return
        playbackState.nextState.action(videoEl)
      }}
    >
      <playbackState.nextState.icon />
    </PlayerButton>
  )
}
