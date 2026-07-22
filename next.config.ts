import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ai-use-cases/explain-for-beginners",
        destination: "/ai-use-cases/rewrite-friendly-text",
        permanent: true,
      },
    ];
  },
  experimental: {
    cpus: 1,
    workerThreads: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
