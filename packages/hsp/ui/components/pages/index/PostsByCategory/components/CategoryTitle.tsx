import { getTranslation } from '@i18n/server'
import { NwCategoryProps } from '@hsp/ui/types/components/category.type'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { MdOutlineChevronRight } from 'react-icons/md'
import { nsCommon } from '@hsp/ui/components/common/types'

export default async function CategoryTitle({
  data,
  children,
}: PropsWithChildren<NwCategoryProps>) {
  const { t } = await getTranslation(nsCommon)
  const linkUrl = data.attributes.slugUrl
    ? `/c/${data.attributes.slugUrl}`
    : '#'

  return (
    <section>
      <div className="mb-2 mx-4 lg:mx-2 flex justify-between items-center">
        <Link href={linkUrl} title={data.attributes.title || ''}>
          <h1 className="text-lg font-extralight">{data.attributes.title}</h1>
        </Link>
        <Link
          href={linkUrl}
          className="flex items-center text-xs font-light"
          title={data.attributes.title || ''}
        >
          {t('see-more')} <MdOutlineChevronRight />
        </Link>
      </div>
      {children}
    </section>
  )
}
