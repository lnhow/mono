import { NwCategoryProps } from '@newts/ui/types/components/category.type'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { MdOutlineChevronRight } from 'react-icons/md'

export default function CategoryTitle({
  data,
  children,
}: PropsWithChildren<NwCategoryProps>) {
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
          See more <MdOutlineChevronRight />
        </Link>
      </div>
      {children}
    </section>
  )
}
