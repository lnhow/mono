import { memo, useEffect, useState } from 'react'
import { Button, TooltipTrigger, Tooltip } from 'react-aria-components'
import { useFormContext } from 'react-hook-form'
import { FormContrastChecker, ValidationRules, nsToolsContrast } from '../const'
import { useTranslation } from '@i18n/client'

const ButtonGenLinkContrast = memo(function ButtonGenLinkContrast() {
  const { t } = useTranslation(nsToolsContrast)
  const { getValues } = useFormContext<FormContrastChecker>()
  const [isCopied, setIsCopied] = useState(false)
  const copyURL = () => {
    const values = {
      fg: getValues('foreground'),
      bg: getValues('background'),
      bt: getValues('bigText').slice(0, ValidationRules.bigText.max),
      st: getValues('smallText').slice(0, ValidationRules.bigText.max),
    }
    navigator.clipboard.writeText(
      window.location.host +
        '/tools/contrast-checker?' +
        Object.keys(values).map((key) => {
          // @ts-ignore
          return key + '=' + encodeURIComponent(values[key])
        }).join('&')
    )
    setIsCopied(true)
  }

  useEffect(() => {
    if (!isCopied) {
      return
    }
    const timeoutId = setTimeout(() => {
      setIsCopied(false)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isCopied])

  return (
    <TooltipTrigger>
      <Button className="btn btn-link w-full" onPress={copyURL}>
        {isCopied ? t('copied') : t('permalink')}
      </Button>
      <Tooltip placement='bottom' className='bg-base-200 shadow-md py-1 px-3 rounded'>{t('permalink')}</Tooltip>
    </TooltipTrigger>
  )
})

export default ButtonGenLinkContrast
