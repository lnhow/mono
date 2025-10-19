import { NwPostGroupProps } from '@hsp/ui/../v1/types/components/posts.type'
import { WithClassName } from '@hsp/ui/utils/react/types'
import cn from '@hsp/ui/utils/cn'

import NwPostBase from '../NwPostBase'
import { TNwPagination } from '../../NwPagination/type'
import NwPagination from '../../NwPagination'

export type NwPostsWithPaginationProps = NwPostGroupProps & {
  pagination: TNwPagination
}

export default function NwPostsWithPagination({
  data,
  pagination,
  className
}: WithClassName & NwPostsWithPaginationProps) {
  return (
    <>
      <div className={cn('min-h-[50vh] mt-6', className)}>
        {data.map((post) => {
          return (
            <div key={post.id} className="mb-6">
              <NwPostBase data={post} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center mt-8">
        <NwPagination pagination={pagination} />
      </div>
    </>
  )
}
