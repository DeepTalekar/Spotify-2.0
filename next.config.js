/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**',
      },

      {
        protocol: 'https',
        hostname: 'wrapped-images.spotifycdn.com',
        pathname: '/image/**',
      },
    ],
  },
};
