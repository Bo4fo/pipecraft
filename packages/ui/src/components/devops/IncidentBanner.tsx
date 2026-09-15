import * as React from "react";
import { AlertOctagon } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";

export type IncidentSeverity = "critical" | "major" | "minor";

export interface IncidentBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  severity: IncidentSeverity;
  startedAt: string;
  affectedServices?: string[];
  resolved?: boolean;
}

const severityClass: Record<IncidentSeverity, string> = {
  critical: "border-status-danger-border bg-status-danger-bg text-status-danger",
  major: "border-status-warning-border bg-status-warning-bg text-status-warning",
  minor: "border-status-info-border bg-status-info-bg text-status-info",
};

export const IncidentBanner = React.forwardRef<HTMLDivElement, IncidentBannerProps>(
  ({ title, severity, startedAt, affectedServices, resolved, className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3",
        resolved ? "border-border-default bg-subtle text-fg-secondary" : severityClass[severity],
        className,
      )}
      {...props}
    >
      <AlertOctagon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-fg-primary">{title}</p>
          <span className="rounded-full bg-white/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
            {resolved ? "Resolved" : severity}
          </span>
        </div>
        <p className="mt-0.5 text-xs opacity-80">
          Started {formatRelativeTime(startedAt)}
          {affectedServices && affectedServices.length > 0 && <> &middot; Affects {affectedServices.join(", ")}</>}
        </p>
      </div>
    </div>
  ),
);
IncidentBanner.displayName = "IncidentBanner";
