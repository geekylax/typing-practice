/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: '/',
  basePath: '',
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
    }
    return config
  },
  reactStrictMode: true,
  compress: true,
}

module.exports = nextConfig
