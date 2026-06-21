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
import { Banknote, Coins, Crosshair, Landmark, LayoutDashboard } from "lucide-react";
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
        icon: <Landmark />,
      },
      {
        title: "Expenses",
        url: "/dashboard/expenses",
        icon: <Coins />,
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
              <SidebarGroupLabel className="text-secondary font-bold">
                {group.groupLabel}
              </SidebarGroupLabel>
              <SidebarMenu className="md:space-y-2.5">
                {group.groupItems.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "py-5 ",
                          currentUrl === item.url
                            ? "bg-primary text-white lg:hover:bg-primary lg:hover:text-white"
                            : "lg:hover:bg-gray-100 dark:lg:hover:bg-dark-elevated",
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
                            <span className="ml-auto flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white relative">
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
