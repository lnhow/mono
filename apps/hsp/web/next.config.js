/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

console.log('[CONFIG] Running in PHASE:', process.env.PHASE)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.MAIN_API}`,
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/newts/:path*',
        destination: `${process.env.MAIN_API}/:path*`,
      },
    ]
  },
  transpilePackages: ['@newts/ui', '@hsp/ui', '@newts/i18n'],
  webpack: (config) => {
    config.resolve.alias['@i18n'] = path.resolve(
      __dirname,
      'i18n',
    )
    return config
  }
}

module.exports = nextConfig
