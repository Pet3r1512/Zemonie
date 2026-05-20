import { MoveDown, MoveUp, Wallet } from "lucide-react";
import Data from "./Data";
import { useQuery } from "@tanstack/react-query";
import getCurrentBalance from "@/api/users/balances/getCurrentBalance";
import { authClient } from "@/lib/auth-client";
import { ReactNode } from "react";

export type OverallDataType = {
  name: string;
  subtitle: string;
  icon: ReactNode;
  isLoading: boolean;
  isError: boolean;
  amount: number;
};

export default function Overall() {
  const userQuery = useQuery({
    queryKey: ["auth", "session"],
    queryFn: () => authClient.getSession(),
    staleTime: 1000 * 60 * 5,
  });

  const userId = userQuery.data?.data?.user?.id;

  const balanceQuery = useQuery({
    queryKey: ["balance", userId],
    queryFn: () => getCurrentBalance({ userId: userId! }),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 30 * 60 * 1000, // 30 mins
  });

  const currentBalance = balanceQuery.data?.balance.balance ?? 0;

  const data: OverallDataType[] = [
    {
      name: "Total Balance",
      subtitle: "Current Balance",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-blue-100">
          <Wallet className="text-blue-500" />
        </div>
      ),
      isLoading: balanceQuery.isLoading,
      isError: balanceQuery.isError,
      amount: currentBalance,
    },
    {
      name: "Income",
      subtitle: "Total Income",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-green-100">
          <MoveDown className="text-green-500" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 0,
    },
    {
      name: "Expenses",
      subtitle: "Total Expenses",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100">
          <MoveUp className="text-red-500" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 0,
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row items-center gap-y-5 lg:gap-x-5 max-w-7xl">
      {data.map((item) => (
        <Data key={item.name} data={item} />
      ))}
    </section>
  );
}
