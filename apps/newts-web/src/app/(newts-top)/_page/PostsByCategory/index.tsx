import { Suspense } from 'react'

import { mapPostToNwPost } from '@/data/mapping/post'
import { getFeatureCategoryDataBySlug } from '../actions'
import { PostEntity } from '@/data/graphql/_generated/types'
import NwPostsByCategory from '@newts/ui/components/pages/index/PostsByCategory'
import NwPostsByCategorySkeleton from '@newts/ui/components/pages/index/PostsByCategory/skeleton'
import { mapCategoryToNwCategory } from '@/data/mapping/category'

export interface PostsByCategoryProps {
  category: string
}

export default function PostsByCategory({ category }: PostsByCategoryProps) {
  return (
    <Suspense fallback={<NwPostsByCategorySkeleton />}>
      <PostsByCategoryAsync category={category} />
    </Suspense>
  )
}

export async function PostsByCategoryAsync({ category }: PostsByCategoryProps) {
  const [postsData, categoryData] = await getFeatureCategoryDataBySlug(category)

  const mappedPost =
    postsData.data.posts?.data.map((post) =>
      mapPostToNwPost(post as unknown as PostEntity)
    ) || []
  const mappedCategory = mapCategoryToNwCategory(
    categoryData.data.categories?.data[0] || {}
  )

  if (mappedPost.length < 1 || !mappedCategory.id) {
    return <></>
  }

  return <NwPostsByCategory data={mappedPost} categoryData={mappedCategory} />
}
