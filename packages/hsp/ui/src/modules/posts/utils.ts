import isProductionEnv from '@hsp/ui/src/utils/nextjs/isProduction'

export type HsPost = {
  slug: string
  title: string
  description: string
  tags: string[]
  readingTimeMinutes: number
  createdAt: Date
  updatedAt?: Date
  draft?: boolean
}

export const PostUtils = {
  getTransitionName: (slug: HsPost['slug']) => {
    return {
      card: `post-${slug}`,
      title: `post-title-${slug}`,
      description: `post-description-${slug}`,
      // img: `post-img-${slug}`,
    }
  },
  slugToUrl: (slug: HsPost['slug']) => {
    return `/posts/${slug}`
  },
  shouldShow: (isDraft: HsPost['draft']) => {
    if (isProductionEnv && isDraft) {
      return false
    }
    return true
  },
}
