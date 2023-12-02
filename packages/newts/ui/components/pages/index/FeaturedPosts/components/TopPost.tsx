import NwPostImage from '../../../../common/NwPost/NwPostImage'
import { NwPostProps } from '@newts/ui/types/components/posts.type'
import Link from 'next/link'

export default function TopPost({ data }: NwPostProps) {
  const hrefUrl = data.attributes.slugUrl ? `/p/${data.attributes.slugUrl}` : '#'
  const title = data.attributes.title || ''
  return (
    <div className="lg:col-span-2 relative">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-2/3 shrink-0">
          <Link href={hrefUrl} title={title}>
            <NwPostImage
              priority
              loading='eager'
              src={data.attributes.cover?.attributes.url || ''}
              alt={title}
              roundedSize='rounded-xl'
            />
          </Link>
        </div>
        <div 
          className='min-w-0 z-10 absolute w-2/3 md:w-1/2 right-2 top-1/4 flex flex-col items-end'
        >
          <div 
          // className="
          //   py-4 md:px-4 md:mt-6 md:-ml-20 rounded-md
          //   md:bg-bgprimary-300/75 md:dark:bg-bgprimary-800/75"
            className="p-3 md:p-4 rounded-lg
            bg-bgprimary-100/95 dark:bg-bgprimary-900/95
          ">
            <Link href={hrefUrl} title={title}>
              <h1 className="text-xl md:text-3xl font-extralight line-clamp-2">
                {data.attributes.title}
              </h1>
            </Link>
          </div>
          <div className="w-[75%] mt-1 p-2 rounded-md bg-bgprimary-900/90 dark:bg-bgprimary-100/90">
            <p className="text-xs md:text-sm font-light text-ellipsis line-clamp-3 text-white dark:text-black">
              {data.attributes.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
