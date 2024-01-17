import { NwPostGroupProps } from '@newts/ui/types/components/posts.type'
import PropsWithClassName from '@newts/ui/types/components/common.type'
import classNames from '@newts/ui/utils/classNames'

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
}: PropsWithClassName<NwPostsWithPaginationProps>) {
  return (
    <>
      <div className={classNames('min-h-[50vh] mt-6', className)}>
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
