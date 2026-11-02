/** 作品の番号を 2 桁にする（1 → "01"） */
export function workNumber(index: number): string {
  if (!Number.isInteger(index) || index < 0) throw new RangeError("index は 0 以上の整数");
  return String(index + 1).padStart(2, "0");
}

/** 分を "mm:00" の時刻表示にする（35 → "35:00"） */
export function formatMinutes(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes < 0) throw new RangeError("minutes は 0 以上");
  const whole = Math.floor(minutes);
  const seconds = Math.round((minutes - whole) * 60);
  const m = seconds === 60 ? whole + 1 : whole;
  const s = seconds === 60 ? 0 : seconds;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** リンクの先を短く見せる（https://github.com/Gaku1205/agent-desk → github.com/Gaku1205/agent-desk） */
export function shortUrl(href: string): string {
  try {
    const url = new URL(href);
    const path = url.pathname.replace(/\/+$/, "");
    return url.host.replace(/^www\./, "") + path;
  } catch {
    return href;
  }
}
