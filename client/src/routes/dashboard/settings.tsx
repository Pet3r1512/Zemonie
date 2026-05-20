import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <div>Hello "/dashboard/settings"!</div>
    </DashboardLayout>
  );
}
