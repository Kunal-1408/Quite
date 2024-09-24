/** @type {import('next').NextConfig} */

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
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
        hostname: 'assets.aceternity.com',
        port: '',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig)
