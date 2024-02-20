/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const createNextIntlPlugin = require('next-intl/plugin')

console.log('[CONFIG] Running in PHASE:', process.env.PHASE)

 
const withNextIntl = createNextIntlPlugin()

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
  transpilePackages: ['@newts/ui'],
  webpack: (config) => {
    config.resolve.alias['@config'] = path.resolve(__dirname, 'config')

    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@config': path.resolve(__dirname, '../../../', 'node_modules/@newts/ui/config'),
    }
    return config
  }
}

module.exports = withNextIntl(nextConfig)
