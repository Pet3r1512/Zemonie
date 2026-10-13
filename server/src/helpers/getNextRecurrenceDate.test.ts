import { describe, expect, it } from "vitest";
import getNextRecurrenceDate from "./getNextRecurrenceDate";

describe("Tests for get next recurrence date helper", () => {
  it("should return correct date", () => {
    const result = getNextRecurrenceDate(new Date("2026-10-13"));

    expect(result).toStrictEqual(new Date("2026-11-12T13:00:00.000Z"));
  });
});
