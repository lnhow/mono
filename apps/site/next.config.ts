import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@folio/ui'],
  experimental: {
    viewTransition: true,
  },
}

export default withContentCollections(nextConfig)
