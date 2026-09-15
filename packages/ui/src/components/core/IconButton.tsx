import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center shrink-0 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent-1 text-accent-fg hover:opacity-90",
        secondary: "bg-surface-raised text-fg-primary border border-border-default hover:bg-subtle",
        ghost: "text-fg-secondary hover:bg-subtle hover:text-fg-primary",
      },
      size: {
        sm: "size-7",
        md: "size-9",
        lg: "size-10",
      },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, label, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  ),
);
IconButton.displayName = "IconButton";
