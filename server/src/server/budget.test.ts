import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, authMock } = vi.hoisted(() => ({
  prismaMock: {
    budget: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    pendingBudget: {
      create: vi.fn(),
      findFirst: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
  authMock: {
    api: { getSession: vi.fn() },
  },
}));

vi.mock("@/lib/prisma", () => ({ default: prismaMock }));
vi.mock("@/lib/auth", () => ({ auth: authMock }));
vi.mock("@/lib/crypto", () => ({
  readAmount: vi.fn(async () => 0),
  writeAmount: vi.fn(async (value: number) => String(value)),
}));

import { budgetRouter } from "./budget";

const caller = () =>
  budgetRouter.createCaller({
    req: new Request("http://localhost/api/trpc", { headers: { cookie: "session=test" } }),
    resHeaders: new Headers(),
    auth: authMock as never,
  } as never);

describe("budget timezone handling", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    authMock.api.getSession.mockResolvedValue({ user: { id: "user-1" } });
    prismaMock.budget.create.mockImplementation(async ({ data }) => ({ id: "budget-1", ...data }));
    prismaMock.pendingBudget.create.mockResolvedValue({});
    prismaMock.budget.findUnique.mockResolvedValue({ id: "budget-1", isRecurring: false });
    prismaMock.budget.update.mockImplementation(async ({ data }) => ({ id: "budget-1", ...data }));
    prismaMock.pendingBudget.findFirst.mockResolvedValue(null);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // 2026-12-01 08:00 in Sydney (AEDT, UTC+11) is 2026-11-30 21:00 UTC.
  // In UTC it is still November, which is the bug this guards against.
  const sydneyDec1Morning = new Date("2026-11-30T21:00:00.000Z");

  it("creates a December budget for a Sydney user at 8am on Dec 1", async () => {
    vi.setSystemTime(sydneyDec1Morning);

    await caller().createBudget({
      amount: 100,
      isRecurring: false,
      timeZone: "Australia/Sydney",
    });

    const { data } = prismaMock.budget.create.mock.calls[0][0];
    // Dec 1 00:00 Sydney
    expect(data.startDate).toEqual(new Date("2026-11-30T13:00:00.000Z"));
    // Last instant of Dec 31 Sydney
    expect(data.endDate).toEqual(new Date("2026-12-31T12:59:59.999Z"));
  });

  it("schedules the next recurring budget at the start of the next Sydney month", async () => {
    vi.setSystemTime(sydneyDec1Morning);

    await caller().createBudget({
      amount: 100,
      isRecurring: true,
      timeZone: "Australia/Sydney",
    });

    const { data } = prismaMock.pendingBudget.create.mock.calls[0][0];
    // Jan 1 2027 00:00 Sydney
    expect(data.scheduledAt).toEqual(new Date("2026-12-31T13:00:00.000Z"));
  });

  it("uses the same Sydney month when updating a budget to recurring", async () => {
    vi.setSystemTime(sydneyDec1Morning);

    await caller().updateBudget({
      id: "budget-1",
      amount: 100,
      isRecurring: true,
      timeZone: "Australia/Sydney",
    });

    const { data } = prismaMock.pendingBudget.create.mock.calls[0][0];
    expect(data.scheduledAt).toEqual(new Date("2026-12-31T13:00:00.000Z"));
  });

  it("falls back to UTC when no timezone is sent", async () => {
    vi.setSystemTime(sydneyDec1Morning);

    await caller().createBudget({ amount: 100, isRecurring: false });

    const { data } = prismaMock.budget.create.mock.calls[0][0];
    // Nov 30 21:00 UTC is still November in UTC
    expect(data.startDate).toEqual(new Date("2026-11-01T00:00:00.000Z"));
  });
});
