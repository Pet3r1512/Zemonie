import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import SettingsContainer from "@/components/Dashboard/Settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout section="Settings">
      <SettingsContainer />
    </DashboardLayout>
  );
}
