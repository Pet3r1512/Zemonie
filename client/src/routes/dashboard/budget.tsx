import { BudgetForm } from "@/components/Dashboard/Budgets/BudgetForm";
import BudgetListContainer from "@/components/Dashboard/Budgets/BudgetList";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/budget")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout
      section="Budget Management"
      sectionDesc="Track and manage your spending limits by category"
    >
      <div className="flex items-center gap-x-5 lg:justify-end">
        <BudgetForm />
      </div>
      {/* <BudgetOverall /> */}
      <BudgetListContainer />
    </DashboardLayout>
  );
}
