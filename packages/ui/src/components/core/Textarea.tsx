import * as React from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-border-default bg-surface px-3 py-2 text-sm text-fg-primary placeholder:text-fg-tertiary transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:border-border-focus",
        "disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-status-danger focus-visible:ring-status-danger",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
