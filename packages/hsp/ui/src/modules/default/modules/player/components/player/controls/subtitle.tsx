import { LuCaptions } from 'react-icons/lu'
import { PlayerButton } from '../_base/button'
import { useHTMLElState } from '../_utils/useHTMLVideoState'
import { useState } from 'react'
import { PlayerBaseSubCompProps, HOTKEYS, TOOLTIPS } from '../types'
import { useKeydown } from '../_utils/useKeydown'
import Tooltip from '@hsp/ui/src/components/base/tooltip'

export default function ButtonSubtitle({ getVideoEl }: PlayerBaseSubCompProps) {
  const isHasSubtitle = useHTMLElState(
    getVideoEl,
    ['loadedmetadata', 'cuechange'],
    () => {
      const videoEl = getVideoEl()
      return videoEl && videoEl.textTracks.length > 0
    },
    () => false, // Default value when no subtitles are available
  )
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSubtitle = () => {
    const videoEl = getVideoEl()
    if (!videoEl || !isHasSubtitle) return

    const track = videoEl.textTracks[0]
    if (!track) return
    // Toggle subtitle visibility
    track.mode = track.mode === 'showing' ? 'hidden' : 'showing'
    setIsEnabled(track.mode === 'showing')
  }

  useKeydown(HOTKEYS.captions, toggleSubtitle)

  if (!isHasSubtitle) {
    return null
  }

  return (
    <Tooltip label={TOOLTIPS.captions}>
      <PlayerButton
        onClick={toggleSubtitle}
        className="text-xs data-[active=true]:border-b border-primary-200"
        data-active={isEnabled}
      >
        <LuCaptions />
      </PlayerButton>
    </Tooltip>
  )
}
