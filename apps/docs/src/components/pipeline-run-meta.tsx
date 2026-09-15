"use client";

import {
  Avatar,
  AvatarFallback,
  BranchBadge,
  CommitHash,
  EnvironmentBadge,
  formatDuration,
  formatRelativeTime,
} from "@pipecraft/ui";
import type { PipelineRun } from "@/lib/mock-data";

export function PipelineRunMeta({ run }: { run: PipelineRun }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border-default bg-surface px-4 py-3 text-xs text-fg-tertiary">
      <div className="flex items-center gap-1.5">
        <Avatar className="size-5">
          <AvatarFallback className="text-[10px]">{run.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-fg-secondary">{run.author.name}</span>
      </div>
      <BranchBadge branch={run.branch} />
      <CommitHash hash={run.commitHash} />
      <span className="max-w-xs truncate text-fg-secondary">{run.commitMessage}</span>
      <EnvironmentBadge environment={run.environment} />
      <span>Started {formatRelativeTime(run.startedAt)}</span>
      {run.durationMs > 0 && <span className="font-mono">{formatDuration(run.durationMs)}</span>}
    </div>
  );
}
