'use client'
// import { useTranslation } from '@i18n/client'
// import { nsCommon } from '@hsp/ui/components/common/types'
import { useCopyToClipboard as _useCopyToClipboard } from 'usehooks-ts'
import { memo, useCallback, useEffect, useRef } from 'react'
import { LuCheck, LuCopy } from 'react-icons/lu'
import { Button } from '@hsp/ui/src/components/base/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@hsp/ui/src/components/base/tooltip/base'


export function useCopyToClipboard(): [boolean, (text: string) => void] {
  const [copiedText, _copy] = _useCopyToClipboard()
  const timeoutRef = useRef<number | null>(null)

  const copy = useCallback((text: string) => {
    _copy(text)
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      _copy('')
    }, 3000)
  }, [_copy])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  return [Boolean(copiedText), copy]
}

function ButtonCopy({
  textToCopy,
  disabled,
}: {
  textToCopy: string
  disabled?: boolean
}) {
  // const { t } = useTranslation(nsCommon)
  const [copiedText, copy] = _useCopyToClipboard()
  const timeoutRef = useRef<number | null>(null)

  const delayResetCopy = useCallback(() => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      copy('')
    }, 3000)
  }, [copy])

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={150}>
      <Tooltip open={Boolean(copiedText)}>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            disabled={disabled}
            onClick={() => {
              copy(textToCopy)
              delayResetCopy()
            }}
          >
            {copiedText ? <LuCheck /> : <LuCopy />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copiedText ? 'Copied' : 'Copy'}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default memo(ButtonCopy)
