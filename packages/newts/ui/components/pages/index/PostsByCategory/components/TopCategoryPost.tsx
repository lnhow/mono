import Link from 'next/link'
import { NwPostProps } from '@newts/ui/types/components/posts.type'
import NwPostImage from '@newts/ui/components/common/NwPostImage'

export default function TopCategoryPost({ data }: NwPostProps) {
  const hrefUrl = data.attributes.slugUrl
    ? `/p/${data.attributes.slugUrl}`
    : '#'
  const title = data.attributes.title || ''

  return (
    <div className="lg:col-span-2 relative">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/2 shrink-0">
          <Link href={hrefUrl} title={title}>
            <NwPostImage
              priority
              loading="eager"
              src={data.attributes.cover?.attributes.url || ''}
              alt={title}
              roundedSize="rounded-xl"
            />
          </Link>
        </div>
        <div className="min-w-0 z-10 absolute w-2/3 md:w-1/2 right-2 top-1/4 flex flex-col items-end">
          <div
            className="p-2 rounded-lg
            bg-bgprimary-100/95 dark:bg-bgprimary-900/95
          "
          >
            <Link href={hrefUrl} title={title}>
              <h1 className="text-md md:text-xl font-extralight line-clamp-2">
                {data.attributes.title}
              </h1>
            </Link>
          </div>
          <div className="w-[75%] mt-1 p-1 rounded-md bg-bgprimary-900/90 dark:bg-bgprimary-100/90">
            <p className="text-xs font-light text-ellipsis line-clamp-3 text-white dark:text-black">
              {data.attributes.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
