import { mapPostEntityToNwPost } from '@/data/mapping/post'
import { getFeaturedPosts } from './api'
import { PostEntity } from '@/data/graphql/_generated/types'

import NwFeaturedPosts from '@newts/ui/components/pages/index/FeaturedPosts'

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts()
  const mappedPost = posts.posts?.data.map((post) => mapPostEntityToNwPost(post as unknown as PostEntity)) || []

  return <NwFeaturedPosts data={mappedPost} />
}
