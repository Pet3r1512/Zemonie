import { Currency } from "@/api/users/createBalance";
import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";
import { describe, it } from "vitest";
import dailySummary from "./dailySummary";

const mockData: [string, TransactionInfo[]][] = [
  [
    "2026-10-10",
    [
      {
        amount: 100,
        categoryId: 15,
        createdAt: "2026-10-10T12:37:01.594Z",
        description: "movie",
        currency: Currency.AUD,
        id: "cmv2dpjmw0001psp7f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
      {
        amount: 500,
        categoryId: 1,
        createdAt: "2026-10-10T12:37:01.594Z",
        description: "movie",
        currency: Currency.AUD,
        id: "cmv2dpjmw0001psa7f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
    ],
  ],
  [
    "2026-10-09",
    [
      {
        amount: 20,
        categoryId: 12,
        createdAt: "2026-10-09T12:37:01.594Z",
        description: "molly tea",
        currency: Currency.AUD,
        id: "cms2dpjmw0001psp7f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
      {
        amount: 99,
        categoryId: 9,
        createdAt: "2026-10-05T12:37:01.594Z",
        description: "tuition fee",
        currency: Currency.AUD,
        id: "cmv2dpjmw0001psa1f4jqcjo2",
        userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
      },
    ],
  ],
];

describe("Daily Summary calculation tests: ", () => {
  it("should calculate daily net correctly", () => {
    const result = dailySummary(mockData);

    expect(result).toStrictEqual([
      [
        "2026-10-10",
        [
          {
            amount: 100,
            categoryId: 15,
            createdAt: "2026-10-10T12:37:01.594Z",
            description: "movie",
            currency: Currency.AUD,
            id: "cmv2dpjmw0001psp7f4jqcjo2",
            userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
          },
          {
            amount: 500,
            categoryId: 1,
            createdAt: "2026-10-10T12:37:01.594Z",
            description: "movie",
            currency: Currency.AUD,
            id: "cmv2dpjmw0001psa7f4jqcjo2",
            userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
          },
        ],
        400,
      ],
      [
        "2026-10-09",
        [
          {
            amount: 20,
            categoryId: 12,
            createdAt: "2026-10-09T12:37:01.594Z",
            description: "molly tea",
            currency: Currency.AUD,
            id: "cms2dpjmw0001psp7f4jqcjo2",
            userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
          },
          {
            amount: 99,
            categoryId: 9,
            createdAt: "2026-10-05T12:37:01.594Z",
            description: "tuition fee",
            currency: Currency.AUD,
            id: "cmv2dpjmw0001psa1f4jqcjo2",
            userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
          },
        ],
        -119,
      ],
      [
        "2026-10-05",
        [
          {
            amount: 1000,
            categoryId: 1,
            createdAt: "2026-10-05T12:37:01.594Z",
            description: "income",
            currency: Currency.AUD,
            id: "cms2dpjmw0001psp7f4jqcjo2",
            userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
          },
          {
            amount: 350,
            categoryId: 5,
            createdAt: "2026-10-05T12:37:01.594Z",
            description: "gift",
            currency: Currency.AUD,
            id: "cmv2dpjmw0001psa1f4jqcjo2",
            userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
          },
          {
            amount: 75,
            categoryId: 7,
            createdAt: "2026-10-05T12:37:01.594Z",
            description: "income",
            currency: Currency.AUD,
            id: "cmv2dpjmw0001psa1f4jqcjo2",
            userId: "LgwXffWenUWSzxdQb6mSOdzWkgvXl2Kw",
          },
        ],
        1425,
      ],
    ]);
  });
});
