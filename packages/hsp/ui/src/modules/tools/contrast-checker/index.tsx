'use client'

import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { THEME } from '@hsp/ui/constants/theme'
import { FormContrastChecker } from './const'
import { BackgroundPreview } from './preview'
import { ColorInput } from './input'
import { useEffect } from 'react'
import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'

export default function PageContrastChecker() {
  const searchParams = useSearchParams()
  const theme = useTheme()

  const { ...methods } = useForm<FormContrastChecker>({
    defaultValues: {
      foreground: theme.resolvedTheme === THEME.DARK ? '#FFFFFF' : '#000000',
      background: theme.resolvedTheme === THEME.DARK ? '#000000' : '#FFFFFF',
      bigText: searchParams.get('bt') || 'This is how big text looks like',
      smallText: searchParams.get('st') || 'This is how small text looks like',
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
    <FormProvider {...methods}>
      <BackgroundPreview className="mx-auto max-w-2xl py-8 md:py-16 md:rounded-2xl none"></BackgroundPreview>
      <ViewTransition update="none">
        <ColorInput />
      </ViewTransition>
    </FormProvider>
  )
}
