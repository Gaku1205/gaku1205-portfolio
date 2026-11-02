import { describe, expect, it } from "vitest";
import { WORKS, findWork, firstWithShots, pipelineOutputs, scrolledShots, type Work } from "./works";

describe("WORKS", () => {
  it("id が重ならない", () => {
    const ids = WORKS.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("どの作品にも GitHub のリンクがある", () => {
    for (const w of WORKS) {
      expect(w.links.some((l) => l.href.startsWith("https://github.com/Gaku1205/"))).toBe(true);
    }
  });
  it("画像は public/works から読む", () => {
    for (const w of WORKS) {
      if (w.figure.type !== "shots") continue;
      expect(w.figure.shots.desktop).toMatch(/^\/works\/.+-1440\.png$/);
      expect(w.figure.shots.mobile).toMatch(/^\/works\/.+-390\.png$/);
    }
  });
});

describe("scrolledShots", () => {
  it("画面を持つ作品は PC・スマホとも複数枚を返す", () => {
    for (const w of WORKS.filter((x) => x.figure.type === "shots")) {
      const s = scrolledShots(w);
      expect(s.desktop.length).toBeGreaterThan(1);
      expect(s.mobile.length).toBeGreaterThan(1);
      for (const p of s.desktop) expect(p).toMatch(/^\/works\/.+-1440-s\d+\.png$/);
      for (const p of s.mobile) expect(p).toMatch(/^\/works\/.+-390-s\d+\.png$/);
    }
  });
  it("画面を持たない作品は空を返す", () => {
    expect(scrolledShots(findWork("ai-dev-template") as Work)).toEqual({ desktop: [], mobile: [] });
  });
});

describe("firstWithShots", () => {
  it("画像を持つ最初の作品と番号を返す", () => {
    const f = firstWithShots();
    expect(f?.work.id).toBe("agent-desk");
    expect(f?.index).toBe(1);
  });
  it("画像を持つ作品が無ければ undefined", () => {
    expect(firstWithShots([WORKS[0]])).toBeUndefined();
  });
});

describe("pipelineOutputs", () => {
  it("工場が作ったサイトを、画像を持つ物だけ返す", () => {
    const factory = findWork("ai-dev-template");
    expect(factory).toBeDefined();
    const outputs = pipelineOutputs(factory as Work);
    expect(outputs.map((w) => w.id)).toEqual(["atelier-journal", "neon-sneaker-drop"]);
  });
  it("知らない id と、画像の無い作品は飛ばす", () => {
    const base = WORKS[0];
    const list: Work[] = [
      { ...base, id: "f", figure: { type: "pipeline", outputs: ["x", "g"] } },
      { ...base, id: "g", figure: { type: "pipeline", outputs: [] } },
    ];
    expect(pipelineOutputs(list[0], list)).toEqual([]);
  });
  it("工場でない作品には空を返す", () => {
    expect(pipelineOutputs(findWork("agent-desk") as Work)).toEqual([]);
  });
});
