import { LuFullscreen, LuMinimize } from 'react-icons/lu'
import { PlayerButton } from '../_base/button'
import { DocumentWithCrossBrowser, useHTMLElState } from '../_utils/useHTMLVideoState'

type PlayerButtonFullscreenProps = {
  getContainerEl: () => HTMLDivElement | null
}

export const ButtonFullscreen = ({
  getContainerEl,
}: PlayerButtonFullscreenProps) => {
  const isFullscreen = useHTMLElState(
    () => document,
    [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange',
    ],
    () => {
      return Boolean(
        document.fullscreenElement ||
          (document as DocumentWithCrossBrowser).webkitFullscreenElement ||
          (document as DocumentWithCrossBrowser).mozFullScreenElement ||
          (document as DocumentWithCrossBrowser).msFullscreenElement,
      )
    },
    () => false, // Default value when not in fullscreen
  )

  return (
    <PlayerButton
      onClick={() => {
        const containerEl = getContainerEl()
        if (!containerEl) return
        if (isFullscreen) {
          document.exitFullscreen().catch((error) => {
            console.error('Error exiting fullscreen:', error)
          })
        } else {
          containerEl.requestFullscreen().catch((error) => {
            console.error('Error requesting fullscreen:', error)
          })
        }
      }}
    >
      {isFullscreen ? <LuMinimize /> : <LuFullscreen />}
    </PlayerButton>
  )
}
