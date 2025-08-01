'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { FormContrastChecker } from './const'
import { BackgroundPreview } from './preview'
import { ColorInput } from './input'
import { useEffect } from 'react'
import { parseColor } from '@hsp/ui/src/components/app/input/color-picker'

const DEFAULT_FOREGROUND = parseColor('#000000')
const DEFAULT_BACKGROUND = parseColor('#FFFFFF')

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
    const background = searchParams.get('bg')
    if (background) {
      methods.setValue('background', parseColor(background))
    }
    const foreground = searchParams.get('fg')
    if (foreground) {
      methods.setValue('foreground', parseColor(foreground))
    }
  }, [methods, searchParams])

  return (
    <FormProvider {...methods}>
      <BackgroundPreview className="py-8 px-4 md:py-16 md:rounded-2xl"></BackgroundPreview>
      <ColorInput />
    </FormProvider>
  )
}
