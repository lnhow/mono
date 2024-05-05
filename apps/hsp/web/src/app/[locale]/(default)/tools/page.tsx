import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getTranslation } from '@i18n/server'

import { nsPageToolsIndex } from '@hsp/ui/modules/tools/const'

const ToolsMenu = dynamic(
  () => import('@hsp/ui/modules/tools/layout/ToolsMenu'),
  { ssr: false }
)

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation(nsPageToolsIndex)
  return {
    title: t('title'),
  }
}

export default async function Page() {
  const { t } = await getTranslation(nsPageToolsIndex)
  return (
    <div className="w-full my-auto max-w-screen-2xl mx-auto flex flex-col items-center justify-center gap-8">
      <div className="mb-2 pt-4 px-2 text-center">
        <h1 className="text-xl text-extralight">{t('tools-title')}</h1>
        <span className="text-xs text-light">{t('tools-desc')}</span>
      </div>
      <Suspense fallback={<div className="skeleton h-80 w-full lg:w-lg" />}>
        <div className="menu max-w-lg">
          <ToolsMenu />
        </div>
      </Suspense>
    </div>
  )
}
