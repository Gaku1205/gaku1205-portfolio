// 作品の中身はここ1か所にまとめる。作品を足すときは、WORKS に1つ足すだけでよい。
// 画像は `node .github/scripts/shot.mjs --scale 2 --format webp --out public/works --widths 1440,390 <公開ページの URL>` で撮る。
import { shortUrl } from "./format";

export type WorkLink = {
  /** 画面に出す文字（例：公開ページ） */
  label: string;
  href: string;
};

export type WorkShots = {
  /** 1440×900 で撮った PC の画面（public/ からのパス） */
  desktop: string;
  /** 390×844 で撮ったスマホの画面（public/ からのパス）。スマホの画面が無い作品（ゲーム）は省く */
  mobile?: string;
  /** 画像の説明（alt） */
  alt: string;
  /** スクロールしながら 1 画面ずつ撮った画面（上から順。--scrolls 4 で 4 枚ずつ） */
  scrolled: { desktop: string[]; mobile: string[] };
  /** 図の下に並べる追加の画像（PC のみ。例：めぐりモノの出品一覧） */
  extras?: { src: string; alt: string }[];
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
  /** 受賞の文字（受賞作だけ。名前の上に出す） */
  award?: string;
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
    id: "megurimono",
    name: "megurimono",
    nameJa: "博多の遺失物オークション（hakata-lost-found-auction）",
    kind: "受賞作",
    award: "AWS デジタル社会実現ツアー2025 九州 最優秀賞",
    tagline: "持ち主が見つからなかった落とし物を、地域のオークションで次の使い手へ。",
    what: "警察・企業に届けられ、持ち主が見つからなかった落とし物を、地域のオークションで次の使い手へつなぐ Web アプリ。売上は自治体の歳入と地域振興に還元し、落札品は郵送ではなく、まちの受取拠点で受け渡す。出品一覧・検索・入札・お気に入り、出品元の売上確認と QR コードでの受け渡し、運営の管理画面（入札の吊り上げの検知など）、出品画像からの AI 自動入力がある。",
    how: "React・TypeScript・Vite のフロントエンドを CloudFront で配信し、API は AWS Lambda・API Gateway、データは DynamoDB・S3、認証は Amazon Cognito。AI の自動入力は Amazon Bedrock の Claude で、全部を AWS CDK（TypeScript）で組んでいる。",
    stack: ["React", "TypeScript", "AWS Lambda", "DynamoDB", "Amazon Cognito", "Amazon Bedrock", "AWS CDK"],
    links: [{ label: "GitHub", href: "https://github.com/Gaku1205/hakata-lost-found-auction" }],
    figure: {
      type: "shots",
      shots: {
        desktop: "/works/megurimono-1440.webp",
        mobile: "/works/megurimono-390.webp",
        alt: "めぐりモノのトップ画面。博多の遺失物オークションの入口と、出品中の落とし物が並ぶ",
        scrolled: { desktop: [], mobile: [] },
        extras: [
          {
            src: "/works/megurimono-items-1440.webp",
            alt: "めぐりモノの出品一覧。落とし物の出品が並び、検索や入札へ進める",
          },
        ],
      },
    },
  },
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
    figure: { type: "pipeline", outputs: ["atelier-journal", "neon-sneaker-drop", "neon-drift-arena"] },
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
        desktop: "/works/agent-desk-demo-1440.webp",
        mobile: "/works/agent-desk-demo-390.webp",
        alt: "agent-desk のデモ画面。上に清書から公開までの段、左に「あなたの番 8」、中央に判断待ちの一覧が並ぶ",
        scrolled: {
          desktop: [1, 2].map((n) => `/works/agent-desk-demo-1440-s${n}.webp`),
          mobile: [1, 2, 3].map((n) => `/works/agent-desk-demo-390-s${n}.webp`),
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
        desktop: "/works/atelier-journal-eight-vercel-app-1440.webp",
        mobile: "/works/atelier-journal-eight-vercel-app-390.webp",
        alt: "atelier-journal の表紙。灰色の海の上に大きく「Usuzumi」、右に縦書きで「余白を、まとう。」",
        scrolled: {
          desktop: [1, 2, 3, 4].map((n) => `/works/atelier-journal-eight-vercel-app-1440-s${n}.webp`),
          mobile: [1, 2, 3, 4].map((n) => `/works/atelier-journal-eight-vercel-app-390-s${n}.webp`),
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
        desktop: "/works/neon-sneaker-drop-vercel-app-1440.webp",
        mobile: "/works/neon-sneaker-drop-vercel-app-390.webp",
        alt: "neon-sneaker-drop の最初の画面。黒地に蛍光の黄緑で「PULSAR-9」、手前にスニーカー、左下に「地面を、蹴り返せ。」",
        scrolled: {
          desktop: [1, 2, 3, 4].map((n) => `/works/neon-sneaker-drop-vercel-app-1440-s${n}.webp`),
          mobile: [1, 2, 3, 4].map((n) => `/works/neon-sneaker-drop-vercel-app-390-s${n}.webp`),
        },
      },
    },
  },
  {
    id: "neon-drift-arena",
    name: "neon-drift-arena",
    nameJa: "NEON DRIFT ARENA — Windows のシューティングゲーム",
    kind: "工場で作ったゲーム",
    tagline: "ネオンの闘技場で、弾を避けながら敵の群れを撃ち抜く。",
    what: "ネオンの光る闘技場で、弾を避けながら敵の群れを撃ち抜くシューティング。2〜5分で1回遊べる。ドリフト中は無敵で、触れた敵の弾が金の欠片に変わり、集めると倍率が上がる。ボス（ガーディアン）、オーバードライブ（衝撃波）、記録がある。",
    how: "「本気で作った、Windows の exe で遊べるゲーム（ジャンルはおまかせ）」という1行のメモから、工場がジャンル決め・参考集め（Nova Drift・Just Shapes & Beats・Rez など）・実装まで進めた。TypeScript・Canvas・Vite で作り、Electron で Windows の exe にして、マージのたびに GitHub Releases に置く。",
    stack: ["TypeScript", "Canvas 2D", "Web Audio", "Vite", "Electron", "工場（ai-dev-template）"],
    links: [
      { label: "ダウンロード（Windows）", href: "https://github.com/Gaku1205/neon-drift-arena/releases/latest" },
      { label: "GitHub", href: "https://github.com/Gaku1205/neon-drift-arena" },
    ],
    figure: {
      type: "shots",
      shots: {
        desktop: "/works/neon-drift-arena-play-1440.webp",
        alt: "neon-drift-arena のプレイ画面。ネオンの光る闘技場で、自機が弾を避けながら敵の群れを撃つ",
        scrolled: { desktop: [], mobile: [] },
        extras: [
          {
            src: "/works/neon-drift-arena-title-1440.webp",
            alt: "neon-drift-arena のタイトル画面。ネオンの光る闘技場を背に、ゲームの名前が出る",
          },
          {
            src: "/works/neon-drift-arena-boss-1440.webp",
            alt: "neon-drift-arena のボス戦。ボス（ガーディアン）と、画面いっぱいに広がる弾",
          },
          {
            src: "/works/neon-drift-arena-over-1440.webp",
            alt: "neon-drift-arena の結果画面。1回の遊びの得点と記録が出る",
          },
        ],
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

/** ブラウザの枠のアドレスに出す URL（短く）。公開ページがあればそれ、無ければ GitHub のリンク（めぐりモノ・ゲーム）、それも無ければ最初のリンク */
export function frameAddress(work: Work): string {
  const link =
    work.links.find((l) => l.label === "公開ページ") ??
    work.links.find((l) => l.label === "GitHub") ??
    work.links[0];
  return link ? shortUrl(link.href) : "";
}

/** スクロールした画面の画像（PC・スマホ）。画面を持たない作品は空を返す */
export function scrolledShots(work: Work): { desktop: string[]; mobile: string[] } {
  if (work.figure.type !== "shots") return { desktop: [], mobile: [] };
  const { desktop, mobile } = work.figure.shots.scrolled;
  // スマホの画面が無い作品（ゲーム）は、スマホの列を空にする
  return { desktop: [...desktop], mobile: work.figure.shots.mobile ? [...mobile] : [] };
}

/** 工場（pipeline）の作品が作った物のうち、画面の画像を持つ物だけを順に返す */
export function pipelineOutputs(work: Work, works: readonly Work[] = WORKS): Work[] {
  if (work.figure.type !== "pipeline") return [];
  return work.figure.outputs
    .map((id) => findWork(id, works))
    .filter((w): w is Work => w !== undefined && w.figure.type === "shots");
}
