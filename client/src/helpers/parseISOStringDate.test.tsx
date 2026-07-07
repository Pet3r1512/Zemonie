import { describe, expect, it } from "vitest";
import ParseISOStringDate from "./parseISOStringData";

describe("Parse date to ISO string helper's test: ", () => {
  it("should return", () => {
    const today: string = "07/07/2026";

    const result = ParseISOStringDate({ date: today });

    expect(result).toBe("Tuesday, 7 July 2026");
  });

  it("should return", () => {
    const today: string = "02/05/2024";

    const result = ParseISOStringDate({ date: today });

    expect(result).toBe("Monday, 5 February 2024");
  });
});
