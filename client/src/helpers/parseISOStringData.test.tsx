import { describe, expect, it } from "vitest";
import ParseISOStringDate from "./parseISOStringData";

describe("Parse date to ISO string helper's test: ", () => {
  it("should return", () => {
    const today: string = "07/07/2026";

    const result = ParseISOStringDate({ date: today });

    expect(result).toBe("Jul 7, 2026");
  });

  it("should return", () => {
    const today: string = "02/05/2024";

    const result = ParseISOStringDate({ date: today });

    expect(result).toBe("Feb 5, 2024");
  });

  it("should return today", () => {
    const today = new Date().toISOString();

    expect(ParseISOStringDate({ date: today })).toBe("Today");
  });

  it("should return yesterday", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    expect(ParseISOStringDate({ date: yesterday.toISOString() })).toBe("Yesterday");
  });
});
