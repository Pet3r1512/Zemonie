import { describe, expect, it } from "vitest";
import {
  getDayKey,
  getMonthRange,
  getYearMonth,
  isValidTimeZone,
  shiftDayKey,
  startOfDayInTimeZone,
} from "./serverTimeZone";

describe("User time zone helpers", () => {
  it("validates IANA time zone names", () => {
    expect(isValidTimeZone("Australia/Sydney")).toBe(true);
    expect(isValidTimeZone("Not/AZone")).toBe(false);
  });

  it("returns the local calendar day for an instant", () => {
    // 2026-10-31 14:30 UTC is 2026-11-01 01:30 in Sydney (AEDT, UTC+11)
    const instant = new Date("2026-10-31T14:30:00.000Z");

    expect(getDayKey(instant, "Australia/Sydney")).toBe("2026-11-01");
    expect(getDayKey(instant, "UTC")).toBe("2026-10-31");
  });

  it("finds local midnight for a time zone", () => {
    expect(startOfDayInTimeZone(2026, 10, 1, "Australia/Sydney")).toEqual(
      new Date("2026-10-31T13:00:00.000Z"),
    );
  });

  it("builds month ranges in the user's time zone", () => {
    const { start, end } = getMonthRange(2026, 11, "Australia/Sydney");

    expect(start).toEqual(new Date("2026-10-31T13:00:00.000Z"));
    expect(end).toEqual(new Date("2026-11-30T13:00:00.000Z"));
  });

  it("keeps a transaction made just after local midnight in the user's month", () => {
    const { start, end } = getMonthRange(2026, 11, "Australia/Sydney");
    // 2026-11-01 00:30 Sydney time
    const transaction = new Date("2026-10-31T13:30:00.000Z");

    expect(transaction >= start && transaction < end).toBe(true);
    expect(getMonthRange(2026, 10, "Australia/Sydney").end).toEqual(start);
  });

  it("handles daylight saving transitions", () => {
    // New York moves from UTC-5 to UTC-4 on 2026-03-08
    expect(startOfDayInTimeZone(2026, 2, 8, "America/New_York")).toEqual(
      new Date("2026-03-08T05:00:00.000Z"),
    );
    expect(startOfDayInTimeZone(2026, 2, 9, "America/New_York")).toEqual(
      new Date("2026-03-09T04:00:00.000Z"),
    );
  });

  it("returns the year and month in a time zone", () => {
    expect(getYearMonth(new Date("2026-10-31T14:30:00.000Z"), "Australia/Sydney")).toEqual({
      year: 2026,
      month: 11,
    });
  });

  it("shifts day keys across month boundaries", () => {
    expect(shiftDayKey("2026-10-31", 1)).toBe("2026-11-01");
    expect(shiftDayKey("2026-03-01", -1)).toBe("2026-02-28");
  });
});
