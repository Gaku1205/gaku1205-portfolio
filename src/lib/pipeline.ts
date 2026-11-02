// 工場が1行の Issue から公開まで進む段。時刻は1回の目安（分）。

export type PipelineStep = {
  /** 1行書いてからの分 */
  at: number;
  /** 何をしているか */
  label: string;
  /** 誰がしているか */
  who: "人" | "AI";
};

export const PIPELINE_STEPS: PipelineStep[] = [
  { at: 0, label: "Issue を1行書く", who: "人" },
  { at: 1, label: "Issue を清書する", who: "AI" },
  { at: 3, label: "実在のサイトを集めて撮る", who: "AI" },
  { at: 9, label: "デザインを決める", who: "AI" },
  { at: 14, label: "画面を作る", who: "AI" },
  { at: 25, label: "レビューして直す", who: "AI" },
  { at: 31, label: "マージする", who: "AI" },
  { at: 35, label: "公開。画面が見られる", who: "AI" },
];

/** 次に点灯する段の番号。最後まで行ったら最初に戻る */
export function nextStep(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

/** 全体の時間のうち、その段までに進んだ割合（0〜1） */
export function progressAt(steps: readonly PipelineStep[], index: number): number {
  if (steps.length === 0) return 0;
  const last = steps[steps.length - 1].at;
  if (last === 0) return 1;
  const i = Math.min(Math.max(index, 0), steps.length - 1);
  return steps[i].at / last;
}
