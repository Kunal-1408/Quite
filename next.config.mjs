/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
 
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img1.wsimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
      },
    ],
  },
};

export default nextConfig
