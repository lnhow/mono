import { Suspense } from 'react'

import { mapPostEntityToNwPost } from '@/data/mapping/post'
import { getPostsByCategory } from './api'
import { PostEntity } from '@/data/graphql/_generated/types'
import NwPostsByCategory from '@newts/ui/components/pages/index/PostsByCategory'
import NwPostsByCategorySkeleton from '@newts/ui/components/pages/index/PostsByCategory/skeleton'

export interface PostsByCategoryProps {
  category: string
}

export default async function PostsByCategory({
  category,
}: PostsByCategoryProps) {
  return (
    <Suspense fallback={<NwPostsByCategorySkeleton />}>
      <PostsByCategorySC category={category} />
    </Suspense>
  )
}

export async function PostsByCategorySC({ category }: PostsByCategoryProps) {
  const posts = await getPostsByCategory(category)
  const mappedPost =
    posts.posts?.data.map((post) =>
      mapPostEntityToNwPost(post as unknown as PostEntity)
    ) || []

  return <NwPostsByCategory data={mappedPost} />
}
