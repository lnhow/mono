import type { NwPostGroupProps } from '@hsp/ui/../v1/types/components/posts.type'
import cn from '@hsp/ui/utils/cn'
import type { WithClassName } from '@hsp/ui/utils/react/types'
import NwPagination from '../../NwPagination'
import type { TNwPagination } from '../../NwPagination/type'
import NwPostBase from '../NwPostBase'

export type NwPostsWithPaginationProps = NwPostGroupProps & {
  pagination: TNwPagination
}

export default function NwPostsWithPagination({
  data,
  pagination,
  className,
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
