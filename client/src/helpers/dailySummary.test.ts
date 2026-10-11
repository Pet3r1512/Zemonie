import { describe } from "vitest";

const mockData = [
  {
    date: "2026-10-10",
    transactions: [
      {
        amount: 100,
        categoryId: 15,
        createdAt: "2026-10-10T12:37:01.594Z",
        description: "movie",
        currency: "AUD",
        id: "cmv2dpjmw0001psp7f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
      {
        amount: 500,
        categoryId: 1,
        createdAt: "2026-10-10T12:37:01.594Z",
        description: "movie",
        currency: "AUD",
        id: "cmv2dpjmw0001psa7f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
    ],
  },
  {
    date: "2026-10-09",
    transactions: [
      {
        amount: 20,
        categoryId: 12,
        createdAt: "2026-10-09T12:37:01.594Z",
        description: "molly tea",
        currency: "AUD",
        id: "cms2dpjmw0001psp7f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
      {
        amount: 99,
        categoryId: 9,
        createdAt: "2026-10-05T12:37:01.594Z",
        description: "tuition fee",
        currency: "AUD",
        id: "cmv2dpjmw0001psa1f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
    ],
  },
];

describe("Daily Summary calculation tests: ", () => {});
