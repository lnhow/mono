import { Metadata } from 'next'
import { getTranslation } from '@i18n/server'
import { nsToolURL } from '@hsp/ui/modules/tools/url/const'
import BasePageToolURL from '@hsp/ui/modules/tools/url/index'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslation(nsToolURL)
  return {
    title: t('title'),
  }
}

export default function PageToolURL() {
  return (
    <div className="p-4">
      <BasePageToolURL />
    </div>
  )
}
