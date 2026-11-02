import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatUserDate,
  formatUserDateShort,
  formatUserTime,
  toUserTimezone,
} from "./userTimezone";

describe("Time Zone convert help's test: ", () => {
  beforeEach(() => {
    vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
      timeZone: "Australia/Sydney",
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("toUserTimezone", () => {
    it("should convert UTC ISO string near midnight converts to the next Sydney day (ahead of UTC)", () => {
      const result = toUserTimezone("2026-12-31T20:00:00Z");

      expect(result.getFullYear()).toBe(2027);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
      expect(result.getHours()).toBe(7);
      expect(result.getMinutes()).toBe(0);
    });

    it("keeps the same date for a UTC instant that is daytime in Sydney", () => {
      const result = toUserTimezone("2026-06-15T10:00:00Z");

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(5); // June
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(20);
    });

    it("throws error when input is invalid", () => {
      const result = toUserTimezone("invalid");

      expect(result).toStrictEqual(new Date(NaN));
    });
  });

  describe("formatUserDate", () => {
    it("returns correct results", () => {
      const result = formatUserDate("2026-12-31T20:00:00Z");

      expect(result).toBe("Friday, January 1, 2027");
    });

    it("returns invalid Date string when input is empty or invalid", () => {
      const resultEmpty = formatUserDate("");
      const resultInvalid = formatUserDate("invalid");

      expect(resultEmpty).toBe("Invalid Date");
      expect(resultInvalid).toBe("Invalid Date");
    });
  });

  describe("formatUserTime", () => {
    it("returns 07:00 AM at Sydney for 20:00 UTC", () => {
      const result = formatUserTime("2026-12-31T20:00:00Z");

      expect(result).toBe("07:00 AM");
    });

    it("returns 03:00 AM at HCM City for 20:00 UTC", () => {
      vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
        timeZone: "Asia/Ho_Chi_Minh",
      } as Intl.ResolvedDateTimeFormatOptions);

      const result = formatUserTime("2026-12-31T20:00:00Z");

      expect(result).toBe("03:00 AM");
    });
  });

  describe("formatUserDateShort", () => {
    it("returns 01/01/2027 when input is 2026-12-31", () => {
      const result = formatUserDateShort("2026-12-31T20:00:00Z");

      expect(result).toBe("01/01/2027");
    });
  });

  describe("formatUserCalendarDate", () => {
    it("returns calendar date without shifting west of UTC", () => {
      // Budget startDate is 2026-11-01T00:00:00Z. Sydney (UTC+11) sees Nov 1,
      // not Oct 31 — calendar date should not roll back.
      const result = formatUserCalendarDate("2026-11-01T00:00:00Z");

      expect(result).toBe("11/01/2026");
    });

    it("strips time portion before formatting", () => {
      const result = formatUserCalendarDate("2026-11-01T23:59:59Z");

      expect(result).toBe("11/01/2026");
    });

    it("handles date-only input", () => {
      const result = formatUserCalendarDate("2026-11-01");

      expect(result).toBe("11/01/2026");
    });
  });

  describe("formatChartDate", () => {
    it("returns short month/day for chart tick", () => {
      const result = formatChartDate("2026-12-31");

      expect(result).toBe("12/31");
    });

    it("returns single digit month/day for January", () => {
      const result = formatChartDate("2027-01-01");

      expect(result).toBe("1/1");
    });
  });

  describe("formatChartTooltip", () => {
    it("returns weekday month day for chart tooltip", () => {
      // Dec 31, 2026 is a Thursday in Sydney
      const result = formatChartTooltip("2026-12-31");

      expect(result).toBe("Thu, Dec 31");
    });
  });
});
