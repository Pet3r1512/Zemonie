import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import getGlobalCategories from "@/api/categories/getGlobalCategories";
import { Toaster } from "sonner";
import useFetchSession from "@/hooks/useFetchSession";

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
  const sessionQuery = useFetchSession();

  const getGlobalCategoriesQuery = useQuery({
    queryKey: ["globalCategories"],
    queryFn: () => getGlobalCategories(),
    enabled: !sessionStorage.getItem("globalCategories"),
  });

  useEffect(() => {
    if (sessionQuery.isFetched) {
      const hasValidSession =
        sessionQuery.data?.data?.user || sessionQuery.data?.data?.session;

      if (!hasValidSession) {
        navigate({ to: "/auth/signin", replace: true });
      }
    }
  }, [sessionQuery.isFetched, sessionQuery.data, navigate]);

  if (!getGlobalCategoriesQuery.isLoading && getGlobalCategoriesQuery.data) {
    sessionStorage.setItem(
      "globalCategories",
      JSON.stringify(
        getGlobalCategoriesQuery.data.globalCategories.globalCategories,
      ),
    );
  }

  if (sessionQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!sessionQuery.data) {
    return null;
  }

  return (
    <SidebarProvider className="p-5">
      <AppSidebar />
      <main className="w-full max-w-7xl space-y-10 lg:max-h-[95dvh] mx-auto">
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
