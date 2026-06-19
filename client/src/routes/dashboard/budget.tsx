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
      This is budget page
    </DashboardLayout>
  );
}
