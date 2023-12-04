import NwPostsWithPagination, {
  NwPostsWithPaginationProps,
} from '@newts/ui/components/common/NwPost/NwPostList/WithPagination'
import NwEmptyList from '@newts/ui/components/common/NwPost/NwPostList/Empty'

export default function NwCategoryPosts({
  data,
  pagination,
}: NwPostsWithPaginationProps) {
  if (data.length < 1) {
    return <NwEmptyList title="There are no posts yet" className='mt-12' />
  }
  return (
    <>
      <NwPostsWithPagination data={data} pagination={pagination} />
    </>
  )
}
