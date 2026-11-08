"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/helpers/formatCurrency";
import useUserPreferences from "@/hooks/users/useUserPreferences";

export const description = "A multiple bar chart";

const chartConfig = {
  income: { label: "Income", color: "#38b000" },
  expenses: { label: "Expenses", color: "#ef233c" },
} satisfies ChartConfig;

export function CurrentMonthIncomeExpenseChart({
  chartData,
}: {
  chartData: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
}) {
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";

  if (!chartData || chartData.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-black/5 dark:border-white/10">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent className="pl-0 md:pl-6 h-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  valueFormatter={(value) => formatCurrency(value, currency)}
                />
              }
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
