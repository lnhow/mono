import { mapPostToNwPost } from '@/data/mapping/post'
import { getFeaturedPosts } from './actions'
import { PostEntity } from '@/data/graphql/_generated/types'

import NwFeaturedPosts from '@newts/ui/components/pages/index/FeaturedPosts'

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts()
  const mappedPost = posts.posts?.data.map((post) => mapPostToNwPost(post as unknown as PostEntity)) || []

  return <NwFeaturedPosts data={mappedPost} />
}
