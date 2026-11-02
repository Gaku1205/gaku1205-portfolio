import { describe, expect, it } from "vitest";
import { formatMinutes, shortUrl, workNumber } from "./format";

describe("workNumber", () => {
  it("0 から数えた番号を 2 桁にする", () => {
    expect(workNumber(0)).toBe("01");
    expect(workNumber(9)).toBe("10");
    expect(workNumber(99)).toBe("100");
  });
  it("負の数や小数は受け付けない", () => {
    expect(() => workNumber(-1)).toThrow(RangeError);
    expect(() => workNumber(1.5)).toThrow(RangeError);
  });
});

describe("formatMinutes", () => {
  it("分を mm:ss にする", () => {
    expect(formatMinutes(0)).toBe("00:00");
    expect(formatMinutes(35)).toBe("35:00");
    expect(formatMinutes(2.5)).toBe("02:30");
  });
  it("秒が 60 に丸まったら繰り上げる", () => {
    expect(formatMinutes(4.999)).toBe("05:00");
  });
  it("負の数は受け付けない", () => {
    expect(() => formatMinutes(-1)).toThrow(RangeError);
  });
});

describe("shortUrl", () => {
  it("https:// と末尾の / を落とす", () => {
    expect(shortUrl("https://github.com/Gaku1205/agent-desk")).toBe("github.com/Gaku1205/agent-desk");
    expect(shortUrl("https://agent-desk-ip1u.vercel.app/")).toBe("agent-desk-ip1u.vercel.app");
    expect(shortUrl("https://www.example.com/a/")).toBe("example.com/a");
  });
  it("URL でなければそのまま返す", () => {
    expect(shortUrl("not a url")).toBe("not a url");
  });
});
