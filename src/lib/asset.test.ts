import { describe, expect, it } from "vitest";
import { asset } from "./asset";

describe("asset", () => {
  it("階層が空なら、そのまま返す（直下に出すとき・手元）", () => {
    expect(asset("/works/megurimono-1440.webp", "")).toBe("/works/megurimono-1440.webp");
  });
  it("階層があれば、public の画像の前に付ける", () => {
    expect(asset("/works/megurimono-1440.webp", "/gaku1205-portfolio")).toBe(
      "/gaku1205-portfolio/works/megurimono-1440.webp",
    );
  });
  it("サイト内のページへの道にも付ける", () => {
    expect(asset("/works/megurimono", "/gaku1205-portfolio")).toBe("/gaku1205-portfolio/works/megurimono");
  });
  it("ページの中の印・外のサイトは変えない", () => {
    expect(asset("#megurimono", "/x")).toBe("#megurimono");
    expect(asset("https://github.com/Gaku1205", "/x")).toBe("https://github.com/Gaku1205");
    expect(asset("//example.com/a.png", "/x")).toBe("//example.com/a.png");
  });
});
