import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center rounded-[var(--radius-badge)] border px-3 py-1 text-sm font-semibold transition-[background-color,color,border-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
  {
    variants: {
      variant: {
        default:
          "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]",
        secondary:
          "border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)]",
        outline: "border-[var(--border)] text-[var(--foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
