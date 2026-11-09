import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getMonthDateRange } from "./getCurrentMonthRange";

describe("Get Current Month Range helper's tests: ", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the full range for a 30-day month", () => {
    vi.setSystemTime(new Date(2026, 10, 15));

    expect(getMonthDateRange()).toBe("Nov 1 to Nov 30");
  });

  it("returns the full range for a 31-day month", () => {
    vi.setSystemTime(new Date(2026, 0, 15));

    expect(getMonthDateRange()).toBe("Jan 1 to Jan 31");
  });

  it("returns 29 days for February in a leap year", () => {
    vi.setSystemTime(new Date(2024, 1, 15));

    expect(getMonthDateRange()).toBe("Feb 1 to Feb 29");
  });

  it("returns 28 days for February in a non-leap year", () => {
    vi.setSystemTime(new Date(2025, 1, 15));

    expect(getMonthDateRange()).toBe("Feb 1 to Feb 28");
  });

  it("ends on December 31 for the last month of the year", () => {
    vi.setSystemTime(new Date(2026, 11, 15));

    expect(getMonthDateRange()).toBe("Dec 1 to Dec 31");
  });

  it("does not include a leading zero on the first day", () => {
    vi.setSystemTime(new Date(2026, 8, 15));

    expect(getMonthDateRange()).toBe("Sep 1 to Sep 30");
  });

  it("returns the same range on the first day of the month", () => {
    vi.setSystemTime(new Date(2026, 10, 1, 0, 0, 0));

    expect(getMonthDateRange()).toBe("Nov 1 to Nov 30");
  });

  it("returns the same range on the last day of the month", () => {
    vi.setSystemTime(new Date(2026, 10, 30, 23, 59, 59));

    expect(getMonthDateRange()).toBe("Nov 1 to Nov 30");
  });

  it("handles a century leap year correctly", () => {
    vi.setSystemTime(new Date(2000, 1, 10));

    expect(getMonthDateRange()).toBe("Feb 1 to Feb 29");
  });

  it("handles a non-leap century year correctly", () => {
    vi.setSystemTime(new Date(1900, 1, 10));

    expect(getMonthDateRange()).toBe("Feb 1 to Feb 28");
  });
});
