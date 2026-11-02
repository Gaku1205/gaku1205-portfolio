"use client";

import { useEffect, useState } from "react";
import { formatMinutes } from "@/lib/format";
import { nextStep, progressAt, type PipelineStep } from "@/lib/pipeline";

const STEP_MS = 1200;
const HOLD_MS = 3200;

type Props = {
  steps: readonly PipelineStep[];
  /** ログの見出し（例：RUN — ai-dev-template） */
  title: string;
  /** 大きく組む（作品1の図）か、最初の画面の小さい板か */
  size?: "panel" | "figure";
};

/** 工場の作業ログ。1行ずつ点灯して、最後まで行ったら少し止まって最初に戻る */
export function RunLog({ steps, title, size = "panel" }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const last = steps.length - 1;
    const timer = window.setTimeout(
      () => setActive((i) => nextStep(i, steps.length)),
      active === last ? HOLD_MS : STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, steps.length]);

  const progress = progressAt(steps, active);

  return (
    <figure className={`runlog runlog--${size}`} aria-label={`${title}：Issue を1行書いてから公開までの流れ`}>
      <figcaption className="runlog__head">
        <span className="runlog__live" aria-hidden="true" />
        <span>{title}</span>
        <span className="runlog__clock" aria-hidden="true">
          {formatMinutes(steps[active]?.at ?? 0)}
        </span>
      </figcaption>
      <ol className="runlog__rows">
        {steps.map((s, i) => (
          <li
            key={s.at}
            className="runlog__row"
            data-state={i < active ? "done" : i === active ? "now" : "next"}
          >
            <span className="runlog__time">{formatMinutes(s.at)}</span>
            <span className="runlog__who">{s.who}</span>
            <span className="runlog__label">{s.label}</span>
          </li>
        ))}
      </ol>
      <div className="runlog__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <p className="runlog__note">時刻は1回の目安</p>
    </figure>
  );
}
