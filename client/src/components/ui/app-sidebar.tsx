import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Banknote, Crosshair, LayoutDashboard } from "lucide-react";
import SidebarFooter from "../Dashboard/Sidebar/SidebarFooter";
import { ReactNode } from "react";

export type DashboardSidebarItem = {
  groupLabel: string;
  groupItems: {
    title: string;
    url: string;
    icon: ReactNode;
    isNew?: boolean;
  }[];
}[];

const sidebarItems: DashboardSidebarItem = [
  {
    groupLabel: "OVERVIEW",
    groupItems: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboard />,
      },
    ],
  },
  {
    groupLabel: "TRACKING",
    groupItems: [
      {
        title: "Money Moves",
        url: "/dashboard/transactions",
        icon: <Banknote />,
      },
      {
        title: "Income",
        url: "/dashboard/income",
        icon: <ArrowDown />,
      },
      {
        title: "Expenses",
        url: "/dashboard/expenses",
        icon: <ArrowUp />,
      },
    ],
  },
  {
    groupLabel: "GOALS",
    groupItems: [
      {
        title: "Budgets",
        url: "/dashboard/budget",
        icon: <Crosshair />,
        isNew: true,
      },
    ],
  },
];

export function AppSidebar() {
  const currentUrl = useCurrentUrl().currUrl;
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarGroupContent className="flex-1 z-50 md:px-5 md:space-y-3.5 lg:space-y-5">
        {sidebarItems.map((group) => {
          return (
            <SidebarGroup key={group.groupLabel}>
              <SidebarGroupLabel className="font-semibold text-gray-500 dark:text-[#8b8988]">
                {group.groupLabel}
              </SidebarGroupLabel>
              <SidebarMenu className="md:space-y-2.5">
                {group.groupItems.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "py-5 font-medium text-[12.5px] rounded-xl transition-all duration-150 ease-linear",
                          currentUrl === item.url
                            ? "flex h-7.5 items-center gap-2.25 rounded-[9px] px-2.5 border border-[#ff7900]/30 bg-[#ff7900]/12 text-primary hover:bg-[#ff7900]/12 hover:text-primary dark:text-[#ff9a3d]"
                            : "",
                        )}
                      >
                        <Link
                          from="/"
                          to={item.url}
                          className="flex w-full items-center gap-2 text-lg font-semibold"
                        >
                          {item.icon}

                          <span>{item.title}</span>

                          {item.isNew && (
                            <span className="ml-auto flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700 relative dark:bg-emerald-400/15 dark:text-emerald-300">
                              New
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarGroupContent>
      <SidebarFooter currUrl={currentUrl} />
    </Sidebar>
  );
}
