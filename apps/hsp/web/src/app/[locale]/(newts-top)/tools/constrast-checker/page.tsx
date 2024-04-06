import { default as BasePageConstrastChecker } from '@hsp/ui/modules/tools/constrastChecker'
import { Suspense } from 'react'

export default function PageConstrastChecker() {
  return <>
    <Suspense>
      <BasePageConstrastChecker />
    </Suspense>
  </>
}