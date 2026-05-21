import DashboardLayout from "@/components/Dashboard/DashboardLayout";
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
      <div></div>
    </DashboardLayout>
  );
}
