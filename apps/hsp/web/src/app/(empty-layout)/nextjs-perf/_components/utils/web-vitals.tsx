'use client'
import React, { useEffect, useState } from 'react'
import {
  onLCP,
  onTTFB,
  onFCP,
  // onCLS, onINP,
  Metric,
} from 'web-vitals'
import cn from '@hsp/ui/utils/cn'

interface WebVitalsProps {
  className?: string
}

const WebVitals: React.FC<WebVitalsProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<
    Partial<Record<Metric['name'], Metric['value'] | undefined>>
  >({
    LCP: undefined,
    TTFB: undefined,
    FCP: undefined,
    // CLS: undefined,
    // INP: undefined,
  })

  useEffect(() => {
    const reportMetric = (metric: Metric) => {
      setMetrics((prev) => ({ ...prev, [metric.name]: metric.value }))
    }

    onLCP(reportMetric)
    onTTFB(reportMetric)
    onFCP(reportMetric)
    // onCLS(reportMetric)
    // onINP(reportMetric)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 bg-base-400/80 p-1 shadow-lg rounded-lg text-sm text-fore-400',
        className,
      )}
    >
      <h3 className="text-center">Web Vitals</h3>
      <ul className="text-xs flex space-x-2">
        {Object.entries(metrics).map(([name, value]) => (
          <li
            key={name}
            className="mb-1 text-center bg-base-200 rounded-md px-2 py-1"
          >
            <h6 className="text-fore-100">{name}</h6>
            <p className="text-sm">
              {typeof value !== 'undefined' ? (
                `${(value! / 1000).toFixed(2)}s`
              ) : (
                <>_</>
              )}
            </p>
            {/* Keep the width consistent */}
            <p className="text-sm invisible h-0" aria-hidden="true">
              0.00s
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WebVitals
