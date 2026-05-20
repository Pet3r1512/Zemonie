import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Overall from "@/components/Dashboard/Overall";
import TransactionButtons from "@/components/Dashboard/Overall/TransactionsButtons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout section="Dashboard">
      <TransactionButtons />
      <Overall />
    </DashboardLayout>
  );
}
