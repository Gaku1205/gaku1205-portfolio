import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GITHUB, SiteFoot } from "@/components/SiteFoot";
import { Reveal } from "@/components/Reveal";
import { WorkFigure } from "@/components/WorkFigure";
import { shortUrl, workNumber } from "@/lib/format";
import { WORKS, findWork, frameAddress, scrolledShots } from "@/lib/works";
import { BrowserFrame, PhoneFrame } from "@/components/DeviceFrame";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return WORKS.map((w) => ({ id: w.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const work = findWork(id);
  if (!work) return {};
  return { title: `${work.name} — Gaku1205`, description: work.tagline };
}

function BackLink() {
  return (
    <Link href="/" className="back">
      <span aria-hidden="true">← </span>トップに戻る
    </Link>
  );
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const work = findWork(id);
  if (!work) notFound();

  const index = WORKS.findIndex((w) => w.id === work.id);
  const num = workNumber(index);
  const shots = scrolledShots(work);
  const alt = work.figure.type === "shots" ? work.figure.shots.alt : "";
  const address = frameAddress(work);
  // スマホの画面が無く、スクロールした画面も無い作品だけ、追加の画像を詳しいページに出す
  const extras =
    work.figure.type === "shots" && !work.figure.shots.mobile && shots.desktop.length === 0
      ? (work.figure.shots.extras ?? [])
      : [];
  const total = (n: number) => `${n} / ${shots.desktop.length}`;

  return (
    <>
      <header className="site-head">
        <Link href="/" className="site-head__name">
          Gaku1205
        </Link>
        <nav aria-label="ページ内" className="site-head__nav">
          <Link href="/#works">作品</Link>,
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main>
        <div className="detail__back">
          <BackLink />
        </div>

        <article className="work work--detail grid" aria-labelledby="detail-title">
          <div className="work__side">
            <p className="work__num" aria-hidden="true">
              {num}
            </p>
            <p className="label">{work.kind}</p>
          </div>

          <div className="work__main">
            <header className="work__head">
              {work.award ? <p className="label work__award">{work.award}</p> : null}
              <h1 id="detail-title" className="work__name">
                <span className="visually-hidden">{num} </span>
                {work.name}
              </h1>
              <p className="work__ja">{work.nameJa}</p>
              <p className="work__tagline">{work.tagline}</p>
            </header>

            <div className="work__body work__body--detail">
              <dl className="work__facts">
                <div>
                  <dt className="label">何か</dt>
                  <dd>{work.what}</dd>
                </div>
                <div>
                  <dt className="label">どう作ったか</dt>
                  <dd>{work.how}</dd>
                </div>
              </dl>

              <div className="work__meta">
                <p className="label">使った物</p>
                <ul className="work__stack">
                  {work.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <ul className="work__links">
                  {work.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noreferrer" className="link-row">
                        <span className="link-row__label">{l.label}</span>
                        <span className="link-row__url">{shortUrl(l.href)}</span>
                        <span className="link-row__arrow" aria-hidden="true">
                          ↗
                        </span>
                        <span className="visually-hidden">（新しいタブで開く）</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {work.figure.type === "pipeline" ? (
              <Reveal className="work__figure detail__pipe">
                <WorkFigure work={work} outputBase="/works/" />
              </Reveal>
            ) : null}

            {shots.desktop.length > 0 ? (
              <section className="scrolled" aria-labelledby="scrolled-title">
                <h2 id="scrolled-title" className="section-title">
                  スクロールした画面
                </h2>
                <ol className="scrolled__pc">
                  {shots.desktop.map((src, i) => (
                    <li key={src}>
                      <Reveal>
                        <BrowserFrame address={address}>
                          <Image
                            src={src}
                            alt={`${work.name} の PC の画面（上から ${total(i + 1)} 枚目）。${alt}`}
                            width={1440}
                            height={900}
                            sizes="(min-width: 900px) 72vw, 100vw"
                          />
                        </BrowserFrame>
                      </Reveal>
                      <p className="label">PC {total(i + 1)}</p>
                    </li>
                  ))}
                </ol>

                {shots.mobile.length > 0 ? (
                  <>
                    <h2 className="section-title scrolled__sub">スマホ</h2>
                    <ol className="scrolled__sp">
                      {shots.mobile.map((src, i) => (
                        <li key={src}>
                          <Reveal>
                            <PhoneFrame>
                              <Image
                                src={src}
                                alt={`${work.name} のスマホの画面（上から ${i + 1} / ${shots.mobile.length} 枚目）`}
                                width={390}
                                height={844}
                                sizes="(min-width: 900px) 18vw, 46vw"
                              />
                            </PhoneFrame>
                          </Reveal>
                          <p className="label">
                            SP {i + 1} / {shots.mobile.length}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </>
                ) : null}
              </section>
            ) : null}

            {/* スマホの無い作品（ゲーム）：スクロールした画面の列の位置に、追加の画像を PC の枠で並べる */}
            {extras.length > 0 ? (
              <section className="scrolled" aria-label="追加の画面">
                <ul className="scrolled__extras">
                  {extras.map((e) => (
                    <li key={e.src}>
                      <Reveal>
                        <BrowserFrame address={address}>
                          <Image
                            src={e.src}
                            alt={e.alt}
                            width={1440}
                            height={900}
                            sizes="(min-width: 900px) 72vw, 100vw"
                          />
                        </BrowserFrame>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="detail__back detail__back--end">
              <BackLink />
            </div>
          </div>
        </article>
      </main>

      <SiteFoot />
    </>
  );
}
