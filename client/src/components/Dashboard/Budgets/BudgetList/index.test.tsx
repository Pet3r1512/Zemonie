import { describe, it } from "vitest";
import { BudgetDuration, BudgetResponseType } from "./types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import BudgetListContainer from ".";
import getBudgets from "@/api/dashboard/budget/getBudgets";

vi.mock("@/api/dashboard/budget/getBudgets", () => ({
  default: vi.fn(),
}));

const mockBudgets: BudgetResponseType[] = [
  {
    id: "cmw0g7qxf0000psp7vcgf80bw",
    categoryId: 10,
    name: "",
    amount: 500,
    duration: BudgetDuration.MONTH_1,
    isRecurring: true,
    isRollOver: false,
    startDate: "2026-11-01T00:00:00.000Z",
    endDate: "2026-11-30T12:00:00.000Z",
    createdAt: "2026-11-03T08:51:20.211Z",
    updatedAt: "2026-11-03T08:51:20.211Z",
    spentAmount: 0,
    parentBudgetId: "",
  },
];

const renderBudgetList = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BudgetListContainer />
    </QueryClientProvider>,
  );
};

describe("Budget List tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.mocked(getBudgets).mockReset();

    vi.spyOn(globalThis, "fetch").mockImplementation(() => new Promise(() => {}));
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render skeleton while waiting for budget response", () => {
    vi.mocked(getBudgets).mockImplementation(() => new Promise(() => {}));

    renderBudgetList();

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should render correct section and title", async () => {
    vi.mocked(getBudgets).mockResolvedValue({ budgets: { budgets: mockBudgets } });

    renderBudgetList();

    expect(
      await screen.findByRole("region", {
        name: "BudgetListContainer",
      }),
    ).toBeInTheDocument();

    expect(await screen.findByText("Budget By Category")).toBeInTheDocument();
  });

  it("should render the empty state when there are no budgets", async () => {
    vi.mocked(getBudgets).mockResolvedValue({ budgets: { budgets: [] } });

    renderBudgetList();

    expect(await screen.findByText("You have no budget.")).toBeInTheDocument();
  });
});
