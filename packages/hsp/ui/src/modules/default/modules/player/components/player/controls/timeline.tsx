import { PlayerBaseSubCompProps, HOTKEYS } from '../types'
import cn from '@hsp/ui/utils/cn'
import { useHTMLElState } from '../../../../../../../hooks/useHTMLElState'
import { Slider } from '@hsp/ui/components/base/slider'
import { useEffect, useRef, useState } from 'react'
import { useKeydown } from '../_utils/useKeydown'

export function DurationIndicator({
  className,
  getVideoEl,
}: PlayerBaseSubCompProps) {
  const current = useVideoCurrentTime(getVideoEl)
  const duration = useVideoDuration(getVideoEl)

  const displayCurrentTime = formatTime(current)
  const displayDuration = formatTime(duration)

  return (
    <div className={cn('text-xs', className)}>
      <span className="current">{displayCurrentTime}</span>
      <span className="separator">{' / '}</span>
      <span className="duration">{displayDuration}</span>
    </div>
  )
}

export function DurationSlider({ getVideoEl }: PlayerBaseSubCompProps) {
  const current = useVideoCurrentTime(getVideoEl)
  const duration = useVideoDuration(getVideoEl)
  const [localCurrent, setLocalCurrent] = useState(current)
  const isChanging = useRef(false)

  const handleValueChange = (value: number[]) => {
    isChanging.current = true
    const newValue = value[0]
    if (
      typeof newValue === 'undefined' ||
      newValue < 0 ||
      newValue > duration
    ) {
      return
    }
    setLocalCurrent(newValue)
  }

  const handleValueCommit = (value: number[]) => {
    const videoEl = getVideoEl()
    const newValue = value[0]
    if (
      !videoEl ||
      typeof newValue === 'undefined' ||
      newValue < 0 ||
      newValue > duration
    ) {
      isChanging.current = false
      return
    }
    videoEl.currentTime = newValue
    setLocalCurrent(newValue)
    isChanging.current = false
  }

  useEffect(() => {
    // Update local current time if not changing
    if (!isChanging.current && current !== localCurrent) {
      setLocalCurrent(current)
    }
  }, [current, localCurrent])

  useKeydown(HOTKEYS.seekBackward, () => {
    const videoEl = getVideoEl()
    if (!videoEl) return
    handleValueCommit([Math.max(0, videoEl.currentTime - 5)])
  })
  useKeydown(HOTKEYS.seekForward, () => {
    const videoEl = getVideoEl()
    if (!videoEl) return
    handleValueCommit([Math.min(duration, videoEl.currentTime + 5)])
  })

  // Note:
  // To show a tooltip with the image of the current time, you have to chop the video to get the image of the current time
  return (
    <Slider
      disabled={duration <= 0}
      max={duration}
      min={0}
      value={[localCurrent]}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
    />
  )
}

const useVideoDuration = (getVideoEl: PlayerBaseSubCompProps['getVideoEl']) => {
  return useHTMLElState(
    getVideoEl,
    ['loadedmetadata', 'durationchange'],
    () => {
      const videoEl = getVideoEl()
      return videoEl ? videoEl.duration || 0 : 0
    },
    () => 0,
  )
}

const useVideoCurrentTime = (
  getVideoEl: PlayerBaseSubCompProps['getVideoEl'],
) => {
  return useHTMLElState(
    getVideoEl,
    ['timeupdate'],
    () => {
      const videoEl = getVideoEl()
      // Avoid Safari send timeupdate event too frequently
      const currentTime = videoEl ? Math.round(videoEl.currentTime) || 0 : 0
      return currentTime
    },
    () => 0,
  )
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return [
    hours > 0 ? hours.toString().padStart(2, '0') : '',
    minutes.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ]
    .filter(Boolean)
    .join(':')
}
