import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs font-medium leading-none",
  {
    variants: {
      variant: {
        neutral: "bg-subtle text-fg-secondary border-border-default",
        success: "bg-status-success-bg text-status-success border-status-success-border",
        danger: "bg-status-danger-bg text-status-danger border-status-danger-border",
        info: "bg-status-info-bg text-status-info border-status-info-border",
        warning: "bg-status-warning-bg text-status-warning border-status-warning-border",
        accent: "bg-status-accent-bg text-status-accent border-status-accent-border",
        outline: "bg-transparent text-fg-secondary border-border-default",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  ),
);
Badge.displayName = "Badge";
