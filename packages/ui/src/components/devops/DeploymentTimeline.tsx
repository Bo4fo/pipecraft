import * as React from "react";
import { getStatusConfig } from "@pipecraft/tokens";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";
import { statusIconMap } from "../../lib/status-icons";
import { EnvironmentBadge, type EnvironmentKind } from "./EnvironmentBadge";
import { CommitHash } from "./CommitHash";
import type { DeploymentStatusKind } from "./DeploymentStatus";

export interface DeploymentTimelineEvent {
  id: string;
  environment: EnvironmentKind | (string & {});
  status: DeploymentStatusKind;
  commitHash: string;
  deployedAt: string;
  description?: string;
}

export interface DeploymentTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events: DeploymentTimelineEvent[];
}

export const DeploymentTimeline = React.forwardRef<HTMLDivElement, DeploymentTimelineProps>(
  ({ events, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col", className)} {...props}>
      {events.map((event, index) => {
        const config = getStatusConfig(event.status);
        const Icon = statusIconMap[config.icon];
        const isLast = index === events.length - 1;
        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="flex size-6 shrink-0 items-center justify-center rounded-full border"
                style={{
                  color: `var(--pc-status-${config.role})`,
                  borderColor: `var(--pc-status-${config.role}-border)`,
                  backgroundColor: `var(--pc-status-${config.role}-bg)`,
                }}
              >
                {Icon && <Icon className={cn("size-3.5", config.animated && "animate-pc-spin")} aria-hidden />}
              </div>
              {!isLast && <div className="w-px flex-1 bg-border-default" />}
            </div>
            <div className="min-w-0 flex-1 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                <EnvironmentBadge environment={event.environment} />
                <CommitHash hash={event.commitHash} />
                <span className="text-xs text-fg-tertiary">{formatRelativeTime(event.deployedAt)}</span>
              </div>
              {event.description && <p className="mt-1 text-sm text-fg-secondary">{event.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  ),
);
DeploymentTimeline.displayName = "DeploymentTimeline";
