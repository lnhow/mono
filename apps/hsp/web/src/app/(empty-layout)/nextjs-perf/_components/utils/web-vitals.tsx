'use client'
import React, { useEffect, useState } from 'react'
import { onLCP, onTTFB, onFCP, Metric } from 'web-vitals'
import cn from '@hsp/ui/utils/cn'

interface WebVitalsProps {
  className?: string
}

const WebVitals: React.FC<WebVitalsProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<
    Partial<Record<Metric['name'], Metric['value'] | undefined>>
  >({
    LCP: undefined,
    // CLS: undefined,
    // INP: undefined,
    TTFB: undefined,
    FCP: undefined,
  })

  useEffect(() => {
    const reportMetric = (metric: Metric) => {
      setMetrics((prev) => ({ ...prev, [metric.name]: metric.value }))
    }

    onLCP(reportMetric)
    // onCLS(reportMetric)
    // onINP(reportMetric)
    onTTFB(reportMetric)
    onFCP(reportMetric)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 bg-base-400/80 p-3 shadow-lg rounded-lg text-sm text-fore-400',
        className,
      )}
    >
      <h3 className="font-semibold">Web Vitals</h3>
      <ul className="text-xs">
        {Object.entries(metrics).map(([name, value]) => (
          <li key={name} className="mb-1">
            <strong className="text-fore-100">{name}:</strong>{' '}
            {typeof value !== 'undefined'
              ? `${(value! / 1000).toFixed(2)}s`
              : '_'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WebVitals
