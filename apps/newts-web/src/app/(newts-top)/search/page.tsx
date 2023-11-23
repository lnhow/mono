import { mapPostToNwPost } from '@/data/mapping/post'
import NextPageProps from '@newts/ui/types/common/pageProps'
import { fetchSearchPost } from './_actions'
import { PostEntity } from '@/data/graphql/_generated/types'
import SideCategoryPost from '@newts/ui/components/pages/index/PostsByCategory/components/SideCategoryPost'
import NwPagination from '@newts/ui/components/common/NwPagination'
import { TNwPagination } from '@newts/ui/components/common/NwPagination/type'

export default async function Page({ searchParams }: NextPageProps) {
  const page =
    parseInt(
      Array.isArray(searchParams['page'])
        ? searchParams['page'][0]
        : searchParams['page']
    ) || 1
  const postsData = await fetchSearchPost(
    {
      searchTerms: searchParams['q'] || undefined,
      categorySlug: searchParams['c'] || undefined,
    },
    page
  )

  const mappedPosts =
    postsData.posts?.data.map((post) =>
      mapPostToNwPost(post as unknown as PostEntity)
    ) || []
  const pagination =
    postsData.posts?.meta?.pagination ||
    ({
      page: 1,
      pageCount: 0,
      total: 0,
      pageSize: 0,
    } as TNwPagination)

  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <div className="min-h-[50vh]">
        {mappedPosts.map((post) => {
          return <SideCategoryPost key={post.id} data={post} />
        })}
      </div>
      <div className="flex justify-center">
        <NwPagination pagination={pagination} />
      </div>
    </div>
  )
}
