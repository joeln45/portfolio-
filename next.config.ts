import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the on-screen dev indicator (the bottom-left badge in `next dev`).
  devIndicators: false,
  images: {
    // Allow local images, plus the cache-busted cutout (?v=N forces browsers
    // and the optimizer to refetch when the file is re-exported).
    localPatterns: [
      { pathname: "/**", search: "" },
      // Allow any ?v=N cache-bust on the portrait so re-exports show immediately.
      { pathname: "/headshot-cutout.png" },
    ],
  },
};

export default nextConfig;
