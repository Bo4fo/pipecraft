import * as React from "react";
import { getStatusConfig } from "@pipecraft/tokens";
import { cn } from "../../lib/cn";
import type { ServiceStatusKind } from "./ServiceStatus";

export interface HealthIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: ServiceStatusKind;
  label?: string;
  size?: "sm" | "md";
}

/** A minimal pulsing-dot health indicator, for compact service lists and nav badges. */
export const HealthIndicator = React.forwardRef<HTMLSpanElement, HealthIndicatorProps>(
  ({ status, label, size = "md", className, ...props }, ref) => {
    const config = getStatusConfig(status);
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label ?? config.label}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      >
        <span className="relative flex" style={{ width: size === "sm" ? 6 : 8, height: size === "sm" ? 6 : 8 }}>
          {config.animated && (
            <span
              className="absolute inline-flex size-full animate-ping rounded-full opacity-60"
              style={{ backgroundColor: `var(--pc-status-${config.role})` }}
            />
          )}
          <span
            className="relative inline-flex size-full rounded-full"
            style={{ backgroundColor: `var(--pc-status-${config.role})` }}
          />
        </span>
        {label !== "" && <span className="text-xs text-fg-secondary">{label ?? config.label}</span>}
      </span>
    );
  },
);
HealthIndicator.displayName = "HealthIndicator";
