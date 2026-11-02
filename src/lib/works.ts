// 作品の中身はここ1か所にまとめる。作品を足すときは、WORKS に1つ足すだけでよい。
// 画像は `node .github/scripts/shot.mjs --out public/works --widths 1440,390 <公開ページの URL>` で撮る。

export type WorkLink = {
  /** 画面に出す文字（例：公開ページ） */
  label: string;
  href: string;
};

export type WorkShots = {
  /** 1440×900 で撮った PC の画面（public/ からのパス） */
  desktop: string;
  /** 390×844 で撮ったスマホの画面（public/ からのパス） */
  mobile: string;
  /** 画像の説明（alt） */
  alt: string;
  /** スクロールしながら 1 画面ずつ撮った画面（上から順。--scrolls 4 で 4 枚ずつ） */
  scrolled: { desktop: string[]; mobile: string[] };
};

export type WorkFigure =
  | { type: "shots"; shots: WorkShots }
  /** 画面を持たない仕組み。進み方の図と、作った物の画像（ほかの作品の id）を見せる */
  | { type: "pipeline"; outputs: string[] };

export type Work = {
  id: string;
  /** 英字の名前（大きく出す） */
  name: string;
  /** 日本語の名前・補足 */
  nameJa: string;
  /** 種類（仕組み・道具・工場で作ったサイト など） */
  kind: string;
  /** 1行で言うと */
  tagline: string;
  /** 何か */
  what: string;
  /** どう作ったか */
  how: string;
  stack: string[];
  links: WorkLink[];
  figure: WorkFigure;
};

export const WORKS: Work[] = [
  {
    id: "ai-dev-template",
    name: "ai-dev-template",
    nameJa: "AI 開発会社パイプライン（工場）",
    kind: "仕組み",
    tagline: "Issue を1行書くだけで、AI が公開まで進める。",
    what: "Issue を1行書くと、AI が実在の良いサイトを集めて参考にし、デザイン・実装・レビュー・マージ・公開まで進める GitHub Actions の仕組み。新しいサービスのリポジトリも1行から作る。1行書いてから、約35分で画面が見られる。",
    how: "GitHub Actions の上で、Claude（AI エージェント）を役割ごとに動かす。清書・デザイン・実装・レビュー・修正を別々の仕事に分け、どこまで AI に任せ、どこで人間が判断するかを、ルールの文書と CI で決めている。",
    stack: ["GitHub Actions", "Claude", "Node.js", "Shell", "Next.js"],
    links: [{ label: "GitHub", href: "https://github.com/Gaku1205/ai-dev-template" }],
    figure: { type: "pipeline", outputs: ["atelier-journal", "neon-sneaker-drop"] },
  },
  {
    id: "agent-desk",
    name: "agent-desk",
    nameJa: "AI 開発の進行ダッシュボード",
    kind: "道具",
    tagline: "AI の進み具合と「人間の判断待ち」を、1画面で。",
    what: "AI に開発を任せるときの進行状況と「人間の判断待ち」を1画面で見て、その場で判断を押せるダッシュボード。清書から公開までの段ごとに、どの Issue がどこで止まっているかが分かる。",
    how: "Next.js と TypeScript で作り、GitHub にログインして自分のリポジトリの状態を読む。ログインしなくても、サンプルのデータでデモを見られる。",
    stack: ["Next.js", "React", "TypeScript", "GitHub API"],
    links: [
      { label: "公開ページ", href: "https://agent-desk-ip1u.vercel.app" },
      { label: "GitHub", href: "https://github.com/Gaku1205/agent-desk" },
    ],
    figure: {
      type: "shots",
      shots: {
        desktop: "/works/agent-desk-demo-1440.png",
        mobile: "/works/agent-desk-demo-390.png",
        alt: "agent-desk のデモ画面。上に清書から公開までの段、左に「あなたの番 8」、中央に判断待ちの一覧が並ぶ",
        scrolled: {
          desktop: [1, 2].map((n) => `/works/agent-desk-demo-1440-s${n}.png`),
          mobile: [1, 2, 3].map((n) => `/works/agent-desk-demo-390-s${n}.png`),
        },
      },
    },
  },
  {
    id: "atelier-journal",
    name: "atelier-journal",
    nameJa: "USUZUMI JOURNAL — 季刊誌のサイト",
    kind: "工場で作ったサイト",
    tagline: "架空の服のアトリエ USUZUMI の季刊誌。",
    what: "架空の服のアトリエ USUZUMI の季刊誌のサイト。灰色の海の写真に大きなセリフ体の誌名を重ね、縦書きの一文と目次を添えた、静かな紙面。",
    how: "「架空のアトリエの季刊誌」という1行のメモから、工場が参考集め・デザイン・実装・公開まで進めて作った。",
    stack: ["Next.js", "TypeScript", "工場（ai-dev-template）"],
    links: [
      { label: "公開ページ", href: "https://atelier-journal-eight.vercel.app" },
      { label: "GitHub", href: "https://github.com/Gaku1205/atelier-journal" },
    ],
    figure: {
      type: "shots",
      shots: {
        desktop: "/works/atelier-journal-eight-vercel-app-1440.png",
        mobile: "/works/atelier-journal-eight-vercel-app-390.png",
        alt: "atelier-journal の表紙。灰色の海の上に大きく「Usuzumi」、右に縦書きで「余白を、まとう。」",
        scrolled: {
          desktop: [1, 2, 3, 4].map((n) => `/works/atelier-journal-eight-vercel-app-1440-s${n}.png`),
          mobile: [1, 2, 3, 4].map((n) => `/works/atelier-journal-eight-vercel-app-390-s${n}.png`),
        },
      },
    },
  },
  {
    id: "neon-sneaker-drop",
    name: "neon-sneaker-drop",
    nameJa: "GRAVLESS PULSAR-9 — 発売ページ",
    kind: "工場で作ったサイト",
    tagline: "架空ブランドの新作スニーカーの、派手な発売ページ。",
    what: "架空ブランド GRAVLESS の新作スニーカー PULSAR-9 の発売ページ。黒地に蛍光の黄緑で、品名を画面いっぱいに光らせる。",
    how: "「派手なスニーカーの発売ページ」という1行のメモから、工場が作った。atelier-journal とは正反対の雰囲気を、同じ仕組みから出せるかを試した。",
    stack: ["Next.js", "TypeScript", "工場（ai-dev-template）"],
    links: [
      { label: "公開ページ", href: "https://neon-sneaker-drop.vercel.app" },
      { label: "GitHub", href: "https://github.com/Gaku1205/neon-sneaker-drop" },
    ],
    figure: {
      type: "shots",
      shots: {
        desktop: "/works/neon-sneaker-drop-vercel-app-1440.png",
        mobile: "/works/neon-sneaker-drop-vercel-app-390.png",
        alt: "neon-sneaker-drop の最初の画面。黒地に蛍光の黄緑で「PULSAR-9」、手前にスニーカー、左下に「地面を、蹴り返せ。」",
        scrolled: {
          desktop: [1, 2, 3, 4].map((n) => `/works/neon-sneaker-drop-vercel-app-1440-s${n}.png`),
          mobile: [1, 2, 3, 4].map((n) => `/works/neon-sneaker-drop-vercel-app-390-s${n}.png`),
        },
      },
    },
  },
];

export function findWork(id: string, works: readonly Work[] = WORKS): Work | undefined {
  return works.find((w) => w.id === id);
}

/** 最初の画面で紹介する作品：画面の画像を持つ最初の作品と、その番号 */
export function firstWithShots(works: readonly Work[] = WORKS): { work: Work; index: number } | undefined {
  const index = works.findIndex((w) => w.figure.type === "shots");
  return index === -1 ? undefined : { work: works[index], index };
}

/** スクロールした画面の画像（PC・スマホ）。画面を持たない作品は空を返す */
export function scrolledShots(work: Work): { desktop: string[]; mobile: string[] } {
  if (work.figure.type !== "shots") return { desktop: [], mobile: [] };
  const { desktop, mobile } = work.figure.shots.scrolled;
  return { desktop: [...desktop], mobile: [...mobile] };
}

/** 工場（pipeline）の作品が作った物のうち、画面の画像を持つ物だけを順に返す */
export function pipelineOutputs(work: Work, works: readonly Work[] = WORKS): Work[] {
  if (work.figure.type !== "pipeline") return [];
  return work.figure.outputs
    .map((id) => findWork(id, works))
    .filter((w): w is Work => w !== undefined && w.figure.type === "shots");
}
