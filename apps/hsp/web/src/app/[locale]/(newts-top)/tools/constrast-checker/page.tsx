import nextDynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingLayoutTools from '@hsp/ui/modules/tools/layout/loading'
const BasePageConstrastChecker = nextDynamic(() => import('@hsp/ui/modules/tools/constrastChecker/index'), { ssr: false })

export const dynamic = 'force-static'

export default function PageConstrastChecker() {
  return <>
    <Suspense fallback={<LoadingLayoutTools />}>
      <BasePageConstrastChecker />
    </Suspense>
  </>
}