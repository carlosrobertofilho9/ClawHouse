import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/80",
        secondary: "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
        destructive: "border-transparent bg-red-500 text-neutral-50 shadow hover:bg-red-500/80",
        outline: "text-neutral-950",
        thinking: "border-transparent bg-blue-100 text-blue-700",
        toolcall: "border-transparent bg-yellow-100 text-yellow-700",
        messagesent: "border-transparent bg-green-100 text-green-700",
        error: "border-transparent bg-red-100 text-red-700",
        idle: "border-transparent bg-gray-100 text-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
