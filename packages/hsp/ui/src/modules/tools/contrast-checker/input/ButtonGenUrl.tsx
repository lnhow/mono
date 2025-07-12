import { memo, useEffect, useState } from 'react'
// import { Button, TooltipTrigger, Tooltip } from 'react-aria-components'
import { useFormContext } from 'react-hook-form'
import {
  FormContrastChecker,
  // ValidationRules,
} from '../const'
import { Button } from '@hsp/ui/src/components/base/button'
import Tooltip from '@hsp/ui/src/components/base/tooltip'

const ButtonGenLinkContrast = memo(function ButtonGenLinkContrast() {
  const { getValues } = useFormContext<FormContrastChecker>()
  const [isCopied, setIsCopied] = useState(false)
  const copyURL = () => {
    const values = {
      fg: getValues('foreground'),
      bg: getValues('background'),
      // TODO: Add correct input into texts
      // bt: getValues('bigText').slice(0, ValidationRules.bigText.max),
      // st: getValues('smallText').slice(0, ValidationRules.bigText.max),
    }
    navigator.clipboard.writeText(
      window.location.host +
        '/tools/contrast-checker?' +
        Object.keys(values)
          .map((key) => {
            return key + '=' + encodeURIComponent(values[key as 'fg' | 'bg'])
          })
          .join('&'),
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
    <Tooltip label={'Generate Permalink'}>
      <Button className="btn btn-link w-full" onClick={copyURL}>
        {isCopied ? 'Copied' : 'Permalink'}
      </Button>
    </Tooltip>
  )
})

export default ButtonGenLinkContrast
