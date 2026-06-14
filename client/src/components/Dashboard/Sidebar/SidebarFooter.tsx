import { SidebarMenuButton } from "@/components/ui/sidebar";
import { CircleUser, LogOut, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/useLogOut";

const items = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: <CircleUser />,
  },
  {
    title: "Log Out",
    url: "",
    icon: <LogOut />,
    type: "action",
  },
];

export default function SidebarFooter({ currUrl }: { currUrl: string }) {
  const { logout } = useLogout();

  return (
    <section className="px-5 pb-10">
      <div className="space-y-2.5">
        {items.map((item) => {
          const isLogout = item?.type === "action";

          const isActive = !isLogout && currUrl === item.url;

          return (
            <div key={item.title} onClick={item.title === "Log Out" ? logout : () => {}}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "py-5 transition-all duration-150 ease-linear",
                  isActive && "bg-primary text-white lg:hover:bg-primary lg:hover:text-white",
                  !isActive && !isLogout && "lg:hover:bg-gray-100 dark:lg:hover:bg-dark-card",
                  isLogout && "text-red-500 hover:text-red-600",
                )}
              >
                <Link from="/" to={item.url} className="text-lg font-semibold">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </div>
          );
        })}
      </div>
    </section>
  );
}
