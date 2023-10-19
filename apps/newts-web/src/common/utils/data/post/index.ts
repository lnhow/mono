import { PostEntity } from '../../../../data/graphql/_generated/types'

export const getCategoryFromPost = (post: PostEntity) => {
  return post.attributes?.category?.data
}

export const getPostCoverUrl = (post: PostEntity) => {
  if (!post.attributes?.cover?.data?.attributes?.url) {
    return ''
  }
  // return (process.env.NEXT_PUBLIC_MAIN_API || '' ) + post.attributes?.cover?.data?.attributes?.url
  return post.attributes?.cover?.data?.attributes?.url || ''
}
