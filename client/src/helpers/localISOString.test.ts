import { afterEach, describe, expect, it, vi } from "vitest";
import localISOString from "./localISOString";

describe("Local ISO String helper's tests: ", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the ISO representation of a provided date", () => {
    const date = new Date("2026-11-01T00:00:00.000Z");

    expect(localISOString(date)).toBe("2026-11-01T00:00:00.000Z");
  });

  it("preserves milliseconds", () => {
    const date = new Date("2024-02-29T12:34:56.789Z");

    expect(localISOString(date)).toBe("2024-02-29T12:34:56.789Z");
  });

  it("returns a UTC ISO string with a trailing Z", () => {
    const result = localISOString(new Date("2026-05-01T10:30:00.000Z"));

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it("converts an offset date to UTC", () => {
    const date = new Date("2026-05-01T10:30:00+10:00");

    expect(localISOString(date)).toBe("2026-05-01T00:30:00.000Z");
  });

  it("uses the current date when no argument is provided", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-09T08:15:30.123Z"));

    expect(localISOString()).toBe("2026-11-09T08:15:30.123Z");
  });

  it("does not mutate the provided date", () => {
    const date = new Date("2026-11-01T00:00:00.000Z");
    const time = date.getTime();

    localISOString(date);

    expect(date.getTime()).toBe(time);
  });

  it("throws a RangeError for an invalid date", () => {
    expect(() => localISOString(new Date(NaN))).toThrow(RangeError);
    expect(() => localISOString(new Date("not-a-date"))).toThrow("Invalid time value");
  });

  it("handles the Unix epoch", () => {
    expect(localISOString(new Date(0))).toBe("1970-01-01T00:00:00.000Z");
  });
});
