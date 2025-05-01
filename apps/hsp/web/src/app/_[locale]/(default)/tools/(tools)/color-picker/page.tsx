import { Suspense } from 'react'
import LoadingLayoutTools from '@hsp/ui/modules/tools/layout/loading'
import { Metadata } from 'next'
import { getTranslation } from '@i18n/server'
import { nsToolColorPicker } from '@hsp/ui/modules/tools/colorPicker/const'
import BasePage from '@hsp/ui/modules/tools/colorPicker/index'
import NoSsr from '@hsp/ui/components/utils/NoSsr'

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
        <NoSsr>
          <BasePage />
        </NoSsr>
      </Suspense>
    </div>
  )
}
