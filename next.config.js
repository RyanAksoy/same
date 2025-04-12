/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ext.same-assets.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
