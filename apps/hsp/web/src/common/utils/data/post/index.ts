import { PostEntity } from '../../../../data/graphql/_generated/types'

export const getPostCoverUrl = (post: PostEntity) => {
  if (!post.attributes?.cover?.data?.attributes?.url) {
    return ''
  }
  return post.attributes?.cover?.data?.attributes?.url || ''
}
