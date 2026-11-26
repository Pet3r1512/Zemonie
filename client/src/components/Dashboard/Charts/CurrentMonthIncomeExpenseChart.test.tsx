import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import { CurrentMonthIncomeExpenseChart } from "./CurrentMonthIncomeExpenseChart";

vi.mock("@/hooks/users/useUserPreferences", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/ui/chart", () => ({
  ChartContainer: ({ children }: { children?: ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  ChartTooltip: ({ content }: { content?: ReactNode }) => (
    <div data-testid="chart-tooltip">{content}</div>
  ),
  ChartTooltipContent: ({ valueFormatter }: { valueFormatter?: (value: number) => ReactNode }) => (
    <span data-testid="tooltip-value">{valueFormatter?.(1234.5)}</span>
  ),
}));

vi.mock("recharts", () => ({
  BarChart: ({ children, data }: { children?: ReactNode; data?: unknown }) => (
    <div data-testid="bar-chart" data-points={JSON.stringify(data)}>
      {children}
    </div>
  ),
  Bar: ({ dataKey, fill }: { dataKey?: string; fill?: string }) => (
    <div data-testid={`bar-${dataKey}`} data-fill={fill} />
  ),
  CartesianGrid: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

const mockUseUserPreferences = vi.mocked(useUserPreferences);

const chartData = [{ month: "Jan 2026", income: 5000, expenses: 2000 }];

beforeEach(() => {
  mockUseUserPreferences.mockReturnValue({
    data: { preferences: { currency: "USD" } },
    isLoading: false,
    isError: false,
  });
});

describe("CurrentMonthIncomeExpenseChart", () => {
  it("renders nothing when there is no chart data", () => {
    const { container } = render(<CurrentMonthIncomeExpenseChart chartData={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the card title", () => {
    render(<CurrentMonthIncomeExpenseChart chartData={chartData} />);

    expect(screen.getByText("Income vs Expenses")).toBeInTheDocument();
  });

  it("passes the provided data to the bar chart", () => {
    render(<CurrentMonthIncomeExpenseChart chartData={chartData} />);

    const chart = screen.getByTestId("bar-chart");
    expect(JSON.parse(chart.getAttribute("data-points") ?? "[]")).toEqual(chartData);
  });

  it("renders income and expenses bars with their configured colors", () => {
    render(<CurrentMonthIncomeExpenseChart chartData={chartData} />);

    expect(screen.getByTestId("bar-income")).toHaveAttribute("data-fill", "var(--color-income)");
    expect(screen.getByTestId("bar-expenses")).toHaveAttribute(
      "data-fill",
      "var(--color-expenses)",
    );
  });

  it("formats tooltip values using the preferred currency", () => {
    render(<CurrentMonthIncomeExpenseChart chartData={chartData} />);

    expect(screen.getByTestId("tooltip-value")).toHaveTextContent("$1,234.50");
  });
});
