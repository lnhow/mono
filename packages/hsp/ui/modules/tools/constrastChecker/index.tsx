'use client'

import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { THEME } from '@hsp/ui/constants/theme'
import { useTranslation } from '@i18n/client'
import { nsToolsConstrast } from './const'
import { PropsWithChildren, memo } from 'react'

type FormConstrastChecker = {
  foreground: string,
  background: string,
  bigText: string,
  smallText: string,
}

export default function PageConstrastChecker() {
  const { t } = useTranslation(nsToolsConstrast)
  const searchParams = useSearchParams()
  const theme = useTheme()
  const { ...methods } = useForm<FormConstrastChecker>({
    defaultValues: {
      foreground: searchParams.get('fg') || theme.resolvedTheme === THEME.DARK ? '#FFFFFF' : '#000000',
      background: searchParams.get('bg') || theme.resolvedTheme === THEME.DARK ? '#000000' : '#FFFFFF',
      bigText: searchParams.get('bt') || t('big-text-placeholder'),
      smallText: searchParams.get('st') || t('small-text-placeholder'),
    }
  })
  return (
    <div className='h-full'>
      <FormProvider {...methods}>
        <BackgroundPreview>
          <div>as;ljdhflkajsdhlfkj</div>
        </BackgroundPreview>
      </FormProvider>
    </div>
  )
}

const BackgroundPreview = memo(function BackgroundPreview({ children } : PropsWithChildren) {
  const background = useWatch({ name: 'background' })

  return <div style={{ background }} className='h-full rounded-xl lg:rounded-none'>
    {children}
  </div>
})
