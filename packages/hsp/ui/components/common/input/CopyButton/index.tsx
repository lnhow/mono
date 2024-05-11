'use client'
import { useTranslation } from '@i18n/client'
import { Button, Tooltip, TooltipTrigger } from 'react-aria-components'
import { nsCommon } from '@hsp/ui/components/common/types'
import { useCopyToClipboard } from 'usehooks-ts'
import { useCallback, useEffect, useRef } from 'react'
import { MdCheck, MdCopyAll } from 'react-icons/md'

export default function ButtonCopy({
  textToCopy,
  disabled,
}: {
  textToCopy: string
  disabled?: boolean
}) {
  const { t } = useTranslation(nsCommon)
  const [copiedText, copy] = useCopyToClipboard()
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
    <TooltipTrigger delay={200}>
      <Button
        className="btn btn-square btn-sm"
        isDisabled={disabled}
        onPress={() => {
          copy(textToCopy)
          delayResetCopy()
        }}
      >
        <label className="swap">
          <input type="checkbox" checked={!!copiedText} readOnly />
          <MdCheck className="icon-md swap-on" />
          <MdCopyAll className="icon-md swap-off" />
        </label>
      </Button>
      <Tooltip
        className="bg-base-200 shadow-lg mt-1 py-1 px-3 rounded"
        placement="bottom"
      >
        {copiedText ? t('copied') : t('copy')}
      </Tooltip>
    </TooltipTrigger>
  )
}
