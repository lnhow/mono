import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import NextPageProps from '@newts/ui/types/common/pageProps'
import NwCategoryPosts from '@newts/ui/components/pages/c/[slug]/NwCategoryPosts'
import NwCategoryHeader from '@newts/ui/components/pages/c/[slug]/NwCategoryPosts/CategoryHeader'
import { defaultPagination } from '@newts/ui/components/common/NwPagination/type'
import { sanitizeSearchParam } from '@newts/ui/utils/queryParams'
import { ESearchParam } from '@newts/ui/types/common/searchParams'
import { PAGE_REVALIDATE } from '@newts/ui/constants/staleTime'

import { mapPostsToNwPosts } from '@/data/mapping/post'
import { PostEntity } from '@/data/graphql/_generated/types'
import { mapCategoryToNwCategory } from '@/data/mapping/category'


import { fetchCategoryAndPosts } from './actions'

export const generateMetadata = (): Metadata => {
  const title = 'Category | Newts'
  return {
    title,
    description: `${title}`,
  }
}

export type PageCategoryProps = NextPageProps<{ slug: string }>

export const revalidate = PAGE_REVALIDATE.DEFAULT

export default async function PageCategory({
  params,
  searchParams,
}: PageCategoryProps) {
  const page =
    parseInt(sanitizeSearchParam(searchParams[ESearchParam.Page])) || 1
  const category = params?.slug || ''

  if (!category) {
    notFound()
  }

  const [{ data: postsData }, { data: categoryData }] =
    await fetchCategoryAndPosts(category, page)
  const mappedPosts = mapPostsToNwPosts(
    (postsData.posts?.data as unknown as PostEntity[]) || []
  )
  const mappedCategory = mapCategoryToNwCategory(
    categoryData.categories?.data[0] || {}
  )

  if (!mappedCategory.id) {
    notFound()
  }

  const pagination = postsData.posts?.meta?.pagination || defaultPagination

  return (
    <div className="max-w-screen-lg mx-auto w-full">
      <NwCategoryHeader data={mappedCategory} />
      <section>
        <NwCategoryPosts data={mappedPosts} pagination={pagination} />
      </section>
    </div>
  )
}
