import { pages } from "@/lib/navigations";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export default function PagesNav() {
  const { pathname } = useLocation();

  return (
    <ul className="hidden md:flex items-center gap-1 text-[14.5px] font-medium">
      {pages.map((link) => {
        const isActive = pathname === link.link;
        return (
          <Link
            key={link.name}
            to={link.link}
            className={cn(
              "rounded-full px-4 py-2 transition-colors duration-200",
              isActive
                ? "border border-[#ff7900]/30 bg-[#ff7900]/12 text-primary dark:text-[#ff9a3d]"
                : "text-gray-600 hover:text-gray-900 dark:text-[#8b8988] dark:hover:text-white",
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </ul>
  );
}
