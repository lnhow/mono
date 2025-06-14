import { LuPause, LuPlay, LuRotateCcw } from 'react-icons/lu'

export const PLAYER_STATE = {
  PLAYING: {
    state: 'playing',
    nextState: {
      icon: LuPause,
      action: (videoEl: HTMLVideoElement) => videoEl.pause(),
    },
  },
  PAUSED: {
    state: 'paused',
    nextState: {
      icon: LuPlay,
      action: (videoEl: HTMLVideoElement) =>
        videoEl.play().catch((error) => {
          console.error('Error playing video:', error)
        }),
    },
  },
  ENDED: {
    state: 'ended',
    nextState: {
      icon: LuRotateCcw,
      action: (videoEl: HTMLVideoElement) => {
        videoEl.currentTime = 0
        videoEl.play().catch((error) => {
          console.error('Error replaying video:', error)
        })
      },
    },
  },
} as const

export type PlayerBaseSubCompProps = {
  getVideoEl: () => HTMLVideoElement | null
  className?: string
}

export type HTMLVideoEvent = keyof HTMLVideoElementEventMap //React.SyntheticEvent<HTMLVideoElement, Event>

export interface DocumentWithCustomFullscreen extends Document {
  webkitFullscreenElement?: Element | null
  mozFullScreenElement?: Element | null
  msFullscreenElement?: Element | null
}
