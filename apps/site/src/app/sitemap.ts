import { allPosts } from 'content-collections'
import type { MetadataRoute } from 'next'

import { site } from '@/lib/site'
import { createSitemap } from '@/lib/site-routes'

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(allPosts, site.origin)
}
