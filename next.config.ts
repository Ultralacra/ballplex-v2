import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "theballplex.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "mediumorchid-pig-468212.hostingersite.com" },
    ],
  },
};

export default nextConfig;
