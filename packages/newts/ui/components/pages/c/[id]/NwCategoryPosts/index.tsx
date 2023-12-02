import NwPostsWithPagination, {
  NwPostsWithPaginationProps,
} from '@newts/ui/components/common/NwPost/NwPostList/WithPagination'
import NwEmptyList from '@newts/ui/components/common/NwPost/NwPostList/Empty'

export default function NwCategoryPosts({
  data,
  pagination,
}: NwPostsWithPaginationProps) {
  if (data.length < 1) {
    return <NwEmptyList />
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">{`${pagination.total} ${
          pagination.total > 1 ? 'results' : 'result'
        }`}</h1>
      </div>
      <NwPostsWithPagination data={data} pagination={pagination} />
    </>
  )
}
