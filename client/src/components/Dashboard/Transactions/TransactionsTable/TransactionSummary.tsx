import { ComponentMap } from "@/types/ComponentMap";
import { TransactionInfo } from "./ListByDate";
import { ArrowDown, ArrowUp } from "lucide-react";

enum CategoryType {
  EXPENSE,
  INCOME,
}

type CurrentCategory = {
  id: number;
  type: CategoryType;
  name: string;
  description: string;
};

export default function TransactionSummary({
  transaction,
  lastElementRef,
}: {
  transaction: TransactionInfo;
  lastElementRef?: (node: HTMLDivElement | null) => void;
}) {
  const TransactionTypeDictionary: ComponentMap = {
    INCOME: (
      <div className="size-max p-2.5 rounded-full bg-green-200">
        <ArrowUp size={20} className="text-green-900 font-extrabold" />
      </div>
    ),
    EXPENSE: (
      <div className="size-max p-2.5 rounded-full bg-red-200">
        <ArrowDown size={20} className="text-red-800 font-extrabold" />
      </div>
    ),
  };

  const TransactionAmountTextColor: Record<string, string> = {
    INCOME: "text-green-500",
    EXPENSE: "text-red-500",
  };

  const globalCategoriesData = sessionStorage.getItem("globalCategories");
  const globalCategories: CurrentCategory[] = globalCategoriesData
    ? JSON.parse(globalCategoriesData)
    : [];

  const currCategory: CurrentCategory | undefined = globalCategories.find(
    (c) => c.id === transaction.categoryId,
  );

  return (
    <div
      ref={lastElementRef}
      className="px-2.5 py-3 flex items-center gap-x-5 border-b-[1.5px] border-gray-200 lg:hover:bg-gray-200 transition-all duration-150 ease-linear"
    >
      {currCategory &&
        TransactionTypeDictionary[
          typeof currCategory.type === "string"
            ? (currCategory.type as keyof ComponentMap)
            : (CategoryType[currCategory.type] as keyof ComponentMap)
        ]}

      <div className="space-y-2 flex-1">
        <p className="font-semibold">{currCategory?.name}</p>
        <p>{transaction.description}</p>
      </div>

      <p
        className={`text-xl font-semibold ${
          currCategory
            ? TransactionAmountTextColor[
                typeof currCategory.type === "string"
                  ? currCategory.type
                  : CategoryType[currCategory.type]
              ]
            : "text-gray-500"
        }`}
      >
        {currCategory?.type.toString() === "INCOME" ? "+ " : "- "}
        {transaction.amount}
      </p>
    </div>
  );
}
