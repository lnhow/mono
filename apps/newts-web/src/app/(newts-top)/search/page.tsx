import { mapPostToNwPost } from '@/data/mapping/post'
import NextPageProps from '@newts/ui/types/common/pageProps'
import { fetchSearchPost } from './actions'
import { PostEntity } from '@/data/graphql/_generated/types'
import SideCategoryPost from '@newts/ui/components/pages/index/PostsByCategory/components/SideCategoryPost'

export default async function Page({ searchParams }: NextPageProps) {
  const page = parseInt(searchParams['page']) || 1
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
  const pagination = postsData.posts?.meta?.pagination

  return (
    <div>
      {mappedPosts.map((post) => {
        return <SideCategoryPost key={post.id} data={post} />
      })}
      <div>
        {pagination?.page} / {pagination?.pageCount}
      </div>
    </div>
  )
}
