import * as React from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex h-9 w-full rounded-md border border-border-default bg-surface px-3 text-sm text-fg-primary placeholder:text-fg-tertiary transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus",
        "disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-status-danger focus-visible:ring-status-danger",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
