'use client'

import { useEffect, useEffectEvent, useState } from 'react'

export default function Time({
  className,
  locale = 'en-US',
  mode = 'time',
  format,
}: {
  className?: string
  locale?: Intl.LocalesArgument
  mode?: 'time' | 'date'
  format?: Intl.DateTimeFormatOptions
}) {
  const [currentTime, setCurrentTime] = useState<string | null>(null)
  const updateTime = useEffectEvent(() => {
    const now = new Date()
    setCurrentTime(
      mode === 'date'
        ? now.toLocaleDateString(locale, format)
        : now.toLocaleTimeString(locale, format),
    )
  })

  useEffect(() => {
    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  // if (typeof window === 'undefined') {
  //   // Server-side rendering: return an empty placeholder
  //   return <span className={className}>&nbsp;</span>
  // }

  // Client-side rendering: display the current time
  return <span className={className}>{currentTime ?? <>&nbsp;</>}</span>
}
