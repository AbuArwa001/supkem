import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.transparenttextures.com',
      },
      {
        protocol: 'https',
        hostname: 'supkem-drf.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'supkem.co.ke',
      },
      {
        protocol: 'https',
        hostname: 'supkem.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
};

export default nextConfig;
