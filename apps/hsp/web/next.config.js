/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

console.log('[CONFIG] Running in PHASE:', process.env.PHASE)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hsp/ui', '@repo/i18n'],
  webpack: (config) => {
    config.resolve.alias['@hsp/ui'] = path.resolve(
      __dirname,
      '../../../packages/hsp/ui',
    )
    config.resolve.alias['@i18n'] = path.resolve(
      __dirname,
      'i18n',
    )
    return config
  },
}

module.exports = nextConfig
