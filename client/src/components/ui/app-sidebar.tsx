import {
  Sidebar,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentUrl, } from "@/hooks/useCurrentUrl";
import { cn, } from "@/lib/utils";
import { Link, } from "@tanstack/react-router";
import { Banknote, Coins, Landmark, LayoutDashboard, } from "lucide-react";
import SidebarFooter from "../Dashboard/Sidebar/SidebarFooter";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Transactions",
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
];

export function AppSidebar() {
  const currentUrl = useCurrentUrl().currUrl;
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarGroupContent className="px-5 flex-1 z-50">
        <SidebarMenu className="space-y-2.5">
          {items.map((item,) => (
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
                <Link from="/" to={item.url} className="text-lg font-semibold">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarFooter currUrl={currentUrl} />
    </Sidebar>
  );
}
