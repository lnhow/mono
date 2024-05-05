import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getTranslation } from '@i18n/server'

import { nsPageHome } from '@hsp/ui/modules/home/const'
import { SHORTS } from '@hsp/ui/modules/shorts//shorts'
import NwShortBase from '@hsp/ui/modules/shorts/components/NwShortBase'

const ToolsMenu = dynamic(
  () => import('@hsp/ui/modules/tools/layout/ToolsMenu'),
  { ssr: false }
)

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation(nsPageHome)
  return {
    title: t('title'),
  }
}

export default async function Page() {
  const { t } = await getTranslation(nsPageHome)

  return (
    <div className="w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-center gap-8">
      <div className="flex-1">
        <div className="mb-4">
          <h1 className="text-2xl text-extralight">{t('shorts-title')}</h1>
          <p className="text-sm text-light">{t('shorts-desc')}</p>
        </div>
        <div className="flex flex-wrap gap-8">
          {SHORTS.map((short, index) => {
            return (
              <NwShortBase
                key={index}
                data={short}
                styles={{
                  wrapper: 'flex-1 min-w-[300px]',
                }}
              />
            )
          })}
        </div>
      </div>
      <div className="bg-base-200 rounded-lg h-fit lg:max-w-sm w-full">
        <div className="mb-2 pt-4 px-2 text-center">
          <h2 className="text-lg text-extralight">{t('tools-title')}</h2>
          <span className="text-xs text-light">{t('tools-desc')}</span>
        </div>
        <Suspense fallback={<div className="skeleton w-full h-80" />}>
          <div className="menu">
            <ToolsMenu />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
