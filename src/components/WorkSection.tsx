import Link from "next/link";
import { shortUrl, workNumber } from "@/lib/format";
import type { Work } from "@/lib/works";
import { Reveal } from "./Reveal";
import { WorkFigure } from "./WorkFigure";

/** 作品1つ分の紙面。左の列に番号と種類、右の列に名前・図・説明・リンク */
export function WorkSection({ work, index }: { work: Work; index: number }) {
  const num = workNumber(index);
  const headingId = `${work.id}-title`;
  return (
    <article id={work.id} className="work grid" aria-labelledby={headingId}>
      <div className="work__side">
        <p className="work__num" aria-hidden="true">
          {num}
        </p>
        <p className="label">{work.kind}</p>
      </div>

      <div className="work__main">
        <header className="work__head">
          {work.award ? <p className="label work__award">{work.award}</p> : null}
          <h3 id={headingId} className="work__name">
            <span className="visually-hidden">{num} </span>
            {work.name}
          </h3>
          <p className="work__ja">{work.nameJa}</p>
          <p className="work__tagline">{work.tagline}</p>
        </header>

        <Reveal className="work__figure">
          <WorkFigure work={work} />
        </Reveal>

        <div className="work__body">
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
              <li>
                <Link href={`/works/${work.id}`} className="link-row link-row--more">
                  <span className="link-row__label">
                    {work.figure.type === "shots" ? "画面をもっと見る" : "進み方を詳しく見る"}
                  </span>
                  <span className="link-row__url" aria-hidden="true" />
                  <span className="link-row__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
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
      </div>
    </article>
  );
}
