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
    <DashboardLayout
      section="Transactions"
      sectionDesc="Track and manage all your financial activities"
    >
      <TransactionsTable userId={userId} />
    </DashboardLayout>
  );
}
