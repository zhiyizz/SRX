/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development' && {
      exclude: ['error', 'warn'],
    },
  },
  images: {
    deviceSizes: [828, 1200, 1920],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'buicknew.blob.core.chinacloudapi.cn',
      }, {
        protocol: 'https',
        hostname: 'static.buick.com.cn',
      }
    ],
  },
  async headers() {
    const res = [
      {
        source: '/video/:path*',
        headers: [
          {
            key: 'cache-control',
            value: 'max-age=604800',
          }
        ]
      },
      {
        source: '/pano/:path*',
        headers: [
          {
            key: 'cache-control',
            value: 'max-age=604800',
          }
        ]
      },
    ];
    if (process.env.NODE_ENV === 'production') {
      res.push({
        source: '/img/:path*',
        headers: [
          {
            key: 'cache-control',
            value: 'max-age=3600',
          }
        ]
      });
    }
    return res;
  },
}

module.exports = nextConfig
