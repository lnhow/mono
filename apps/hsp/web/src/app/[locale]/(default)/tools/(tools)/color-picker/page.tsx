import nextDynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingLayoutTools from '@hsp/ui/modules/tools/layout/loading'
import { Metadata } from 'next'
import { getTranslation } from '@i18n/server'
import { nsToolColorPicker } from '@hsp/ui/modules/tools/colorPicker/const'
const BasePage = nextDynamic(
  () => import('@hsp/ui/modules/tools/colorPicker/index'),
  { ssr: false }
)

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation(nsToolColorPicker)
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function Page() {
  return (
    <div className="p-4">
      <Suspense fallback={<LoadingLayoutTools />}>
        <BasePage />
      </Suspense>
    </div>
  )
}
