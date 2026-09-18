import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is a single static page: export plain HTML/CSS/JS so Netlify
  // can serve it from its CDN with no server runtime.
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
