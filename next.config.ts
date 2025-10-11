import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lionmagazine.org",
      },
      {
        protocol: "https",
        hostname: "www.lionmagazine.org",
      },
      {
        protocol: "https",
        hostname: "lionsclubs.org",
      },
      {
        protocol: "https",
        hostname: "www.lionsclubs.org",
      },
    ],
  },
};

export default nextConfig;
