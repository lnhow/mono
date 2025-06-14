import { useMemo, useRef } from 'react'
import { PlayerBaseSubCompProps } from '../types'
import { useHTMLElState } from '../_utils/useHTMLVideoState'
import { PlayerButton } from '../_base/button'
import { LuVolume1, LuVolume2, LuVolumeOff } from 'react-icons/lu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hsp/ui/src/components/base/popover'
import { Slider } from '@hsp/ui/src/components/base/slider'

export default function ButtonVolume({ getVideoEl }: PlayerBaseSubCompProps) {
  const refPreviousVolume = useRef(100)
  const volume = useHTMLElState(
    getVideoEl,
    ['volumechange', 'play'],
    () => {
      const videoEl = getVideoEl()
      if (!videoEl) {
        return 0
      }
      return videoEl.muted ? 0 : videoEl.volume
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
      videoEl.muted = true
    }
  }

  const toggleMute = () => {
    const videoEl = getVideoEl()
    if (!videoEl) return

    onVolumeChange([videoEl.muted ? refPreviousVolume.current : 0])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PlayerButton>{icon}</PlayerButton>
      </PopoverTrigger>
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
