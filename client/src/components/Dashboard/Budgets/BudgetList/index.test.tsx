import { describe, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import BudgetListContainer from ".";
import getBudgets from "@/api/dashboard/budget/getBudgets";

vi.mock("@/api/dashboard/budget/getBudgets", () => ({
  default: vi.fn(),
}));

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
    vi.mocked(getBudgets).mockResolvedValue({ budgets: { budgets: [] } });

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
