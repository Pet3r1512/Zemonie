import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import ExpensesOverallContainer from "@/components/Dashboard/Details/ExpensesOverallContainer";
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
      <ExpensesOverallContainer />
      <DetailTableContainer option="onlyExpense" />
    </DashboardLayout>
  );
}
