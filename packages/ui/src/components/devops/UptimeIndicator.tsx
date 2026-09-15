import * as React from "react";
import { cn } from "../../lib/cn";

export type UptimeDayStatus = "up" | "degraded" | "down" | "no-data";

export interface UptimeIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  days: { date: string; status: UptimeDayStatus }[];
  uptimePercent?: number;
}

const barClass: Record<UptimeDayStatus, string> = {
  up: "bg-status-success",
  degraded: "bg-status-warning",
  down: "bg-status-danger",
  "no-data": "bg-border-default",
};

export const UptimeIndicator = React.forwardRef<HTMLDivElement, UptimeIndicatorProps>(
  ({ days, uptimePercent, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
      <div className="flex items-center gap-2">
        {days.map((day) => (
          <span
            key={day.date}
            title={`${day.date}: ${day.status}`}
            className={cn("h-6 flex-1 rounded-sm", barClass[day.status])}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-fg-tertiary">
        <span>{days.length} days ago</span>
        {typeof uptimePercent === "number" && <span className="font-mono">{uptimePercent.toFixed(2)}% uptime</span>}
        <span>Today</span>
      </div>
    </div>
  ),
);
UptimeIndicator.displayName = "UptimeIndicator";
