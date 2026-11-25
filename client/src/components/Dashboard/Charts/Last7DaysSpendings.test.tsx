import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import Last7DaysSpendings from "./Last7DaysSpendings";

vi.mock("@/hooks/users/useUserPreferences", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/ui/chart", () => ({
  ChartContainer: ({ children }: { children?: ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  ChartTooltip: ({
    content,
    labelFormatter,
  }: {
    content?: ReactNode;
    labelFormatter?: (value: string) => ReactNode;
  }) => (
    <div data-testid="chart-tooltip">
      <span data-testid="tooltip-label">{labelFormatter?.("2026-01-05")}</span>
      {content}
    </div>
  ),
  ChartTooltipContent: ({ valueFormatter }: { valueFormatter?: (value: number) => ReactNode }) => (
    <span data-testid="tooltip-value">{valueFormatter?.(42.5)}</span>
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
  XAxis: ({
    dataKey,
    tickFormatter,
  }: {
    dataKey?: string;
    tickFormatter?: (value: string) => ReactNode;
  }) => <div data-testid={`x-axis-${dataKey}`}>{tickFormatter?.("2026-01-05")}</div>,
  YAxis: () => null,
}));

const mockUseUserPreferences = vi.mocked(useUserPreferences);

const chartData = [
  { date: "2026-01-05", amount: 12.5 },
  { date: "2026-01-06", amount: 30 },
];

beforeEach(() => {
  mockUseUserPreferences.mockReturnValue({
    data: { preferences: { currency: "USD" } },
    isLoading: false,
    isError: false,
  });
});

describe("Last7DaysSpendings", () => {
  it("renders the card title", () => {
    render(<Last7DaysSpendings chartData={chartData} />);

    expect(screen.getByText("Last 7 Days Spendings")).toBeInTheDocument();
  });

  it("passes the provided data to the bar chart", () => {
    render(<Last7DaysSpendings chartData={chartData} />);

    const chart = screen.getByTestId("bar-chart");
    expect(JSON.parse(chart.getAttribute("data-points") ?? "[]")).toEqual(chartData);
  });

  it("renders the amount bar with its configured color", () => {
    render(<Last7DaysSpendings chartData={chartData} />);

    expect(screen.getByTestId("bar-amount")).toHaveAttribute("data-fill", "var(--color-amount)");
  });

  it("formats x-axis ticks as short month/day", () => {
    render(<Last7DaysSpendings chartData={chartData} />);

    expect(screen.getByTestId("x-axis-date")).toHaveTextContent("1/5");
  });

  it("formats the tooltip label as a weekday and date", () => {
    render(<Last7DaysSpendings chartData={chartData} />);

    expect(screen.getByTestId("tooltip-label")).toHaveTextContent("Mon, Jan 5");
  });

  it("formats tooltip values using the preferred currency", () => {
    render(<Last7DaysSpendings chartData={chartData} />);

    expect(screen.getByTestId("tooltip-value")).toHaveTextContent("$42.50");
  });
});
