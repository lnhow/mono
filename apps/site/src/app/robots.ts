import type { MetadataRoute } from 'next'

import { site } from '@/lib/site'
import { createRobots } from '@/lib/site-routes'

export default function robots(): MetadataRoute.Robots {
  return createRobots(site.origin)
}
