import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["placehold.co"], // allow this hostname
    dangerouslyAllowSVG: true, // allow SVG images
  },
};

export default nextConfig;
