import { LuCaptions } from 'react-icons/lu'
import { PlayerButton } from '../_base/button'
import { useHTMLElState } from '../_utils/useHTMLVideoState'
import { useState } from 'react'
import { PlayerBaseSubCompProps } from '../types'

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

  if (!isHasSubtitle) {
    return null
  }

  const toggleSubtitle = () => {
    const videoEl = getVideoEl()
    if (!videoEl) return

    const track = videoEl.textTracks[0]
    if (!track) return
    // Toggle subtitle visibility
    track.mode = track.mode === 'showing' ? 'hidden' : 'showing'
    setIsEnabled(track.mode === 'showing')
  }

  return (
    <PlayerButton
      onClick={toggleSubtitle}
      className="text-xs data-[active=true]:border-b border-primary-200"
      data-active={isEnabled}
    >
      <LuCaptions />
    </PlayerButton>
  )
}
