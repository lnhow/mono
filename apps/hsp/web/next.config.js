/* eslint-disable no-undef */
import { resolve } from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hsp/ui', '@repo/i18n'],
  webpack: (config) => {
    config.resolve.alias['@hsp/ui'] = resolve(
      __dirname,
      '../../../packages/hsp/ui',
    )
    config.resolve.alias['@i18n'] = resolve(
      __dirname,
      'i18n',
    )
    return config
  },
}

export default nextConfig
