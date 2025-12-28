import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Enforce type safety and linting during builds
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
