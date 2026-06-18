import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import IncomeOverallContainer from "@/components/Dashboard/Details/IncomeOverallContainer";
import DetailTableContainer from "@/components/Dashboard/Details/tables/DetailTableContainer";
import { createFileRoute, } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/income",)({
  component: RouteComponent,
},);

function RouteComponent() {
  return (
    <DashboardLayout section="Income" sectionDesc="Track and manage your income sources">
      <IncomeOverallContainer />
      <DetailTableContainer option="onlyIncome" />
    </DashboardLayout>
  );
}
