import { PostEntity } from '@/data/graphql/_generated/types'
import NwCategory from '@newts/ui/types/category'
import NwPost from '@newts/ui/types/post'

export const mapPostToNwPost = (post: PostEntity): NwPost => {
  const attributes = post.attributes
  const category = attributes?.category?.data
  const cover = attributes?.cover?.data
  return {
    id: post.id || '',
    attributes: {
      ...(post.attributes),
      category: {
        id: category?.id || '',
        attributes: {
          title: category?.attributes?.title,
          slugUrl: category?.attributes?.slugUrl || undefined,
        },
      } as NwCategory,
      cover: {
        attributes: {
          url: cover?.attributes?.url || undefined,
        },
      },
    },
  }
}

export const mapPostsToNwPosts = (posts: PostEntity[]): NwPost[] => {
  return posts.map(mapPostToNwPost)
}
