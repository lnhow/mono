import { Metadata } from 'next'
import NextPageProps from '@newts/ui/types/common/pageProps'
import NwSearchBox from '@newts/ui/components/pages/search/NwSearchBox'
import NwSearchList from '@newts/ui/components/pages/search/NwSearchList'
import { defaultPagination } from '@newts/ui/components/common/NwPagination/type'

import { sanitizeSearchParam } from '@newts/ui/utils/queryParams'

import { mapPostsToNwPosts } from '@/data/mapping/post'
import { PostEntity } from '@/data/graphql/_generated/types'
import { fetchSearchPost } from '@/data/actions/posts/search'

import { ESearchParam } from './_actions/types'
import handleSearch from './_actions/search'

export const generateMetadata = ({ searchParams }: NextPageProps): Metadata => {
  const title =
    (searchParams[ESearchParam.Query]
      ? `Search results for "${searchParams[ESearchParam.Query]}"`
      : 'Search') + ' | Newts'
  return {
    title,
    description: `Search results for ${title}`,
  }
}

export default async function Page({ searchParams }: NextPageProps) {
  const page =
  parseInt(sanitizeSearchParam(searchParams[ESearchParam.Page])) || 1
  const paramsData = {
    query: sanitizeSearchParam(searchParams[ESearchParam.Query]) || undefined,
    category:
      sanitizeSearchParam(searchParams[ESearchParam.Category]) || undefined,
  }

  const postsData = await fetchSearchPost(paramsData, page)
  const mappedPosts = mapPostsToNwPosts(postsData.posts?.data as unknown as PostEntity[] || [])
  const pagination = postsData.posts?.meta?.pagination || defaultPagination

  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <section className="mb-4">
        <NwSearchBox data={paramsData} onSearch={handleSearch} />
      </section>
      <hr className="mt-8 mb-2 divider divider-neutral" />
      <section>
        <NwSearchList data={mappedPosts} pagination={pagination} />
      </section>
    </div>
  )
}
