import * as React from "react";
import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";
import { Card } from "../core/Card";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down" | "flat";
    /** Whether an upward trend is good (e.g. success rate) or bad (e.g. failure rate). Defaults to good. */
    sentiment?: "positive" | "negative";
  };
  description?: string;
}

export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, icon: Icon, trend, description, className, ...props }, ref) => {
    const trendIsGood =
      trend && (trend.sentiment === "negative" ? trend.direction === "down" : trend.direction === "up");
    return (
      <Card ref={ref} className={cn("p-4", className)} {...props}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-fg-tertiary">{label}</p>
          {Icon && <Icon className="size-4 text-fg-tertiary" aria-hidden />}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold tabular-nums text-fg-primary">{value}</p>
          {trend && trend.direction !== "flat" && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                trendIsGood ? "text-status-success" : "text-status-danger",
              )}
            >
              {trend.direction === "up" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
              {trend.value}
            </span>
          )}
        </div>
        {description && <p className="mt-1 text-xs text-fg-tertiary">{description}</p>}
      </Card>
    );
  },
);
MetricCard.displayName = "MetricCard";
