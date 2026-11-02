import { describe, expect, it } from "vitest";
import { PIPELINE_STEPS, nextStep, progressAt } from "./pipeline";

describe("PIPELINE_STEPS", () => {
  it("人が1行書いて始まり、35分で公開に着く", () => {
    expect(PIPELINE_STEPS[0].who).toBe("人");
    expect(PIPELINE_STEPS[PIPELINE_STEPS.length - 1].at).toBe(35);
  });
  it("時刻は増えていく順に並ぶ", () => {
    for (let i = 1; i < PIPELINE_STEPS.length; i++) {
      expect(PIPELINE_STEPS[i].at).toBeGreaterThan(PIPELINE_STEPS[i - 1].at);
    }
  });
});

describe("nextStep", () => {
  it("1つ進み、最後の次は最初に戻る", () => {
    expect(nextStep(0, 3)).toBe(1);
    expect(nextStep(2, 3)).toBe(0);
  });
  it("段が無ければ 0", () => {
    expect(nextStep(5, 0)).toBe(0);
  });
});

describe("progressAt", () => {
  const steps = [
    { at: 0, label: "a", who: "人" as const },
    { at: 10, label: "b", who: "AI" as const },
    { at: 40, label: "c", who: "AI" as const },
  ];
  it("最後の時刻に対する割合を返す", () => {
    expect(progressAt(steps, 0)).toBe(0);
    expect(progressAt(steps, 1)).toBe(0.25);
    expect(progressAt(steps, 2)).toBe(1);
  });
  it("範囲の外は端に寄せる", () => {
    expect(progressAt(steps, -3)).toBe(0);
    expect(progressAt(steps, 9)).toBe(1);
  });
  it("段が無ければ 0", () => {
    expect(progressAt([], 0)).toBe(0);
  });
});
