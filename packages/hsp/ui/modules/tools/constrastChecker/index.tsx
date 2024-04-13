'use client'

import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { THEME } from '@hsp/ui/constants/theme'
import { useTranslation } from '@i18n/client'
import { FormConstrastChecker, nsToolsConstrast } from './const'
import { BackgroundPreview } from './preview'
import { ColorInput } from './input'
import { useEffect } from 'react'

export default function PageConstrastChecker() {
  const { t } = useTranslation(nsToolsConstrast)
  const searchParams = useSearchParams()
  const theme = useTheme()

  const { ...methods } = useForm<FormConstrastChecker>({
    defaultValues: {
      foreground: theme.resolvedTheme === THEME.DARK ? '#FFFFFF' : '#000000',
      background: theme.resolvedTheme === THEME.DARK ? '#000000' : '#FFFFFF',
      bigText: searchParams.get('bt') || t('big-text-placeholder'),
      smallText: searchParams.get('st') || t('small-text-placeholder'),
    },
  })

  useEffect(() => {
    const background = searchParams.get('bg')
    if (background) {
      methods.setValue('background', background)
    }
    const foreground = searchParams.get('fg')
    if (foreground) {
      methods.setValue('foreground', foreground)
    }
  }, [methods, searchParams])

  return (
    <div className="h-full min-h-[600px]">
      <FormProvider {...methods}>
        <BackgroundPreview>
          <ColorInput />
        </BackgroundPreview>
      </FormProvider>
    </div>
  )
}
