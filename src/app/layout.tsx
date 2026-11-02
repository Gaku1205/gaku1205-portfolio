import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen",
  preload: false,
});

export const metadata: Metadata = {
  title: "Gaku1205 — AI に開発を回させる仕組みを作る",
  description:
    "福岡で Web と AI の開発を学ぶ Gaku1205 のポートフォリオ。1行の Issue から AI が公開まで進める工場（ai-dev-template）と、そこから生まれた作品。",
};

export const viewport: Viewport = {
  themeColor: "#f3f1ec",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${geist.variable} ${geistMono.variable} ${zenKaku.variable}`}>
      <body>{children}</body>
    </html>
  );
}
