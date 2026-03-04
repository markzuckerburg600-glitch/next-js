import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
