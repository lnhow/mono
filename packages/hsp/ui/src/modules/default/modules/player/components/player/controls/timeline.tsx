import { PlayerBaseSubCompProps } from '../types'
import cn from '@hsp/ui/src/utils/cn'
import { useHTMLVideoState } from '../_utils/useHTMLVideoState'
import { Slider } from '@hsp/ui/src/components/base/slider'
import { useState } from 'react'

const useVideoDuration = (getVideoEl: PlayerBaseSubCompProps['getVideoEl']) => {
  return useHTMLVideoState(
    getVideoEl,
    ['loadedmetadata', 'durationchange'],
    () => {
      const videoEl = getVideoEl()
      return videoEl ? videoEl.duration : 0
    },
    () => 0,
  )
}

const useVideoCurrentTime = (
  getVideoEl: PlayerBaseSubCompProps['getVideoEl'],
) => {
  return useHTMLVideoState(
    getVideoEl,
    ['timeupdate'],
    () => {
      const videoEl = getVideoEl()
      return videoEl ? videoEl.currentTime : 0
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

  const handleValueChange = (value: number[]) => {
    const newValue = value[0]
    if (!newValue || newValue < 0 || newValue > duration) {
      return
    }
    setLocalCurrent(newValue)
  }

  const handleValueCommit = (value: number[]) => {
    const videoEl = getVideoEl()
    const newValue = value[0]
    if (!videoEl || !newValue || newValue < 0 || newValue > duration) {
      return
    }
    videoEl.currentTime = newValue
    setLocalCurrent(newValue)
  }

  return (
    <Slider
      max={duration}
      min={0}
      value={[localCurrent]}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
    />
  )
}
