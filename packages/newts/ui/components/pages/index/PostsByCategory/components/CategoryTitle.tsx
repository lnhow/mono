import { NwCategoryGroupProps } from '@newts/ui/types/components/category.type'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function CategoryTitle({
  data,
  children,
}: PropsWithChildren<NwCategoryGroupProps>) {
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
          Xem thêm <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>
      {children}
    </section>
  )
}
