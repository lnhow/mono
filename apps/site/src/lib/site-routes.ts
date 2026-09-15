import type { MetadataRoute } from 'next'

import { getVisiblePosts, type PostRecord } from './posts'
import { normalizeSiteOrigin } from './site'

export function createSitemap(
  posts: readonly PostRecord[],
  configuredOrigin?: string,
): MetadataRoute.Sitemap {
  const origin = normalizeSiteOrigin(configuredOrigin)

  return [
    { url: origin, changeFrequency: 'monthly', priority: 1 },
    { url: `${origin}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...getVisiblePosts(posts).map((post) => ({
      url: `${origin}${post.url ?? `/blog/${post.slug}`}`,
      lastModified: post.updatedAt ?? post.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

export function createRobots(configuredOrigin?: string): MetadataRoute.Robots {
  const origin = normalizeSiteOrigin(configuredOrigin)

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${origin}/sitemap.xml`,
  }
}
