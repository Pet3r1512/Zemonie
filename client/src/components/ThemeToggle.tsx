import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="relative inline-block w-fit">
      <input
        type="checkbox"
        className="peer sr-only"
        aria-label="Toggle theme"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <span
        className={cn(
          "absolute left-1 top-1.5 size-4",
          theme === "light" ? "block" : "hidden",
          "text-yellow-500",
        )}
      >
        <Sun
          size={16}
          className="absolute top-[-2.25px] left-[-0.25px] z-100"
        />
      </span>
      <span
        className={cn(
          "absolute right-1 top-1.5 size-4",
          theme === "dark" ? "block" : "hidden",
          "text-gray-700",
        )}
      >
        <Moon
          size={16}
          className="absolute top-[-2.25px] left-[-0.25px] z-100"
        />
      </span>
      <span
        className={cn(
          "block w-10 h-6 rounded-full transition-colors duration-200",
          theme === "dark" ? "bg-gray-300" : "bg-gray-700",
        )}
      ></span>
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200",
          theme === "dark" ? "translate-x-4" : "",
        )}
      ></span>
    </label>
  );
};

export default ThemeToggle;
