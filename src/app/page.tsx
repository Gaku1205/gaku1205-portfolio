import Image from "next/image";
import { RunLog } from "@/components/RunLog";
import { WorkSection } from "@/components/WorkSection";
import { workNumber } from "@/lib/format";
import { PIPELINE_STEPS } from "@/lib/pipeline";
import { WORKS, firstWithShots } from "@/lib/works";

const GITHUB = "https://github.com/Gaku1205";

const SKILLS: { area: string; items: string[] }[] = [
  { area: "画面", items: ["Next.js", "React", "TypeScript"] },
  { area: "サーバー", items: ["FastAPI", "Python"] },
  { area: "データ", items: ["Supabase", "PostgreSQL", "scikit-learn"] },
  { area: "動かす場所", items: ["AWS の基礎", "GitHub Actions"] },
  { area: "AI", items: ["Claude（AI エージェント）"] },
];

export default function Home() {
  const featured = firstWithShots(WORKS);
  return (
    <>
      <a className="skip" href="#works">
        作品へ移動
      </a>

      <header className="site-head">
        <a href="#top" className="site-head__name">
          Gaku1205
        </a>
        <nav aria-label="ページ内" className="site-head__nav">
          <a href="#works">作品</a>,<a href="#skills">できること</a>,<a href="#about">わたし</a>,
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero grid" aria-labelledby="hero-title">
          <div className="hero__side">
            <p className="label">Portfolio / 2026</p>
            <p className="hero__who">
              福岡で
              <br />
              Web と AI の
              <br />
              開発を学ぶ学生
            </p>
          </div>

          <div className="hero__main">
            <h1 id="hero-title" className="hero__title">
              <span className="hero__line">1行の Issue から、</span>
              <span className="hero__line">AI が作って、</span>
              <span className="hero__line">公開まで回す。</span>
            </h1>

            <div className="hero__foot">
              <div className="hero__left">
                <p className="hero__lead">
                  AI に開発を回させる仕組みを作っています。参考集め・デザイン・実装・レビュー・マージ・公開まで、GitHub
                  Actions の上で AI が進め、人間は判断だけをします。
                </p>
                {featured && featured.work.figure.type === "shots" ? (
                  <a href={`#${featured.work.id}`} className="feature">
                    <span className="feature__img">
                      <Image
                        src={featured.work.figure.shots.desktop}
                        alt=""
                        width={1440}
                        height={900}
                        sizes="180px"
                        loading="eager"
                      />
                    </span>
                    <span className="feature__text">
                      <span className="label">
                        {workNumber(featured.index)} / {featured.work.kind}
                      </span>
                      <span className="feature__name">{featured.work.name}</span>
                      <span className="feature__tag">{featured.work.tagline}</span>
                    </span>
                    <span className="feature__arrow" aria-hidden="true">
                      ↓
                    </span>
                  </a>
                ) : null}
              </div>
              <RunLog steps={PIPELINE_STEPS} title="RUN — ai-dev-template" />
            </div>
          </div>
        </section>

        <nav className="index grid" aria-label="作品の目次">
          <p className="label index__label">Index</p>
          <ol className="index__list">
            {WORKS.map((w, i) => (
              <li key={w.id}>
                <a href={`#${w.id}`}>
                  <span className="mono">{workNumber(i)}</span>
                  <span className="index__name">{w.name}</span>
                  <span className="index__kind">{w.kind}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="works" className="works" aria-labelledby="works-title">
          <div className="grid works__head">
            <p className="label">作品 / {WORKS.length}</p>
            <h2 id="works-title" className="display">
              Works
            </h2>
          </div>
          {WORKS.map((w, i) => (
            <WorkSection key={w.id} work={w} index={i} />
          ))}
        </section>

        <section id="skills" className="skills grid" aria-labelledby="skills-title">
          <div className="skills__side">
            <h2 id="skills-title" className="section-title">
              できること
            </h2>
            <p className="label">Skills</p>
          </div>
          <dl className="skills__list">
            {SKILLS.map((s) => (
              <div key={s.area} className="skills__row">
                <dt>{s.area}</dt>
                <dd>{s.items.join("、")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="about" className="about grid" aria-labelledby="about-title">
          <div className="about__side">
            <h2 id="about-title" className="section-title">
              わたし
            </h2>
            <p className="label">About</p>
          </div>
          <div className="about__main">
            <p className="about__lead">
              作るのは、画面そのものより
              <br />
              「画面ができるまでの流れ」です。
            </p>
            <p className="about__text">
              福岡で Web と AI の開発を学んでいる学生です。AI
              に開発を任せるために、Issue の書き方、レビューの決まり、人間が判断する場所を決め、GitHub Actions
              の上で回る工場にしました。このサイトも、その工場が1行のメモから作りました。
            </p>
            <p className="about__text">連絡は GitHub からお願いします。</p>
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div className="grid site-foot__row">
          <p className="label">Contact</p>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="site-foot__gh">
            <span>github.com/Gaku1205</span>
            <span aria-hidden="true">↗</span>
            <span className="visually-hidden">（新しいタブで開く）</span>
          </a>
        </div>
        <p className="site-foot__mark" aria-hidden="true">
          Gaku1205
        </p>
        <p className="site-foot__copy mono">© 2026 Gaku1205 — Fukuoka</p>
      </footer>
    </>
  );
}
