/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */

console.log('[CONFIG] Running in PHASE:', process.env.PHASE)

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
        destination: `${process.env.PRIVATE_MAIN_API}/:path*`,
      },
    ]
  },
  transpilePackages: ['@newts/ui'],
}

module.exports = nextConfig
