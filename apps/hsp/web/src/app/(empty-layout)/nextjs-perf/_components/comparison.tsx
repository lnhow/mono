'use client'
import { useRef, useState } from 'react'
import { DELAY } from './const'
import ComparisonIframe, { IframeHandle } from './iframe'
import { Button } from '@hsp/ui/components/button'
import { LuRefreshCcw } from 'react-icons/lu'
import cn from '@hsp/ui/utils/cn'

export default function Comparison() {
  const [isHorizontal, setIsHorizontal] = useState(false)
  const refCurrent = useRef<IframeHandle>(null)
  const refCached = useRef<IframeHandle>(null)

  const reloadAll = () => {
    refCurrent.current?.reload()
    refCached.current?.reload()
  }

  const toggleOrientation = () => {
    setIsHorizontal((prev) => !prev)
  }

  return (
    <>
      <div className="p-2 flex items-center justify-between space-x-4">
        <h1 className="text-fore-400 font-bold">Performance Test</h1>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={reloadAll}
            className="flex-col h-[unset] font-normal gap-0 px-2 py-1"
          >
            <LuRefreshCcw className="w-2 h-2 text-fore-100" />
            <span className="text-sm">Reload</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleOrientation}
            className="flex-col h-[unset] font-normal gap-0 px-2 py-1"
          >
            <span className="text-xs text-fore-100">Orientation</span>
            {/* Keep the button width consistent */}
            <span className="invisible h-0 text-sm">Horizontal</span>
            <span className="text-sm">
              {isHorizontal ? 'Horizontal' : 'Vertical'}
            </span>
          </Button>
          <div className="text-center px-2 py-1 border rounded">
            <p className="text-xs text-fore-100">API delay</p>
            <p className="text-sm">{DELAY}ms</p>
          </div>
        </div>
      </div>
      <div
        className={cn('flex md:flex min-w-screen flex-1 gap-2 px-2 pb-2', {
          'flex-col': isHorizontal,
          'flex-row': !isHorizontal,
        })}
      >
        <ComparisonIframe
          ref={refCurrent}
          title="Current"
          src="/nextjs-perf/ssr"
          className="flex flex-col"
          iframeClassName="flex-1 h-full"
        />
        <ComparisonIframe
          ref={refCached}
          title="NextJS 16 Suspense + LCP Cache"
          src="/nextjs-perf/cached"
          className="flex flex-col"
          iframeClassName="flex-1 h-full"
        />
      </div>
    </>
  )
}
