import { describe, expect, it } from "vitest";
import getNextRecurrenceDate from "./getNextRecurrenceDate";

describe("Tests for get next recurrence date helper", () => {
  it("should return correct date", () => {
    const result = getNextRecurrenceDate(new Date("2026-10-13"));

    expect(result).toStrictEqual(new Date("2026-11-12T13:00:00.000Z"));
  });

  it("should return the nearest preceding date if the corresponding day in the following month does not exist.", () => {
    const result = getNextRecurrenceDate(new Date("2026-01-29"));

    expect(result).toStrictEqual(new Date("2026-02-27T13:00:00.000Z"));
  });
});
