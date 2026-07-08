export enum BudgetDuration {
  WEEK_1 = "WEEK_1",
  WEEK_2 = "WEEK_2",
  MONTH_1 = "MONTH_1",
  MONTH_3 = "MONTH_3",
  MONTH_6 = "MONTH_6",
  MONTH_12 = "MONTH_12",
}

export type BudgetResponseType = {
  id: string;
  amount: number;
  spentAmount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  duration: BudgetDuration;
  startDate: string;
  endDate: string;
  isRecurring: boolean;
  isRollOver: boolean;
  name: string;
  parentBudgetId: string;
};
