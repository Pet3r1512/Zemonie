import { Currency } from "@/api/users/createBalance";
import {
  BudgetDuration,
  type BudgetResponseType,
} from "@/components/Dashboard/Budgets/BudgetList/types";
import { describe, expect, it } from "vitest";
import getCreatedBudgetCategory from "./getCreatedBudgetCategory";

function createBudget(overrides: Partial<BudgetResponseType> = {}): BudgetResponseType {
  return {
    id: "budget-1",
    userId: "user-1",
    amount: 100,
    spentAmount: 0,
    categoryId: 1,
    currency: Currency.AUD,
    createdAt: "2026-11-01T00:00:00.000Z",
    updatedAt: "2026-11-01T00:00:00.000Z",
    duration: BudgetDuration.MONTH_1,
    startDate: "2026-11-01T00:00:00.000Z",
    endDate: "2026-11-30T23:59:59.999Z",
    isRecurring: false,
    isRollOver: false,
    name: "Groceries",
    parentBudgetId: "",
    ...overrides,
  };
}

describe("Get Created Budget Category helper's tests: ", () => {
  it("returns an empty array when there are no budgets", () => {
    expect(getCreatedBudgetCategory({ budgets: [] })).toEqual([]);
  });

  it("returns the category id for a single budget", () => {
    const result = getCreatedBudgetCategory({ budgets: [createBudget({ categoryId: 7 })] });

    expect(result).toEqual([7]);
  });

  it("returns all category ids in the same order as the budgets", () => {
    const budgets = [
      createBudget({ id: "a", categoryId: 3 }),
      createBudget({ id: "b", categoryId: 1 }),
      createBudget({ id: "c", categoryId: 12 }),
    ];

    const result = getCreatedBudgetCategory({ budgets });

    expect(result).toEqual([3, 1, 12]);
  });

  it("keeps duplicate category ids", () => {
    const budgets = [
      createBudget({ id: "a", categoryId: 5 }),
      createBudget({ id: "b", categoryId: 5 }),
    ];

    const result = getCreatedBudgetCategory({ budgets });

    expect(result).toEqual([5, 5]);
  });

  it("does not mutate the provided budgets array", () => {
    const budgets = [createBudget({ categoryId: 2 }), createBudget({ categoryId: 4 })];
    const snapshot = structuredClone(budgets);

    getCreatedBudgetCategory({ budgets });

    expect(budgets).toEqual(snapshot);
  });

  it("returns a new array instance each call", () => {
    const budgets = [createBudget({ categoryId: 9 })];

    const first = getCreatedBudgetCategory({ budgets });
    const second = getCreatedBudgetCategory({ budgets });

    expect(first).not.toBe(second);
    expect(first).toEqual(second);
  });
});
