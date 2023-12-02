import { NwPostGroupProps } from '@newts/ui/types/components/posts.type'
import SideCategoryPost from '@newts/ui/components/pages/index/PostsByCategory/components/SideCategoryPost'
import { TNwPagination } from '../../NwPagination/type'
import NwPagination from '../../NwPagination'

export type NwPostsWithPaginationProps = NwPostGroupProps & {
  pagination: TNwPagination
}

export default function NwPostsWithPagination({
  data,
  pagination,
}: NwPostsWithPaginationProps) {
  return (
    <>
      <div className="min-h-[50vh]">
        {data.map((post) => {
          return (
            <div key={post.id} className="mt-6">
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
