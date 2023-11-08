import Link from 'next/link'
import { NwPostProps } from '@newts/ui/types/components/posts.type'
import NwPostImage from '@newts/ui/components/common/NwPostImage'

export default function SideCategoryPost({ data }: NwPostProps) {
  const hrefUrl = data.attributes.slugUrl ? `/p/${data.attributes.slugUrl}` : '#'
  const title = data.attributes.title || ''
  return (
    <div className="flex">
      {data.attributes.cover?.attributes.url && (
        <div
          className="
          shrink-0 w-40 overflow-hidden
        "
        >
          <Link href={hrefUrl} title={title}>
            <NwPostImage
              src={data.attributes.cover?.attributes.url}
              alt={data.attributes.title || ''}
            />
          </Link>
        </div>
      )}
      <div className="ml-2 min-w-0 flex-[2] py-2 pr-2">
        <Link href={hrefUrl} title={title}>
          <h2 className="text-xl font-extralight line-clamp-1 lg:line-clamp-2">
            {data.attributes.title}
          </h2>
        </Link>
        <p className="mt-2 text-sm font-light line-clamp-3 lg:line-clamp-2">
          {data.attributes.description}
        </p>
      </div>
    </div>
  )
}
