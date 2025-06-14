import { useSyncExternalStore } from 'react'
import { DocumentWithCustomFullscreen } from '../types'
import { LuFullscreen, LuMinimize } from 'react-icons/lu'
import { PlayerButton } from '../_base/button'

type PlayerButtonFullscreenProps = {
  getContainerEl: () => HTMLDivElement | null
}

export const ButtonFullscreen = ({
  getContainerEl,
}: PlayerButtonFullscreenProps) => {
  const isFullscreen = useSyncExternalStore(
    (onChange) => {
      const events = [
        'fullscreenchange',
        'webkitfullscreenchange',
        'mozfullscreenchange',
        'MSFullscreenChange',
      ]
      events.forEach((event) => {
        document.addEventListener(event, onChange)
      })

      return () => {
        events.forEach((event) => {
          document.removeEventListener(event, onChange)
        })
      }
    },
    () => {
      return Boolean(
        document.fullscreenElement ||
          (document as DocumentWithCustomFullscreen).webkitFullscreenElement ||
          (document as DocumentWithCustomFullscreen).mozFullScreenElement ||
          (document as DocumentWithCustomFullscreen).msFullscreenElement,
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
