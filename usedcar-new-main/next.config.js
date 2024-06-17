/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/usedcar',
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/usedcar',
  },
}

module.exports = nextConfig
