import { describe, expect, it, vi } from "vitest";
import ParseISOStringDate from "./parseISOStringData";

const FIXED_NOW = new Date("2026-08-15T12:00:00.000Z");

describe("Parse date to ISO string helper's test: ", () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(FIXED_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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
    const today = FIXED_NOW.toISOString();

    expect(ParseISOStringDate({ date: today })).toBe("Today");
  });

  it("should return yesterday", () => {
    const yesterday = new Date(FIXED_NOW);
    yesterday.setDate(yesterday.getDate() - 1);

    expect(ParseISOStringDate({ date: yesterday.toISOString() })).toBe("Yesterday");
  });
});
