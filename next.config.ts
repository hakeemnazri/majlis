import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ], // allow this hostname
    dangerouslyAllowSVG: true, // allow SVG images
  },
};

export default nextConfig;
