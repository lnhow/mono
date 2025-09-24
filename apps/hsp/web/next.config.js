import { resolve } from 'path'
// https://nextjs.org/docs/app/guides/mdx
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hsp/ui', '@repo/i18n'],
  env: {
    // Will be available on both server and client
    NEXT_PUBLIC_ENV: process.env.NODE_ENV,
  },
  webpack: (config) => {
    config.resolve.alias['@hsp/ui'] = resolve(
      import.meta.dirname,
      '../../../packages/hsp/ui',
    )
    config.resolve.alias['@i18n'] = resolve(import.meta.dirname, 'i18n')
    return config
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    viewTransition: true,
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig)
