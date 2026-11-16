import type { NextConfig } from "next";

// GitHub Pages に静的なサイトとして出す（pipeline.json の deploy：github-pages）。
// サーバーで動く機能（画像の最適化・API など）は使えないので、画像は最適化しない。
//
// このリポジトリの Pages は https://gaku1205.github.io/gaku1205-portfolio/ （リポジトリ名の階層の下）に出る。
// 階層を付けないと、CSS・JS・画像を直下（/_next/…・/works/…）から読もうとして、全部 404 になる。
// 公開のビルドのときだけ、環境変数 PAGES_BASE_PATH（例：/gaku1205-portfolio。pipeline.json の deploy の build）で階層を渡す。
// 手元と CI のビルドでは空（直下）。決まった形でない値は使わない
const raw = process.env.PAGES_BASE_PATH ?? "";
const basePath = /^\/[A-Za-z0-9._-]+$/.test(raw) ? raw : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath } : {}),
  // next/image の src と素の <a> には階層が自動で付かないので、src/lib/asset.ts が使う
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
