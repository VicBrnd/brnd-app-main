import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
    staleTimes: {
      dynamic: 300,
      static: 3600,
    },
  },
};

export default nextConfig;
