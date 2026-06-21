import { allPosts } from 'content-collections'
import type { MetadataRoute } from 'next'

import { getVisiblePosts } from '@/lib/posts'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.origin, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.origin}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...getVisiblePosts(allPosts).map((post) => ({
      url: `${site.origin}${post.url}`,
      lastModified: post.updatedAt ?? post.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
