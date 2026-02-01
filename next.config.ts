import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    staleTimes: {
      dynamic: 300,
      static: 3600,
    },
  },
};

export default nextConfig;
