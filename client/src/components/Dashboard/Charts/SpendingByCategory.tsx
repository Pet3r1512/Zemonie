// oxlint-disable react/no-unstable-nested-components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { formatCurrency } from "@/helpers/formatCurrency";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import categoryColorDictionary from "@/types/CategoryDict";
import TAILWIND_TO_HEX from "@/types/Tailwind2Hex";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

type ExpenseCategoryEntry = {
  _sum: { amount: string };
  categoryId: number;
};

type SpendingByCategoryProps = {
  data: { expenseCategorySummary: ExpenseCategoryEntry[] } | undefined;
};

export function SpendingByCategory({ data }: SpendingByCategoryProps) {
  const user_preferences = useUserPreferences();
  const summary: ExpenseCategoryEntry[] = data?.expenseCategorySummary ?? [];

  const chartData = summary.map((entry) => {
    const dict = categoryColorDictionary[String(entry.categoryId)];
    const tailwindClass = dict?.color ?? "";
    return {
      name: dict?.name ?? `Category ${entry.categoryId}`,
      // oxlint-disable-next-line no-underscore-dangle
      value: Number(entry._sum.amount),
      fill: TAILWIND_TO_HEX[tailwindClass] ?? "hsl(var(--chart-1))",
      categoryId: entry.categoryId,
    };
  });

  const totalAmount = chartData.reduce((sum, entry) => sum + entry.value, 0);
  const currency = user_preferences.data?.preferences?.currency ?? "AUD";
  const totalStr = formatCurrency(totalAmount, currency);
  const valueFontSize =
    totalStr.length > 10
      ? "text-lg"
      : totalStr.length > 7
        ? "text-xl"
        : totalStr.length > 5
          ? "text-2xl"
          : "text-3xl";

  const chartConfig: ChartConfig = {};
  for (const item of chartData) {
    chartConfig[item.categoryId] = {
      label: item.name,
      color: item.fill,
    };
  }

  const highestIndex =
    chartData.length > 0
      ? chartData.reduce(
          (maxIdx, entry, idx, arr) => (entry.value > arr[maxIdx].value ? idx : maxIdx),
          0,
        )
      : -1;

  if (summary.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center pb-0">
          <p className="text-muted-foreground text-sm">No expenses this month</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-62.5">
          <PieChart>
            <ChartTooltip
              cursor={false}
              // oxlint-disable-next-line react/no-unstable-nested-components
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const entry = payload[0];
                return (
                  <div className="rounded-lg border bg-white dark:bg-dark-elevated dark:border-dark-elevated px-3 py-2 text-xs shadow-xl">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-[2px]"
                        style={{ backgroundColor: entry?.payload?.fill }}
                      />
                      <span className="font-medium">{entry?.name}</span>
                      <span className="text-muted-foreground">
                        {formatCurrency(Number(entry?.value ?? 0), currency)}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={highestIndex}
              // oxlint-disable-next-line react/no-unstable-nested-components
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="currentColor"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={`fill-[hsl(var(--foreground))] ${valueFontSize} font-bold`}
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-[hsl(var(--muted-foreground))]"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex flex-wrap gap-2 justify-center">
          {chartData.map((entry) => {
            const pct = totalAmount > 0 ? ((entry.value / totalAmount) * 100).toFixed(1) : "0.0";
            return (
              <div key={entry.categoryId} className="flex items-center gap-1.5 text-xs">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.fill }}
                />
                <span className="font-medium">{entry.name}</span>
                <span className="text-muted-foreground">{pct}%</span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}
