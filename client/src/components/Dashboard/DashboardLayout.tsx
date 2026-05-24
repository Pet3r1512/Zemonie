import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import getGlobalCategories from "@/api/categories/getGlobalCategories";
import { Toaster } from "sonner";
import AccountSetupForm from "./Setup/AccountSetupForm";
import LoadingScreen from "../Layout/LoadingScreen";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({
  children,
  section,
  sectionDesc,
}: {
  children: ReactNode;
  section?: string;
  sectionDesc?: string;
}) {
  const navigate = useNavigate();
  const sessionQuery = authClient.useSession();

  const getGlobalCategoriesQuery = useQuery({
    queryKey: ["globalCategories"],
    queryFn: () => getGlobalCategories(),
    enabled: !sessionStorage.getItem("globalCategories"),
  });

  useEffect(() => {
    console.log(sessionQuery.data);
    if (!sessionQuery.data?.session) {
      navigate({ to: "/auth/signin", replace: true });
    }
  }, [navigate, sessionQuery]);

  if (!getGlobalCategoriesQuery.isLoading && getGlobalCategoriesQuery.data) {
    sessionStorage.setItem(
      "globalCategories",
      JSON.stringify(
        getGlobalCategoriesQuery.data.globalCategories.globalCategories,
      ),
    );
  }

  if (sessionQuery.isPending) {
    return <LoadingScreen />;
  }

  if (!sessionQuery.data?.user.isSetupDone) {
    console.log(sessionQuery.data?.user);
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-transparent absolute">
        <AccountSetupForm />
      </div>
    );
  }

  return (
    <SidebarProvider className="p-5">
      <AppSidebar />
      <main className="w-full max-w-7xl space-y-10 max-h-[95dvh] mx-auto scrollbar-gutter-stable">
        <div className="mb-5 space-y-2.5 lg:space-y-5">
          <SidebarTrigger />
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
            {section}
          </p>
          <p className="text-gray-700">{sectionDesc}</p>
        </div>
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
