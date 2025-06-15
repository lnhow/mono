import { useMemo, useRef } from 'react'
import { PlayerBaseSubCompProps, HOTKEYS, TOOLTIPS } from '../types'
import { useHTMLElState } from '../_utils/useHTMLVideoState'
import { PlayerButton } from '../_base/button'
import { LuVolume1, LuVolume2, LuVolumeOff } from 'react-icons/lu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hsp/ui/src/components/base/popover'
import { Slider } from '@hsp/ui/src/components/base/slider'
import { useKeydown } from '../_utils/useKeydown'
import Tooltip from '@hsp/ui/src/components/base/tooltip'

const getVolumeSnapshot = (videoEl: HTMLVideoElement | null) => {
  if (!videoEl) return 0
  return videoEl.muted ? 0 : videoEl.volume
}

export default function ButtonVolume({ getVideoEl }: PlayerBaseSubCompProps) {
  const refPreviousVolume = useRef(100)
  const volume = useHTMLElState(
    getVideoEl,
    ['volumechange', 'play'],
    () => {
      return getVolumeSnapshot(getVideoEl())
    },
    () => 0,
  )
  const icon = useMemo(() => {
    if (volume === 0) {
      return <LuVolumeOff />
    }
    if (volume < 0.5) {
      return <LuVolume1 />
    }
    return <LuVolume2 />
  }, [volume])

  const onVolumeChange = (value: number[]) => {
    const videoEl = getVideoEl()
    const val = value[0]
    if (!videoEl || val === undefined) return
    const newVolume = val / 100

    videoEl.volume = newVolume
    if (newVolume > 0) {
      videoEl.muted = false
      refPreviousVolume.current = newVolume
    } else {
      refPreviousVolume.current = videoEl.volume || 10 // If volume is 0, set previous volume to 10
      videoEl.muted = true
    }
  }

  const toggleMute = () => {
    const videoEl = getVideoEl()
    if (!videoEl) return

    const newVolume = videoEl.muted ? refPreviousVolume.current : 0
    onVolumeChange([newVolume])
  }

  useKeydown(HOTKEYS.mute, toggleMute)
  useKeydown(HOTKEYS.volumeUp, () => {
    const videoEl = getVideoEl()
    if (!videoEl) return
    onVolumeChange([Math.min(videoEl.volume * 100 + 10, 100)])
  })
  useKeydown(HOTKEYS.volumeDown, () => {
    const videoEl = getVideoEl()
    if (!videoEl) return
    onVolumeChange([Math.max(videoEl.volume * 100 - 10, 0)])
  })

  return (
    <Popover>
      <Tooltip label={TOOLTIPS.volume}>
        <PopoverTrigger asChild>
          <PlayerButton>{icon}</PlayerButton>
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent
        className="w-fit flex flex-col justify-center p-2"
        side="top"
      >
        <Slider
          orientation="vertical"
          className="min-h-24! h-24"
          value={[volume * 100]}
          onValueChange={onVolumeChange}
          max={100}
          step={10}
        />
        <PlayerButton onClick={toggleMute} className="mt-2">
          {icon}
        </PlayerButton>
      </PopoverContent>
    </Popover>
  )
}
