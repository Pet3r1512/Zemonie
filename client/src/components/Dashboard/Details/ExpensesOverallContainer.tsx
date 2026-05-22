import { ChartPie, DollarSign, MoveUp } from "lucide-react";
import { OverallDataType } from "../Overall";
import Data from "../Overall/Data";

export default function ExpensesOverallContainer() {
  const placeholderData: OverallDataType[] = [
    {
      name: "Total Expenses",
      subtitle: "This Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100">
          <MoveUp className="text-red-500" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 0,
    },
    {
      name: "Highest Category",
      subtitle: "",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-purple-100">
          <ChartPie className="text-purple-600" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 0,
    },
    {
      name: "Expense Growth",
      subtitle: "vs Last Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-yellow-100">
          <DollarSign className="text-yellow-600" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 0,
    },
  ];
  return (
    <section className="flex flex-col md:flex-row items-stretch gap-y-5 md:gap-x-5 max-w-7xl">
      {placeholderData.map((data) => {
        return <Data key={data.name} data={data} />;
      })}
    </section>
  );
}
