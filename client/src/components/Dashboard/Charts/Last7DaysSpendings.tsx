"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatUserDateShort } from "@/helpers/userTimezone";

export const description = "A bar chart";

type Last7DaysExpensesChartType = Array<{
  date: string;
  amount: number;
}>;

const chartConfig = {
  amount: {
    label: "Spending",
    color: "#ff7900",
  },
} satisfies ChartConfig;

function formatDate(dateStr: string) {
  return formatUserDateShort(dateStr);
}

export default function Last7DaysSpendings({
  chartData,
}: {
  chartData: Last7DaysExpensesChartType;
}) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-black/5 dark:border-white/10">
      <CardHeader>
        <CardTitle>Last 7 Days Spendings</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full!" config={chartConfig}>
          <BarChart
            className="w-full"
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 20, top: 5, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => formatUserDateShort(value)}
            />
            <YAxis width={45} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
              labelFormatter={(value) => formatDate(value)}
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
