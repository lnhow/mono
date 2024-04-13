import nextDynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingLayoutTools from '@hsp/ui/modules/tools/layout/loading'
import { Metadata } from 'next'
import { getTranslation } from '@i18n/server'
import { nsToolsContrast } from '@hsp/ui/modules/tools/contrastChecker/const'
const BasePageContrastChecker = nextDynamic(() => import('@hsp/ui/modules/tools/contrastChecker/index'), { ssr: false })

export const dynamic = 'force-static'

export async function generateMetadata(): Metadata {
  const { t } = await getTranslation(nsToolsContrast)
  return {
    title: t('contrast-checker')
  }
}

export default function PageContrastChecker() {
  return <>
    <Suspense fallback={<LoadingLayoutTools />}>
      <BasePageContrastChecker />
    </Suspense>
  </>
}