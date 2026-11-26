import { render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import { SpendingByCategory } from "./SpendingByCategory";

type TooltipContentFn = (props: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; payload?: { fill?: string } }>;
}) => ReactNode;

type LabelContentFn = (props: { viewBox?: { cx?: number; cy?: number } }) => ReactNode;

vi.mock("@/hooks/users/useUserPreferences", () => ({
  default: vi.fn(),
}));

const { tooltip } = vi.hoisted(() => ({ tooltip: { active: true } }));

vi.mock("@/components/ui/chart", () => ({
  ChartContainer: ({ children }: { children?: ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  ChartTooltip: ({ content }: { content?: ReactNode | TooltipContentFn }) => {
    if (typeof content !== "function") {
      return <div data-testid="chart-tooltip">{content}</div>;
    }

    return (
      <div data-testid="chart-tooltip">
        {content({
          active: tooltip.active,
          payload: tooltip.active
            ? [{ name: "Food & Drinks", value: 150, payload: { fill: "#ef4444" } }]
            : [],
        })}
      </div>
    );
  },
}));

vi.mock("recharts", () => ({
  PieChart: ({ children }: { children?: ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({
    data,
    activeIndex,
    children,
  }: {
    data?: unknown;
    activeIndex?: number;
    children?: ReactNode;
  }) => (
    <div
      data-testid="pie"
      data-active-index={String(activeIndex)}
      data-points={JSON.stringify(data)}
    >
      {children}
    </div>
  ),
  Sector: () => null,
  Label: ({ content }: { content?: LabelContentFn }) => (
    <svg data-testid="pie-label">
      {typeof content === "function" ? content({ viewBox: { cx: 100, cy: 100 } }) : null}
    </svg>
  ),
}));

const mockUseUserPreferences = vi.mocked(useUserPreferences);

const categoryData = {
  expenseCategorySummary: [
    { categoryId: 8, _sum: { amount: "150" } },
    { categoryId: 10, _sum: { amount: "50" } },
  ],
};

beforeEach(() => {
  tooltip.active = true;
  mockUseUserPreferences.mockReturnValue({
    data: { preferences: { currency: "USD" } },
    isLoading: false,
    isError: false,
  });
});

describe("SpendingByCategory", () => {
  it("renders the empty state when there are no expenses", () => {
    render(<SpendingByCategory data={undefined} />);

    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
    expect(screen.getByText("No expenses this month")).toBeInTheDocument();
    expect(screen.queryByTestId("pie-chart")).not.toBeInTheDocument();
  });

  it("renders the empty state for an empty summary", () => {
    render(<SpendingByCategory data={{ expenseCategorySummary: [] }} />);

    expect(screen.getByText("No expenses this month")).toBeInTheDocument();
  });

  it("maps summary entries into pie chart data", () => {
    render(<SpendingByCategory data={categoryData} />);

    const pie = screen.getByTestId("pie");
    expect(JSON.parse(pie.getAttribute("data-points") ?? "[]")).toEqual([
      { name: "Food & Drinks", value: 150, fill: "#ef4444", categoryId: 8 },
      { name: "Vehicle / Transport", value: 50, fill: "#f59e0b", categoryId: 10 },
    ]);
  });

  it("falls back to a generic name and color for unknown categories", () => {
    render(
      <SpendingByCategory
        data={{ expenseCategorySummary: [{ categoryId: 999, _sum: { amount: "20" } }] }}
      />,
    );

    const pie = screen.getByTestId("pie");
    expect(JSON.parse(pie.getAttribute("data-points") ?? "[]")).toEqual([
      { name: "Category 999", value: 20, fill: "hsl(var(--chart-1))", categoryId: 999 },
    ]);
    expect(screen.getByText("Category 999")).toBeInTheDocument();
    expect(screen.getByText("100.0%")).toBeInTheDocument();
  });

  it("highlights the highest spending category", () => {
    render(<SpendingByCategory data={categoryData} />);

    expect(screen.getByTestId("pie")).toHaveAttribute("data-active-index", "0");
  });

  it("highlights the highest category when it is not first", () => {
    render(
      <SpendingByCategory
        data={{
          expenseCategorySummary: [
            { categoryId: 8, _sum: { amount: "50" } },
            { categoryId: 10, _sum: { amount: "200" } },
          ],
        }}
      />,
    );

    expect(screen.getByTestId("pie")).toHaveAttribute("data-active-index", "1");
  });

  it("shows the formatted total in the pie label", () => {
    render(<SpendingByCategory data={categoryData} />);

    expect(screen.getByText("$200.00")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("renders each category with its percentage in the footer", () => {
    tooltip.active = false;
    render(<SpendingByCategory data={categoryData} />);

    expect(screen.getByText("Food & Drinks")).toBeInTheDocument();
    expect(screen.getByText("75.0%")).toBeInTheDocument();
    expect(screen.getByText("Vehicle / Transport")).toBeInTheDocument();
    expect(screen.getByText("25.0%")).toBeInTheDocument();
  });

  it("renders the tooltip content for the active entry", () => {
    render(<SpendingByCategory data={categoryData} />);

    const tooltipContent = screen.getByTestId("chart-tooltip");
    expect(within(tooltipContent).getByText("Food & Drinks")).toBeInTheDocument();
    expect(within(tooltipContent).getByText("$150.00")).toBeInTheDocument();
  });

  it("renders nothing in the tooltip when it is inactive", () => {
    tooltip.active = false;
    render(<SpendingByCategory data={categoryData} />);

    expect(screen.getByTestId("chart-tooltip")).toBeEmptyDOMElement();
  });
});
