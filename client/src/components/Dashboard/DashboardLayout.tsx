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
import checkUserSetup from "@/api/users/checkUserSetup";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";

const SETUP_CACHE_KEY = "isSetupDone";

function getCachedSetupStatus(): boolean {
  return sessionStorage.getItem(SETUP_CACHE_KEY) === "true";
}

function setCachedSetupStatus(done: boolean) {
  if (done) {
    sessionStorage.setItem(SETUP_CACHE_KEY, "true");
  } else {
    sessionStorage.removeItem(SETUP_CACHE_KEY);
  }
}

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
  const currentUrl = useCurrentUrl().currUrl;
  const sessionQuery = authClient.useSession();

  const getGlobalCategoriesQuery = useQuery({
    queryKey: ["globalCategories"],
    queryFn: () => getGlobalCategories(),
    enabled: !sessionStorage.getItem("globalCategories"),
  });

  const setupQuery = useQuery({
    queryKey: ["userSetupStatus"],
    queryFn: async () => {
      const result = await checkUserSetup();
      setCachedSetupStatus(result.isSetupDone);
      return result;
    },
    enabled: !!sessionQuery.data?.user.id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });

  const isCachedSetupDone = getCachedSetupStatus();

  useEffect(() => {
    if (!sessionQuery.data?.session) {
      navigate({ to: "/auth/signin", replace: true });
    }
  }, [navigate, sessionQuery.data]);

  if (!getGlobalCategoriesQuery.isLoading && getGlobalCategoriesQuery.data) {
    sessionStorage.setItem(
      "globalCategories",
      JSON.stringify(
        getGlobalCategoriesQuery.data.globalCategories.globalCategories,
      ),
    );
  }

  const dashboard = (
    <SidebarProvider className="p-5">
      <AppSidebar />
      <main className="w-full max-w-7xl mx-auto h-[calc(100dvh-2.5rem)] overflow-hidden flex flex-col">
        <div className="mb-5 space-y-2.5 lg:space-y-5 shrink-0">
          <SidebarTrigger />
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">
            {section}
          </p>
          {currentUrl === "/dashboard" && (
            <p className="font-semibold text-sm">
              Welcome back, {sessionQuery.data?.user.name}
            </p>
          )}
          <p className="text-gray-700">{sectionDesc}</p>
        </div>
        <div className="flex-1 min-h-0 flex flex-col gap-y-5 overflow-y-auto scrollbar-gutter-stable">
          {children}
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );

  if (isCachedSetupDone) {
    return dashboard;
  }

  if (!setupQuery.data?.isSetupDone) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-transparent absolute">
        <AccountSetupForm />
      </div>
    );
  }

  return dashboard;
}
