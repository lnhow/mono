'use client'

import { useSearchParams } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { FormContrastChecker } from './const'
import { BackgroundPreview } from './preview'
import { ColorInput } from './input'
import { useEffect } from 'react'

export default function PageContrastChecker() {
  const searchParams = useSearchParams()

  const { ...methods } = useForm<FormContrastChecker>({
    defaultValues: {
      foreground: '#000000',
      background: '#FFFFFF',
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
      <BackgroundPreview className="py-8 px-4 md:py-16 md:rounded-2xl"></BackgroundPreview>
      <ColorInput />
    </FormProvider>
  )
}
