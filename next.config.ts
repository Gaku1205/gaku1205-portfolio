import type { NextConfig } from "next";

// GitHub Pages（gaku1205.github.io）に静的なサイトとして出す（pipeline.json の deploy：github-pages）。
// サーバーで動く機能（画像の最適化・API など）は使えないので、画像は最適化しない
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
