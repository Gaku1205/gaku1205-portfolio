export const GITHUB = "https://github.com/Gaku1205";

/** 終わりの帯（墨の地） */
export function SiteFoot() {
  return (
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
  );
}
