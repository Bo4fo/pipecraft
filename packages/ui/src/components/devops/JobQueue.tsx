import * as React from "react";
import { getStatusConfig } from "@pipecraft/tokens";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";
import { statusIconMap } from "../../lib/status-icons";
import { EmptyState } from "../core/EmptyState";
import type { PipelineStageStatus } from "@pipecraft/tokens";

export interface QueuedJob {
  id: string;
  name: string;
  status: PipelineStageStatus;
  queuedAt: string;
  runner?: string;
}

export interface JobQueueProps extends React.HTMLAttributes<HTMLDivElement> {
  jobs: QueuedJob[];
}

export const JobQueue = React.forwardRef<HTMLDivElement, JobQueueProps>(
  ({ jobs, className, ...props }, ref) => (
    <div ref={ref} className={cn("divide-y divide-border-subtle rounded-lg border border-border-default bg-surface", className)} {...props}>
      {jobs.length === 0 && <EmptyState title="Queue is empty" description="No jobs waiting to run." />}
      {jobs.map((job) => {
        const config = getStatusConfig(job.status);
        const Icon = statusIconMap[config.icon];
        return (
          <div key={job.id} className="flex items-center gap-3 px-3 py-2.5">
            {Icon && (
              <Icon
                className={cn("size-4 shrink-0", config.animated && "animate-pc-spin")}
                style={{ color: `var(--pc-status-${config.role})` }}
                aria-hidden
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-fg-primary">{job.name}</p>
              <p className="text-xs text-fg-tertiary">
                {config.label} &middot; queued {formatRelativeTime(job.queuedAt)}
                {job.runner && <> &middot; {job.runner}</>}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ),
);
JobQueue.displayName = "JobQueue";
