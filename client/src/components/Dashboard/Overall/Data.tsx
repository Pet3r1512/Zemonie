import { Card } from "@/components/ui/card";
import { OverallDataType } from ".";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleAlert, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";

const GROWTH_RATE_ICON_SIZE = 16;

export default function Data({ data }: { data: OverallDataType }) {
  const isRateCard = data.name === "Income Growth" || data.name === "Save Rate";

  const rateColor = data.amount >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Card className="w-full py-3.5 px-5 gap-2.5 shadow-lg lg:hover:shadow-2xl transition-all duration-150 ease-linear">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl font-extrabold truncate">{data.name}</p>
        {data.icon}
      </div>

      {data.isError ? (
        <p className="lg:text-xl font-semibold text-red-500 flex items-center gap-x-2">
          Failed To Load <CircleAlert />
        </p>
      ) : (
        <div
          className={cn(
            "lg:text-xl font-semibold flex items-center gap-1",
            isRateCard && rateColor,
          )}
        >
          {!isRateCard ? (
            <div className="relative">
              {data.isLoading && <Skeleton className="absolute inset-0 w-1/2 h-7" />}

              <NumberFlow
                className={data.isLoading ? "invisible" : ""}
                aria-hidden={data.isLoading}
                value={data.isLoading ? 0 : (data.amount ?? 0)}
                format={{
                  style: data.currency ? "currency" : undefined,
                  currency: data.currency,
                  minimumFractionDigits: data.currency === "VND" ? 0 : 2,
                  maximumFractionDigits: data.currency === "VND" ? 0 : 2,
                }}
              />
            </div>
          ) : (
            <div className="relative flex items-center gap-1">
              {data.isLoading && <Skeleton className="absolute inset-0 w-1/2 h-7" />}

              <NumberFlow
                className={data.isLoading ? "invisible" : ""}
                aria-hidden={data.isLoading}
                value={data.isLoading ? 0 : (data.amount ?? 0)}
                format={{
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }}
              />

              {!data.isLoading && (
                <>
                  %
                  {data.amount >= 0 ? (
                    <TrendingUp size={GROWTH_RATE_ICON_SIZE} />
                  ) : (
                    <TrendingDown size={GROWTH_RATE_ICON_SIZE} />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      <div className="text-gray-400 dark:text-gray-300 lg:text-sm">
        {data.isLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : data.subtitle === "" ? (
          <span className="invisible">{"empty"}</span>
        ) : (
          <p>{data.subtitle}</p>
        )}
      </div>
    </Card>
  );
}
