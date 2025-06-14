import { useSyncExternalStore } from 'react'

type SupportedElement = HTMLElement | Document;
type EventKeysForEl<El extends SupportedElement> = 
  El extends HTMLVideoElement ? keyof HTMLVideoElementEventMap :
  El extends Document ? keyof DocumentEventMapCrossBrowser :
  keyof HTMLElementEventMap;

export const useHTMLElState = function <T, El extends SupportedElement>(
  getEl: (() => El | null),
  events: EventKeysForEl<El>[],
  getSnapshot: () => T,
  getServerSnapshot: () => T,
) {
  return useSyncExternalStore(
    (onChange) => {
      const el = getEl()
      if (!el) return () => {}

      events.forEach((event) => {
        el.addEventListener(event, onChange)
      })

      return () => {
        events.forEach((event) => {
          el.removeEventListener(event, onChange)
        })
      }
    },
    getSnapshot,
    getServerSnapshot,
  )
}

export interface DocumentEventMapCrossBrowser extends DocumentEventMap {
  webkitfullscreenchange: Event;
  mozfullscreenchange: Event;
  MSFullscreenChange: Event;
}

export interface DocumentWithCrossBrowser extends Document {
  webkitFullscreenElement?: Element | null
  mozFullScreenElement?: Element | null
  msFullscreenElement?: Element | null
}
