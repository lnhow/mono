import { useSyncExternalStore } from 'react'

type EventKeysForEl<El extends HTMLElement> = 
  El extends HTMLVideoElement ? keyof HTMLVideoElementEventMap :
  keyof HTMLElementEventMap;

export const useHTMLVideoState = function <T, El extends HTMLElement>(
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
