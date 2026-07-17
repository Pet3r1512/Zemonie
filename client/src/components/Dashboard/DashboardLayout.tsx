import getGlobalCategories from "@/api/categories/getGlobalCategories";
import checkUserSetup from "@/api/users/checkUserSetup";
import { Toaster } from "@/components/ui/sonner";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";
import LoadingScreen from "../Layout/LoadingScreen";
import { AppSidebar } from "../ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AccountSetupForm from "./Setup/AccountSetupForm";
import { toast } from "sonner";

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
  const userPreferences = useUserPreferences();

  const getGlobalCategoriesQuery = useQuery({
    queryKey: ["globalCategories"],
    queryFn: () => getGlobalCategories(),
    enabled: !sessionStorage.getItem("globalCategories"),
    staleTime: 60 * 60 * 1000,
  });

  const setupQuery = useQuery({
    queryKey: ["userSetupStatus"],
    queryFn: async () => {
      const result = await checkUserSetup();
      setCachedSetupStatus(result.isSetupDone);
      return result;
    },
    enabled: !!sessionQuery.data?.user.id,
    staleTime: 30 * 60 * 1000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });

  const isCachedSetupDone = getCachedSetupStatus();

  useEffect(() => {
    if (!sessionQuery.isPending && !sessionQuery.data?.session) {
      navigate({ to: "/auth/signin", replace: true });
    }
  }, [navigate, sessionQuery.data, sessionQuery.isPending]);

  useEffect(() => {
    if (setupQuery.isError) {
      toast.error("Setup check failed", {
        description: "Could not verify your account setup status.",
      });
    }
  }, [setupQuery.isError]);

  if (!getGlobalCategoriesQuery.isLoading && getGlobalCategoriesQuery.data) {
    sessionStorage.setItem(
      "globalCategories",
      JSON.stringify(getGlobalCategoriesQuery.data.globalCategories.globalCategories),
    );
  }

  if (!userPreferences.isLoading) {
    sessionStorage.setItem("currency", userPreferences.data?.preferences?.currency?.toString());
  }

  const dashboard = (
    <SidebarProvider className="p-5">
      <AppSidebar />
      <main className="w-full max-w-7xl mx-auto h-[calc(100dvh-2.5rem)] overflow-hidden flex flex-col">
        <div className="mb-5 space-y-2.5 lg:space-y-5 shrink-0">
          <SidebarTrigger />
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">{section}</p>
          {currentUrl === "/dashboard" && (
            <p className="font-semibold text-sm">Welcome back, {sessionQuery.data?.user.name}</p>
          )}
          <p className="text-gray-700 dark:text-gray-300">{sectionDesc}</p>
        </div>
        <div className="flex-1 min-h-0 flex flex-col gap-y-5 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </main>
      <Toaster richColors />
    </SidebarProvider>
  );

  if (sessionQuery.isPending) {
    return <LoadingScreen />;
  }

  // Fast path: cached setup status avoids a flash
  if (isCachedSetupDone) {
    return dashboard;
  }

  // Setup query still loading – keep showing loading screen
  if (setupQuery.isPending) {
    return <LoadingScreen />;
  }

  // Setup query errored
  if (setupQuery.isError) {
    // If the user has completed setup before (cached), optimistically show the dashboard
    if (isCachedSetupDone) {
      return dashboard;
    }
    // Otherwise show an error state instead of bypassing setup
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-lg font-semibold text-destructive">Unable to verify account setup</p>
          <p className="text-sm text-muted-foreground">
            There was an error checking your account status. Please try again.
          </p>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer"
              onClick={() => setupQuery.refetch()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Query resolved: show setup form only when the server confirms
  // the user hasn't completed setup yet
  if (!setupQuery.data?.isSetupDone) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-transparent absolute">
        <AccountSetupForm />
      </div>
    );
  }

  return dashboard;
}
