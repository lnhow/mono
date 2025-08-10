'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import {
  DEFAULT_BACKGROUND,
  DEFAULT_FOREGROUND,
  FormContrastChecker,
} from './const'
import { BackgroundPreview } from './preview'
import { ColorInput } from './input'
import { useEffect } from 'react'
import { parseColor } from '@hsp/ui/src/components/app/input/color-picker'

export default function PageContrastChecker() {
  const searchParams = useSearchParams()

  const { ...methods } = useForm<FormContrastChecker>({
    defaultValues: {
      foreground: DEFAULT_FOREGROUND,
      background: DEFAULT_BACKGROUND,
      bigText: searchParams.get('bt') || 'This is how big text looks like',
      smallText: searchParams.get('st') || 'This is how small text looks like',
    },
  })

  useEffect(() => {
    try {
      const background = searchParams.get('bg')
      if (background) {
        methods.setValue('background', parseColor(background))
      }
      const foreground = searchParams.get('fg')
      if (foreground) {
        methods.setValue('foreground', parseColor(foreground))
      }
    } catch (error) {
      console.error('Error parsing default search params:', error)
    }
  }, [methods, searchParams])

  return (
    <FormProvider {...methods}>
      <BackgroundPreview className="py-8 px-4 md:py-16 md:rounded-2xl"></BackgroundPreview>
      <ColorInput />
    </FormProvider>
  )
}
