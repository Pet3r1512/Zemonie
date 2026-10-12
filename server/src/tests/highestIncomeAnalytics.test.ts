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

  it("combines amounts with the same category", () => {
    const result = CalculateHighestIncome([income(100, "Salary"), income(50, "Salary")]);

    expect(result).toEqual({
      category: "Salary",
      amount: 150,
    });
  });
});
