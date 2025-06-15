import { LuPause, LuPlay, LuRotateCcw } from 'react-icons/lu'

export const SKIP_DURATION = 5 // seconds

export const HOTKEYS = {
  playPause: ' ',
  playPause2: 'k',
  volumeUp: 'ArrowUp',
  volumeDown: 'ArrowDown',
  mute: 'm',
  pictureInPicture: 'i',
  fullscreen: 'f',
  captions: 'c',
  seekForward: 'ArrowRight',
  seekBackward: 'ArrowLeft',
}

export const TOOLTIPS = {
  play: 'Play (k)',
  pause: 'Pause (k)',
  replay: 'Replay (k)',
  volume: 'Volume (↑/↓)',
  mute: 'Mute (m)',
  pictureInPicture: 'Picture-in-Picture (i)',
  fullscreen: 'Fullscreen (f)',
  captions: 'Captions (c)',
  playbackRate: 'Playback Speed',
}

export const PLAYER_STATE = {
  PLAYING: {
    state: 'playing',
    nextState: {
      icon: LuPause,
      tooltip: TOOLTIPS.pause,
      action: (videoEl: HTMLVideoElement) => videoEl.pause(),
    },
  },
  PAUSED: {
    state: 'paused',
    nextState: {
      icon: LuPlay,
      tooltip: TOOLTIPS.play,
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
      tooltip: TOOLTIPS.replay,
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

export type PlayerViewControlsProps = {
  getContainerEl: () => HTMLDivElement | null
}
