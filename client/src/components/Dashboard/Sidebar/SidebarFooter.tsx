import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Settings, MessageCircleQuestion, LogOut } from "lucide-react";
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
    title: "Helps",
    url: "/dashboard/helps",
    icon: <MessageCircleQuestion />,
  },
  {
    title: "Log Out",
    url: "",
    icon: <LogOut />,
  },
];

export default function SidebarFooter({ currUrl }: { currUrl: string }) {
  // const sessionQuery = useFetchSession();
  const { logout } = useLogout();

  return (
    <section className="px-5 pb-10">
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.title}
            onClick={item.title === "Log Out" ? logout : () => {}}
          >
            <SidebarMenuButton
              asChild
              className={cn(
                "py-5",
                currUrl === item.url
                  ? "bg-primary text-white lg:hover:bg-primary lg:hover:text-white"
                  : "lg:hover:bg-gray-100",
                item.title === "Log Out"
                  ? "text-red-500 hover:text-red-600 transition-all duration-150 ease-linear"
                  : "",
              )}
            >
              <Link from="/" to={item.url} className="text-lg font-semibold">
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </div>
        ))}
      </div>
      {/* <User
        user={{
          name: sessionQuery.data?.data?.user.name ?? "",
          email: sessionQuery.data?.data?.user.email ?? "",
          avatar: sessionQuery.data?.data?.user.image ?? "",
          shortenName: ShortenUserName(sessionQuery.data?.data?.user.name),
        }}
      /> */}
    </section>
  );
}
