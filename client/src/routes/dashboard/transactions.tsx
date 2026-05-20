import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import TransactionsTable from "@/components/Dashboard/Transactions/TransactionsTable";
import useFetchUser from "@/hooks/useFetchUser";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/transactions")({
  component: RouteComponent,
});

function RouteComponent() {
  const userId = useFetchUser();

  return (
    <DashboardLayout section="Transactions">
      <TransactionsTable userId={userId} />
    </DashboardLayout>
  );
}
