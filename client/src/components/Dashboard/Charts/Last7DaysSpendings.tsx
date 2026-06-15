"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart";

type Last7DaysExpensesChartType = [
  {
    date: string;
    amount: number;
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#f79d65",
  },
} satisfies ChartConfig;

export default function Last7DaysSpendings({
  chartData,
}: {
  chartData: Last7DaysExpensesChartType;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 7 Days Spendings</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
