import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useFetchCurrentMonthExpenses from "@/hooks/data/useFetchCurrentMonthExpense";
import useFetchCurrentMonthIncome from "@/hooks/data/useFetchCurrentMonthIncome";
import Charts from "./_index";

vi.mock("@/hooks/data/useFetchCurrentMonthIncome", () => ({ default: vi.fn() }));
vi.mock("@/hooks/data/useFetchCurrentMonthExpense", () => ({ default: vi.fn() }));

const { queryState, received } = vi.hoisted(() => ({
  queryState: {
    spendingByCategory: undefined as unknown,
    last7Days: undefined as unknown,
  },
  received: {
    incomeExpense: undefined as unknown,
    spendingByCategory: undefined as unknown,
    last7Days: undefined as unknown,
  },
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: ({ queryKey }: { queryKey: readonly unknown[] }) => {
    if (queryKey[0] === "spendingByCategory") return { data: queryState.spendingByCategory };
    if (queryKey[0] === "last7DaysExpenses") return { data: queryState.last7Days };
    return { data: undefined };
  },
}));

vi.mock("./CurrentMonthIncomeExpenseChart", () => ({
  CurrentMonthIncomeExpenseChart: ({ chartData }: { chartData: unknown }) => {
    received.incomeExpense = chartData;
    return <div data-testid="income-expense-chart" />;
  },
}));

vi.mock("./SpendingByCategory", () => ({
  SpendingByCategory: ({ data }: { data?: unknown }) => {
    received.spendingByCategory = data;
    return <div data-testid="spending-by-category" />;
  },
}));

vi.mock("./Last7DaysSpendings", () => ({
  default: ({ chartData }: { chartData: unknown }) => {
    received.last7Days = chartData;
    return <div data-testid="last-7-days" />;
  },
}));

const mockUseFetchCurrentMonthIncome = vi.mocked(useFetchCurrentMonthIncome);
const mockUseFetchCurrentMonthExpenses = vi.mocked(useFetchCurrentMonthExpenses);

const now = new Date();
const expectedMonthLabel = `${now.toLocaleString("default", { month: "short" })} ${now.getFullYear()}`;

beforeEach(() => {
  queryState.spendingByCategory = undefined;
  queryState.last7Days = undefined;
  received.incomeExpense = undefined;
  received.spendingByCategory = undefined;
  received.last7Days = undefined;

  mockUseFetchCurrentMonthIncome.mockReturnValue({
    data: { success: true, totalCurrentMonthIncome: { totalIncome: 5000 } },
    isLoading: false,
    isError: false,
  });
  mockUseFetchCurrentMonthExpenses.mockReturnValue({
    data: { totalCurrentMonthExpenses: { totalExpensesAmount: 2000 } },
    isLoading: false,
    isError: false,
  });
});

describe("Charts", () => {
  it("renders all three dashboard charts", () => {
    render(<Charts />);

    expect(screen.getByTestId("income-expense-chart")).toBeInTheDocument();
    expect(screen.getByTestId("spending-by-category")).toBeInTheDocument();
    expect(screen.getByTestId("last-7-days")).toBeInTheDocument();
  });

  it("passes the current month income and expenses to the bar chart", () => {
    render(<Charts />);

    expect(received.incomeExpense).toEqual([
      { month: expectedMonthLabel, income: 5000, expenses: 2000 },
    ]);
  });

  it("passes fetched spending-by-category data to the pie chart", () => {
    const summary = { expenseCategorySummary: [{ categoryId: 8, _sum: { amount: "150" } }] };
    queryState.spendingByCategory = { spendingByCategory: summary };
    render(<Charts />);

    expect(received.spendingByCategory).toEqual(summary);
  });

  it("passes fetched last-7-days data to the bar chart", () => {
    queryState.last7Days = [{ date: "2026-01-05", amount: 12.5 }];
    render(<Charts />);

    expect(received.last7Days).toEqual(queryState.last7Days);
  });

  it("passes undefined values to the charts when queries have not resolved", () => {
    mockUseFetchCurrentMonthIncome.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    mockUseFetchCurrentMonthExpenses.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<Charts />);

    expect(received.incomeExpense).toEqual([
      { month: expectedMonthLabel, income: undefined, expenses: undefined },
    ]);
    expect(received.spendingByCategory).toBeUndefined();
    expect(received.last7Days).toEqual([]);
  });

  it("queries the current month and year", () => {
    render(<Charts />);

    expect(mockUseFetchCurrentMonthIncome).toHaveBeenCalledWith({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
    expect(mockUseFetchCurrentMonthExpenses).toHaveBeenCalledWith({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
  });
});
