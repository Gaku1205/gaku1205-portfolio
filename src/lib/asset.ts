/**
 * 公開先が下の階層のとき（GitHub Pages の https://ユーザー名.github.io/リポジトリ名/ ）、その階層の道。
 * 直下に出すとき・手元で動かすときは空。`next.config.ts` が、ビルドのときの環境変数 `PAGES_BASE_PATH` から入れる
 */
export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * `public/` の物や、`<a>` で直接書くサイト内の道（`/works/…`）の前に、公開先の階層を付ける。
 * `next/link` は自動で付くが、`next/image` の `src` と素の `<a>` には付かないので、これを通す。
 * `/` で始まらない物（`#id`・`https://…`）と `//` で始まる物は、そのまま返す
 */
export function asset(path: string, base: string = BASE_PATH): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${base}${path}`;
}
