'use cache'

import { Metadata } from 'next'
import BasePageContrastChecker from '@hsp/ui/modules/tools/contrast-checker/index'
import ViewTransition from '@hsp/ui/utils/react/view-transition'

export const metadata: Metadata = {
  title: 'Color Contrast Checker',
}
export default async function PageContrastChecker() {
  return (
    <div className="max-w-lg mx-auto">
      <ViewTransition name="contrast-checker-title">
        <h1 className="text-2xl text-center font-medium mb-4">
          Contrast Checker
        </h1>
      </ViewTransition>
      <ViewTransition name="contrast-checker-card" update="none">
        <BasePageContrastChecker />
      </ViewTransition>
    </div>
  )
}
