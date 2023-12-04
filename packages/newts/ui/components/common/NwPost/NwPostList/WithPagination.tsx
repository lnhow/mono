import { NwPostGroupProps } from '@newts/ui/types/components/posts.type'
import SideCategoryPost from '@newts/ui/components/pages/index/PostsByCategory/components/SideCategoryPost'
import { TNwPagination } from '../../NwPagination/type'
import NwPagination from '../../NwPagination'
import PropsWithClassName from '@newts/ui/types/components/common.type'
import classNames from '@newts/ui/utils/classNames'

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
              <SideCategoryPost data={post} />
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
