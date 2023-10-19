import { Skeleton } from '@mui/material'
import NwPost from '../../../../types/post'
import Image from 'next/image'

export interface NwFeaturedPostsProps {
  data: NwPost[]
}

export default function NwFeaturedPosts({ data }: NwFeaturedPostsProps) {
  if (!data || data.length < 1) {
    return <></>
  }
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <TopPost data={data[0]} />
      <div className="flex flex-col gap-4">
        <Skeleton component={'div'} variant="rectangular" className="h-48" />
        <Skeleton variant="rectangular" className="h-48" />
      </div>
    </section>
  )
}

function TopPost({ data }: { data: NwPost }) {
  return (
    <div className="lg:col-span-2 md:h-[400px]">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-2/3 shrink-0">
          <Image
            src={data.attributes.cover?.attributes.url || '#'}
            alt={data.attributes.title || ''}
            width={480}
            height={360}
            className="rounded-md h-[360px] w-full object-cover aspect-4/3"
          />
        </div>
        <div className='min-w-0'>
          <div className="
            py-4 md:px-4 md:mt-6 md:-ml-20 rounded-md
            md:bg-bgprimary-300/75 md:dark:bg-bgprimary-800/75
          ">
            <h1 className="text-3xl font-extralight">
              {data.attributes.title}
            </h1>
          </div>
          <div className="py-2">
            <p className="text-lg text-ellipsis break-words overflow-hidden">
              {data.attributes.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
