import { Metadata } from 'next'
import NextPageProps from '@newts/ui/types/common/pageProps'
import SideCategoryPost from '@newts/ui/components/pages/index/PostsByCategory/components/SideCategoryPost'
import { TNwPagination } from '@newts/ui/components/common/NwPagination/type'
import NwPagination from '@newts/ui/components/common/NwPagination'
import NwSearchBox from '@newts/ui/components/pages/search/NwSearchBox'
import { sanitizeSearchParam } from '@newts/ui/utils/queryParams'

import { mapPostToNwPost } from '@/data/mapping/post'
import { PostEntity } from '@/data/graphql/_generated/types'

import { fetchSearchPost } from './_actions/fetch'
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
  const mappedPosts =
    postsData.posts?.data.map((post) =>
      mapPostToNwPost(post as unknown as PostEntity)
    ) || []
  const pagination = postsData.posts?.meta?.pagination || defaultPagination

  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <NwSearchBox data={paramsData} onSearch={handleSearch} />
      <div className="min-h-[50vh] mt-4">
        {mappedPosts.map((post) => {
          return (
            <div key={post.id} className="mt-6">
              <SideCategoryPost data={post} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center">
        <NwPagination pagination={pagination} />
      </div>
    </div>
  )
}

const defaultPagination = {
  page: 1,
  pageCount: 0,
  total: 0,
  pageSize: 0,
} as TNwPagination
