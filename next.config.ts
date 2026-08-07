import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    /* The hero render is a large smooth gradient with very fine specular
       bevels — the exact content lossy WebP softens first. At the default
       quality of 75 it was coming down at 14KB for a 1920px variant, and the
       edges visibly blurred. Next 15.4+ requires non-default qualities to be
       allowlisted here before a component may ask for one. */
    qualities: [75, 92],
  },
};

export default nextConfig;
