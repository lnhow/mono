import { Suspense } from 'react'
import LoadingLayoutTools from '@hsp/ui/modules/tools/layout/loading'
import { Metadata } from 'next'
import BasePageContrastChecker from '@hsp/ui/src/modules/tools/contrast-checker/index'
import NoSsr from '@hsp/ui/components/utils/NoSsr'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Color Contrast Checker',
  }
}

export default function PageContrastChecker() {
  return <>
    <Suspense fallback={<LoadingLayoutTools />}>
      <NoSsr>
        <BasePageContrastChecker />
      </NoSsr>
    </Suspense>
  </>
}
