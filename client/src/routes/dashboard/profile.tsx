import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import ProfilePage from "@/components/Dashboard/Profile/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout section="Profile">
      <ProfilePage />
    </DashboardLayout>
  );
}
