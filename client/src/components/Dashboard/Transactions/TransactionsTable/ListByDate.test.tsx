import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ListByDate, { TransactionInfo } from "./ListByDate";
import { Currency } from "@/api/users/createBalance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { userEvent } from "@storybook/testing-library";

const mockTransactions: TransactionInfo[] = [
  {
    id: "mockTransactionid1",
    userId: "mockUserId",
    categoryId: 1,
    amount: 200,
    currency: Currency.AUD,
    createdAt: "",
    description: "mockDescription1",
  },
  {
    id: "mockTransactionid2",
    userId: "mockUserId",
    categoryId: 8,
    amount: 12,
    currency: Currency.AUD,
    createdAt: "",
    description: "mockDescription2",
  },
];

const renderListByDate = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ListByDate transactions={mockTransactions} />
    </QueryClientProvider>,
  );
};

describe("List By Date component tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(globalThis, "fetch").mockImplementation(() => new Promise(() => {}));
  });

  it("renders List By Date component", () => {
    renderListByDate();

    expect(screen.getByTestId("listbydate-container")).toBeInTheDocument();
  });

  it("displays correct daily net", () => {
    renderListByDate();

    const expectedDailyNet = mockTransactions.reduce((net, transaction) => {
      return transaction.categoryId! <= 7 ? net + transaction.amount : net - transaction.amount;
    }, 0);

    expect(screen.getByTestId("daily-net")).toHaveTextContent(expectedDailyNet.toString());
  });

  it("displays daily tooltip on hover", async () => {
    renderListByDate();

    const dailyNet = screen.getByTestId("daily-net");
    await userEvent.hover(dailyNet);

    expect(await screen.findByRole("tooltip")).toHaveTextContent("Daily Net");
  });

  it("renders a card for each transaction", () => {
    renderListByDate();

    expect(screen.getByText("mockDescription1")).toBeInTheDocument();
    expect(screen.getByText("mockDescription2")).toBeInTheDocument();
  });
});
