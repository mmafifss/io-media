import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Set to true to ignore ESLint during builds
  },
};

export default nextConfig;
