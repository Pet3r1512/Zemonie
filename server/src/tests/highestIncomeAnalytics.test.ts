import CalculateHighestIncome from "@/lib/analytics/CalculateHighestIncome";
import { describe, expect, it } from "vitest";

const income = (amount: number, name: string) => ({
  amount,
  category: { name },
});

describe("Highest Income Analytic's test", () => {
  it("returns empty result for an empty list of income", () => {
    expect(CalculateHighestIncome([])).toEqual({ category: "", amount: 0 });
  });
});
