// 工場が1行の Issue から公開まで進む段。時刻は実際に回った1回の記録（分）。
// 記録元：Gaku1205/atelier-journal の Issue #1 → PR #2（1つの回。UTC 06:18:44 に Issue を書き、06:53:41 に公開）。
//   Issue 作成 06:18:44 / ai:plan 06:19:09 / ai:implement 06:20:49 / PR 作成 06:36:04
//   ai:review 06:38:20 / レビュー終了 06:40:31 / マージ 06:41:00 / 公開 06:53:41
// この回は公開の前に 10 分待つ設定だった（今は 3 分）。

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
  { at: 0.42, label: "Issue を清書し始める", who: "AI" },
  { at: 2.08, label: "清書が終わり、実装を始める", who: "AI" },
  { at: 17.33, label: "PR を出す", who: "AI" },
  { at: 19.6, label: "CI が通り、レビューを始める", who: "AI" },
  { at: 21.78, label: "レビューが終わる", who: "AI" },
  { at: 22.27, label: "マージする", who: "AI" },
  { at: 34.95, label: "公開。画面が見られる", who: "AI" },
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
