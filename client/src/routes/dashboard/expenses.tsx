import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DetailTableContainer from "@/components/Dashboard/Details/tables/DetailTableContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/expenses")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout
      section="Expenses"
      sectionDesc="Track and manage your spending"
    >
      <DetailTableContainer option="onlyExpense" />
    </DashboardLayout>
  );
}
