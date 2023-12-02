import { Metadata } from 'next'
import NextPageProps from '@newts/ui/types/common/pageProps'
import NwCategoryPosts from '@newts/ui/components/pages/c/[slug]/NwCategoryPosts'
import { defaultPagination } from '@newts/ui/components/common/NwPagination/type'

import { sanitizeSearchParam } from '@newts/ui/utils/queryParams'

import { mapPostsToNwPosts } from '@/data/mapping/post'
import { PostEntity } from '@/data/graphql/_generated/types'
import { fetchSearchPost } from '@/data/actions/posts/search'

import { ESearchParam } from '@newts/ui/types/common/searchParams'

export const generateMetadata = (): Metadata => {
  const title = 'Category | Newts'
  return {
    title,
    description: `${title}`,
  }
}

export type PageCategoryProps = NextPageProps<{ slug: string }>

export default async function PageCategory({ params, searchParams }: PageCategoryProps) {
  const page =
    parseInt(sanitizeSearchParam(searchParams[ESearchParam.Page])) || 1

  const postsData = await fetchSearchPost({ category: params?.slug || '' }, page)
  const mappedPosts = mapPostsToNwPosts(postsData.posts?.data as unknown as PostEntity[] || [])
  const pagination = postsData.posts?.meta?.pagination || defaultPagination

  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <section>
        <NwCategoryPosts data={mappedPosts} pagination={pagination} />
      </section>
    </div>
  )
}
