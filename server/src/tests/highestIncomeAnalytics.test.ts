import CalculateHighestIncome from "@/lib/analytics/CalculateHighestIncome";
import { describe, expect, it } from "vitest";

describe("Highest Income Analytic's test", () => {
  it("returns empty result for an empty list of income", () => {
    expect(CalculateHighestIncome([])).toEqual({ category: "", amount: 0 });
  });
});
