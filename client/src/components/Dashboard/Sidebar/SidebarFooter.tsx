import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import { useLogout } from "@/hooks/useLogOut";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { CircleUser, LogOut, Settings } from "lucide-react";

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
  const currentUrl = useCurrentUrl().currUrl;

  return (
    <section className="pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
      <div className="px-2 md:px-5 md:space-y-2.5">
        {items.map((item) => {
          const isLogout = item?.type === "action";

          const isActive = !isLogout && currUrl === item.url;

          return (
            <div key={item.title} onClick={item.title === "Log Out" ? logout : () => {}}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "py-5 transition-all duration-150 ease-linear",
                  isLogout
                    ? "text-red-500 hover:text-red-600 hover:bg-transparent"
                    : currentUrl === item.url || isActive
                      ? "border border-[#ff7900]/30 bg-[#ff7900]/12 text-primary lg:hover:bg-[#ff7900]/12 lg:hover:text-primary dark:text-[#ff9a3d]"
                      : "lg:hover:bg-gray-100 dark:lg:hover:bg-white/[0.06]",
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
