import { it, describe, expect } from "vitest";
import calculateBudgetProgress from "./calculateBudgetProgress";

describe("Calculate Budget Progress helper''s test: ", () => {
  it("should return 100% when spent is equal with total", () => {
    const spent: number = 500;
    const total: number = 500;

    const result = calculateBudgetProgress({ total, spent });

    expect(result).equals(100);
  });

  it("should return 50% when user spent 250$ out of 500%", () => {
    const spent: number = 250;
    const total: number = 500;

    const result = calculateBudgetProgress({ total, spent });

    expect(result).equals(50);
  });

  it("should return 0% when user has not spent anything", () => {
    const spent: number = 0;
    const total: number = 1000;

    const result = calculateBudgetProgress({ total, spent });

    expect(result).equals(0);
  });

  it("should return 200% when user spent doulble than the budget", () => {
    const spent: number = 1000;
    const total: number = 500;

    const result = calculateBudgetProgress({ total, spent });

    expect(result).equals(200);
  });
});
