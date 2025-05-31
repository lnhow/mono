import { Suspense } from 'react'
import LoadingLayoutTools from '@hsp/ui/modules/tools/layout/loading'
import { Metadata } from 'next'
import { getTranslation } from '@i18n/server'
import { nsToolsContrast } from '@hsp/ui/modules/tools/contrastChecker/const'
import BasePageContrastChecker from '@hsp/ui/modules/tools/contrastChecker/index'
import NoSsr from '@hsp/ui/components/utils/NoSsr'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation(nsToolsContrast)
  return {
    title: t('contrast-checker')
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