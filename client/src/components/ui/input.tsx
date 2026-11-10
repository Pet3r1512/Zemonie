import { cn } from "@/lib/utils";
import * as React from "react";

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-gray-900 placeholder:text-gray-500 selection:bg-gray-900 selection:text-gray-50 border-gray-200 flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-white dark:placeholder:text-[#8b8988] dark:selection:bg-white dark:selection:text-gray-900 dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:text-white",
        "focus-visible:border-primary focus-visible:ring-primary/30 focus-visible:ring-[3px] dark:focus-visible:border-[#ff9a3d] dark:focus-visible:ring-[#ff7900]/30",
        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
        className,
      )}
      {...props}
    />
  );
};

Input.displayName = "Input"; // Helps with debugging

export { Input };
