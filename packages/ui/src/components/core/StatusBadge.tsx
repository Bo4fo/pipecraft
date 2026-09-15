import * as React from "react";
import { getStatusConfig, type StatusKind } from "@pipecraft/tokens";
import { cn } from "../../lib/cn";
import { statusIconMap } from "../../lib/status-icons";

const roleClasses: Record<string, string> = {
  success: "bg-status-success-bg text-status-success border-status-success-border",
  danger: "bg-status-danger-bg text-status-danger border-status-danger-border",
  info: "bg-status-info-bg text-status-info border-status-info-border",
  warning: "bg-status-warning-bg text-status-warning border-status-warning-border",
  neutral: "bg-status-neutral-bg text-status-neutral border-status-neutral-border",
  accent: "bg-status-accent-bg text-status-accent border-status-accent-border",
};

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusKind;
  /** Override the default label from the status config. */
  label?: string;
  /** Hide the icon. */
  hideIcon?: boolean;
  /** Render as a plain dot instead of a pill badge. */
  variant?: "badge" | "dot";
  size?: "sm" | "md";
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, label, hideIcon = false, variant = "badge", size = "md", className, ...props }, ref) => {
    const config = getStatusConfig(status);
    const Icon = statusIconMap[config.icon];

    if (variant === "dot") {
      return (
        <span
          ref={ref}
          role="status"
          aria-label={label ?? config.label}
          title={label ?? config.label}
          className={cn("inline-flex items-center gap-1.5", className)}
          {...props}
        >
          <span
            className={cn(
              "size-2 rounded-full",
              config.animated && "animate-pc-pulse",
            )}
            style={{ backgroundColor: `var(--pc-status-${config.role})` }}
          />
          <span className="text-xs text-fg-secondary">{label ?? config.label}</span>
        </span>
      );
    }

    return (
      <span
        ref={ref}
        role="status"
        className={cn(
          "inline-flex items-center gap-1 rounded-md border font-medium leading-none",
          size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs",
          roleClasses[config.role],
          className,
        )}
        {...props}
      >
        {!hideIcon && Icon && (
          <Icon
            className={cn("size-3.5", config.animated && "animate-pc-spin")}
            aria-hidden
          />
        )}
        {label ?? config.label}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";
