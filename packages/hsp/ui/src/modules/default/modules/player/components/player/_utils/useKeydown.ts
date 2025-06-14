import { useEffect } from 'react'

export const useKeydown = (key: string, callback: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement
      if (activeElement) {
        const tagName = activeElement.tagName || ''
        const isContentEditable = (activeElement as HTMLElement).isContentEditable
        if (
          // Ignore keydown events in input, textarea, and contenteditable elements
          ['INPUT', 'TEXTAREA'].includes(tagName) || isContentEditable ||
           // If the active element is a button and space key is pressed, allow default behavior
          (activeElement.tagName === 'BUTTON' && key === ' ')
        ) {
          return
        }
      }

      if (event.key === key) {
        event.preventDefault()
        callback(event)
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [key, callback])
}
