import { LuPictureInPicture2 } from 'react-icons/lu'
import { PlayerButton } from '../_base/button'
import { PlayerBaseSubCompProps, PlayerViewControlsProps } from '../types'
import { useCallback, useSyncExternalStore } from 'react'
import {
  detectPictureInPictureSupport,
  TRequestDPIPOptions,
  WindowWithDocumentPictureInPicture,
} from '@hsp/ui/utils/browser/pictureinpicture'
import { useKeydown } from '../_utils/useKeydown'
import { HOTKEYS, TOOLTIPS } from '../types'
import Tooltip from '@hsp/ui/components/tooltip'

const PictureInPictureType = {
  video: {
    getEl: () => document.pictureInPictureElement,
    request: (videoEl: HTMLVideoElement) => videoEl.requestPictureInPicture(),
    exit: () => document.exitPictureInPicture(),
  },
  document: {
    getEl: () => {
      const windowDPIP = window as WindowWithDocumentPictureInPicture
      return windowDPIP.documentPictureInPicture?.window
    },
    request: (options?: TRequestDPIPOptions) => {
      const windowDPIP = window as WindowWithDocumentPictureInPicture
      return windowDPIP.documentPictureInPicture?.requestWindow(options)
    },
    exit: () => {
      const windowDPIP = window as WindowWithDocumentPictureInPicture
      return windowDPIP.documentPictureInPicture?.window?.close()
    },
  },
  false: {
    getEl: () => null,
    request: () => {},
    exit: () => {},
  },
} as const

export type ButtonPictureInPictureProps = PlayerBaseSubCompProps &
  PlayerViewControlsProps

export default function ButtonPictureInPicture({
  getVideoEl,
}: ButtonPictureInPictureProps) {
  const isSupportPIP = useSyncExternalStore(
    () => () => {}, // No need for a subscription, just check once
    () => detectPictureInPictureSupport(),
    () => {
      return 'false' as const // Default value when Picture-in-Picture is not supported
    },
  )

  if (isSupportPIP === 'false') {
    return null
  }

  return <ButtonPictureInPictureVideo getVideoEl={getVideoEl} />
}

const ButtonPictureInPictureVideo = ({
  getVideoEl,
}: PlayerBaseSubCompProps) => {
  const isOpen = useSyncExternalStore(
    (onChange) => {
      const videoEl = getVideoEl()
      if (!videoEl) return () => {}
      const events = ['enterpictureinpicture', 'leavepictureinpicture']
      events.forEach((event) => {
        videoEl.addEventListener(event, onChange)
      })
      return () => {
        events.forEach((event) => {
          videoEl.removeEventListener(event, onChange)
        })
      }
    },
    () => PictureInPictureType.video.getEl() !== null,
    () => false, // Default value when not in Picture-in-Picture
  )

  const handleClick = useCallback(() => {
    const PIP = PictureInPictureType.video
    const videoEl = getVideoEl()
    if (!videoEl) return

    if (PIP.getEl()) {
      PIP.exit().catch((error) => {
        console.error('Error exiting Picture-in-Picture:', error)
      })
      return
    }

    PIP.request(videoEl).catch((error) => {
      console.error('Error requesting Picture-in-Picture:', error)
    })
  }, [getVideoEl])

  // Handle keydown for Picture-in-Picture control
  useKeydown(HOTKEYS.pictureInPicture, handleClick)

  return (
    <ButtonPictureInPictureBase isOpen={isOpen} handleClick={handleClick} />
  )
}

const ButtonPictureInPictureBase = ({
  handleClick,
}: {
  isOpen: boolean
  handleClick: () => void
}) => {
  return (
    <Tooltip
      label={TOOLTIPS.pictureInPicture}
    >
      <PlayerButton onClick={handleClick}>
        <LuPictureInPicture2 />
      </PlayerButton>
    </Tooltip>
  )
}

// Failed to implement the document Picture-in-Picture version
// Reason: complexity
// It requires adding style and script tags to the new window, which is difficult to do in the current setup.
// It should be easier if the player is a standalone application that have its own style and script files.
// const ButtonPictureInPictureDocument = ({
//   getContainerEl,
// }: ButtonPictureInPictureProps) => {
//   const [pipWindow, setPIPWindow] = useState<Window | null>(null)

//   const handleClick = async () => {
//     const containerEl = getContainerEl()
//     if (!containerEl) return

//     const PIP = PictureInPictureType.document
//     const pipWindow = PIP.getEl()
//     if (pipWindow) {
//       // If the Picture-in-Picture window is already open, close it
//       setPIPWindow(null)
//       pipWindow.close()
//       return
//     }

//     try {
//       const newPipWindow = await PIP.request({
//         width: containerEl.clientWidth,
//         height: containerEl.clientHeight,
//       })
//       if (!newPipWindow) {
//         console.error('Failed to request Picture-in-Picture window')
//         return
//       }
//       // Set the new Picture-in-Picture window

//       newPipWindow.document.body.appendChild(containerEl)
//       newPipWindow.document.addEventListener('pagehide', () => {
//         setPIPWindow(null)
//       })
//       newPipWindow.document.addEventListener('enter', () => {
//         setPIPWindow(newPipWindow)
//       })
//     } catch (error) {
//       console.error('Error requesting Picture-in-Picture window:', error)
//       return
//     }
//   }

//   return (
//     <ButtonPictureInPictureBase
//       isOpen={Boolean(pipWindow)}
//       handleClick={handleClick}
//     />
//   )
// }
