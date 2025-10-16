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
      stats: `post-stats-${slug}`,
      tag: `post-tag-${slug}`,
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
  formatDate: (date: HsPost['createdAt'] | HsPost['updatedAt']) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date!))
  },
  formatReadingTime: (minutes: HsPost['readingTimeMinutes']) => {
    if (minutes < 1) {
      return 'Less than a min read'
    }
    return `${minutes} min read`
  },
}
