import * as React from "react";
import { cn } from "../../lib/cn";

export type EnvironmentKind = "production" | "staging" | "preview" | "development";

export interface EnvironmentBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  environment: EnvironmentKind | (string & {});
}

const envClass: Record<string, string> = {
  production: "bg-status-danger-bg text-status-danger border-status-danger-border",
  staging: "bg-status-warning-bg text-status-warning border-status-warning-border",
  preview: "bg-status-accent-bg text-status-accent border-status-accent-border",
  development: "bg-status-info-bg text-status-info border-status-info-border",
};

export const EnvironmentBadge = React.forwardRef<HTMLSpanElement, EnvironmentBadgeProps>(
  ({ environment, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-1.5 py-0.5 text-xs font-medium capitalize",
        envClass[environment] ?? "bg-subtle text-fg-secondary border-border-default",
        className,
      )}
      {...props}
    >
      {environment}
    </span>
  ),
);
EnvironmentBadge.displayName = "EnvironmentBadge";
