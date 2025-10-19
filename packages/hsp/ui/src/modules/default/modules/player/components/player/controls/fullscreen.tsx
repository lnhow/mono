import { LuFullscreen, LuMinimize } from 'react-icons/lu'
import { PlayerButton } from '../_base/button'
import {
  DocumentWithCrossBrowser,
  useHTMLElState,
} from '@hsp/ui/utils/react/use-html-el-state'
import { PlayerViewControlsProps, HOTKEYS, TOOLTIPS } from '../types'
import { useCallback } from 'react'
import { useKeydown } from '../_utils/useKeydown'
import Tooltip from '@hsp/ui/components/base/tooltip'

const getFullscreenSnapshot = () => {
  return Boolean(
    document.fullscreenElement ||
      (document as DocumentWithCrossBrowser).webkitFullscreenElement ||
      (document as DocumentWithCrossBrowser).mozFullScreenElement ||
      (document as DocumentWithCrossBrowser).msFullscreenElement,
  )
}

export const ButtonFullscreen = ({
  getContainerEl,
}: PlayerViewControlsProps) => {
  const isFullscreen = useHTMLElState(
    () => document,
    [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange',
    ],
    getFullscreenSnapshot,
    () => false, // Default value when not in fullscreen
  )

  const toggleFullscreen = useCallback(() => {
    const isFullscreen = getFullscreenSnapshot()
    if (isFullscreen) {
      document.exitFullscreen().catch((error) => {
        console.error('Error exiting fullscreen:', error)
      })
      return
    }
    const containerEl = getContainerEl()
    if (!containerEl) return
    containerEl.requestFullscreen().catch((error) => {
      console.error('Error requesting fullscreen:', error)
    })
  }, [getContainerEl])

  useKeydown(HOTKEYS.fullscreen, toggleFullscreen)

  return (
    <Tooltip label={TOOLTIPS.fullscreen}>
      <PlayerButton onClick={toggleFullscreen}>
        {isFullscreen ? <LuMinimize /> : <LuFullscreen />}
      </PlayerButton>
    </Tooltip>
  )
}
