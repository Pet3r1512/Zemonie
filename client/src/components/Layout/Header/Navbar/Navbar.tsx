import ThemeToggle from "@/components/ThemeToggle";
import { navigations } from "@/lib/navigations";
import { cn } from "@/lib/utils";

const BTN_GRADIENT = "linear-gradient(135deg, #ff9d33 0%, #ff7900 55%, #ff6200 100%)";

export default function Navbar() {
  return (
    <ul
      data-testid="navbar"
      className="hidden lg:flex items-center gap-x-2 text-[14.5px] font-medium text-gray-900 dark:text-white"
    >
      <ThemeToggle />
      {navigations.map((nav) => {
        const isSignUp = nav.name === "Sign Up";
        return (
          <li key={nav.name}>
            <a
              className={cn(
                "transition-all duration-200",
                isSignUp
                  ? "rounded-full px-[18px] py-[9px] font-semibold text-[#1a0c00] hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,121,0,0.5)]"
                  : "rounded-full px-4 py-2 text-gray-600 hover:text-primary dark:text-[#8b8988] dark:hover:text-white",
              )}
              href={nav.link}
              style={isSignUp ? { backgroundImage: BTN_GRADIENT } : undefined}
            >
              {nav.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
