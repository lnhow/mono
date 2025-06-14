import { PLAYER_STATE, PlayerBaseSubCompProps } from '../types'
import { PlayerButton } from '../_base/button'
import { useHTMLElState } from '../_utils/useHTMLVideoState'
import { useCallback } from 'react'
import { useKeydown } from '../_utils/useKeydown'

export const usePlaybackState = (getVideoEl: PlayerBaseSubCompProps['getVideoEl']) => {
  const playbackState = useHTMLElState(
    getVideoEl,
    ['play', 'pause', 'ended', 'timeupdate'],
    () => {
      return getPlaybackStateSnapshot(getVideoEl())
    },
    () => PLAYER_STATE.PAUSED,
  )

  return playbackState
}

export const getPlaybackStateSnapshot = (videoEl: HTMLVideoElement | null) => {
  if (!videoEl) return PLAYER_STATE.PAUSED
  return videoEl.ended
    ? PLAYER_STATE.ENDED
    : videoEl.paused
      ? PLAYER_STATE.PAUSED
      : PLAYER_STATE.PLAYING
}

export const togglePlayback = (
  videoEl: HTMLVideoElement | null,
): void => {
  if (!videoEl) return

  const state = getPlaybackStateSnapshot(videoEl)
  state.nextState.action(videoEl)
}

export const ButtonPlayback = ({ getVideoEl }: PlayerBaseSubCompProps) => {
  const playbackState = usePlaybackState(getVideoEl)

  const onClick = useCallback(() => {
    togglePlayback(getVideoEl())
  }, [getVideoEl])

  // Handle keydown for playback control
  useKeydown('k', onClick)
  useKeydown(' ', onClick)

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
