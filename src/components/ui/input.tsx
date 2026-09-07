import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--input)] px-3 py-2 text-base text-[var(--foreground)] transition-[background-color,color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
