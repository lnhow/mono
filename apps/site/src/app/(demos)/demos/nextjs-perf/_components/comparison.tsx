'use client'
import { useRef, useState, ViewTransition } from 'react'
import { LuCode, LuRefreshCcw } from 'react-icons/lu'
import cn from '@hsp/ui/utils/cn'
import { Button, ButtonLink } from '@hsp/ui/components/button'
import { DELAY } from './const'

const COMPARISONS = {
  current: {
    title: 'Current SSR (No Suspense)',
    src: '/nextjs-perf/ssr',
    codeSrc:
      'https://github.com/lnhow/mono/blob/master/apps/hsp/web/src/app/(empty-layout)/nextjs-perf/ssr/page.tsx',
  },
  cached: {
    title: 'NextJS 16 Suspense + LCP Cache',
    src: '/nextjs-perf/cached',
    codeSrc:
      'https://github.com/lnhow/mono/blob/master/apps/hsp/web/src/app/(empty-layout)/nextjs-perf/cached/page.tsx',
  },
} as const

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
        <div>
          <ViewTransition name="nextjs-perf-title">
            <h1 className="text-fore-400 font-bold">Performance Test</h1>
          </ViewTransition>
          <p className="text-xs text-fore-100">
            * Due to limitations, please{' '}
            <strong className="text-fore-300">
              click on the respective iframes to see its LCP.
            </strong>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={reloadAll}
            className="flex-col h-[unset] font-normal gap-0 px-2 py-1"
          >
            <LuRefreshCcw className="w-2 h-2 text-fore-100" />
            <span className="text-sm">Reload all</span>
          </Button>

          <Tooltip label="Toggle Orientation">
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
          </Tooltip>
          <div className="text-center px-2 py-1 border rounded">
            <p className="text-xs text-fore-100">API delay</p>
            <p className="text-sm">{DELAY}ms</p>
          </div>
        </div>
      </div>
      <ViewTransition name="nextjs-perf-card">
        <div
          className={cn('flex md:flex min-w-screen flex-1 gap-2 px-2 pb-2', {
            'flex-col': isHorizontal,
            'flex-row': !isHorizontal,
          })}
        >
          <ComparisonIframe
            ref={refCurrent}
            title={COMPARISONS.current.title}
            src={COMPARISONS.current.src}
            codeSrc={COMPARISONS.current.codeSrc}
            className="flex flex-col"
            iframeClassName="flex-1 h-full"
          />
          <ComparisonIframe
            ref={refCached}
            title={COMPARISONS.cached.title}
            src={COMPARISONS.cached.src}
            codeSrc={COMPARISONS.cached.codeSrc}
            className="flex flex-col"
            iframeClassName="flex-1 h-full"
          />
        </div>
      </ViewTransition>
    </>
  )
}

import { memo, RefObject, useCallback, useImperativeHandle } from 'react'
import { LuExternalLink } from 'react-icons/lu'
import Tooltip from '@hsp/ui/components/tooltip'

export interface IframeHandle {
  iframe: HTMLIFrameElement | null
  reload: () => void
}

const ComparisonIframe = memo(function ComparisonIframe({
  title,
  src,
  codeSrc,
  className,
  iframeClassName,
  ref,
}: {
  title: string
  src: string
  codeSrc: string
  className?: string
  iframeClassName?: string
  ref?: RefObject<IframeHandle | null>
}) {
  const refIframe = useRef<HTMLIFrameElement>(null)
  const reloadIframe = useCallback(() => {
    if (!refIframe.current) {
      return
    }
    // eslint-disable-next-line no-self-assign
    refIframe.current.src = refIframe.current.src
  }, [])

  useImperativeHandle(ref, () => {
    return {
      reload: reloadIframe,
      get iframe() {
        return refIframe.current
      },
    }
  })

  return (
    <div className={cn('flex-1 w-full border rounded-t-lg', className)}>
      <div className="flex justify-between items-center space-x-2 pl-2">
        <h2 className="text-fore-300">{title}</h2>
        <div className="flex">
          <Tooltip label="View Source Code">
            <ButtonLink
              size="icon"
              variant="ghost"
              aria-label="View Source Code"
              target="_blank"
              rel="noopener noreferrer"
              href={codeSrc}
            >
              <LuCode />
            </ButtonLink>
          </Tooltip>
          <Tooltip label="Open in new tab">
            <ButtonLink
              size="icon"
              variant="ghost"
              aria-label="Open in new tab"
              target="_blank"
              rel="noopener noreferrer"
              href={src}
            >
              <LuExternalLink />
            </ButtonLink>
          </Tooltip>
          <Tooltip label="Refresh Iframe">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Refresh Iframe"
              onClick={reloadIframe}
            >
              <LuRefreshCcw />
            </Button>
          </Tooltip>
        </div>
      </div>
      <iframe
        ref={refIframe}
        src={src}
        className={cn(
          'border w-full rounded-lg border-base-300',
          iframeClassName,
        )}
      ></iframe>
    </div>
  )
})
