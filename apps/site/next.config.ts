import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  cacheLife: {
    threeMinutes: {
      stale: 60 * 3,
      revalidate: 60 * 3,
      expire: 60 * 6,
    },
  },
  transpilePackages: ['@folio/ui', '@hsp/ui'],
  async redirects() {
    return [
      {
        source: '/posts/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      {
        source: '/nextjs-perf/:slug*',
        destination: '/demos/nextjs-perf/:slug*',
        permanent: true,
      },
      {
        source: '/tools/contrast-checker/:path*',
        destination: '/demos/contrast-checker/:path*',
        permanent: true,
      },
    ]
  },
}

export default withContentCollections(nextConfig)
