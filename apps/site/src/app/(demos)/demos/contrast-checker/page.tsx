import { Metadata } from 'next'
import BasePageContrastChecker from '@hsp/ui/modules/tools/contrast-checker/index'
import ViewTransition from '@hsp/ui/utils/react/view-transition'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Color Contrast Checker',
}
export default async function PageContrastChecker() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <ViewTransition name="contrast-checker-title">
        <h1 className="text-2xl sm:text-3xl text-center font-medium mb-6 text-zinc-100">
          Contrast Checker
        </h1>
      </ViewTransition>
      <ViewTransition name="contrast-checker-card" update="none">
        <Suspense>
          <BasePageContrastChecker />
        </Suspense>
      </ViewTransition>
    </div>
  )
}
