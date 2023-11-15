/** @type {import('next').NextConfig} */
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

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
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
      return [
        [
          {
            source: '/api/newts/:path*',
            destination: `${process.env.MAIN_API}/:path*`,
          },
        ]
      ]
    }
    return  [
      {
        source: '/api/newts/:path*',
        destination: `${process.env.PRIVATE_MAIN_API}/:path*`,
      },
    ]
  },
  transpilePackages: ['@newts/ui']
}

module.exports = nextConfig
