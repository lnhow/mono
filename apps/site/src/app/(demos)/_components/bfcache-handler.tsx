'use client'

import { useEffect } from 'react'

/**
 * Handles browser back/forward cache (bfcache) restoration.
 * When a 3D demo page is restored from bfcache with `event.persisted === true`,
 * WebGL contexts can be frozen or disposed. A reload guarantees a clean WebGL state.
 */
export function BfcacheHandler() {
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload()
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return null
}
