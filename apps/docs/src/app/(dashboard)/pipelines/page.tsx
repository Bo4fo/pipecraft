"use client";

import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  BranchBadge,
  BuildStatus,
  CommitHash,
  EnvironmentBadge,
  formatDuration,
  formatRelativeTime,
} from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { pipelineRuns } from "@/lib/mock-data";

const triggerLabel: Record<string, string> = {
  push: "Push",
  pull_request: "Pull request",
  manual: "Manual",
  schedule: "Scheduled",
};

export default function PipelinesPage() {
  return (
    <div>
      <PageHeader title="Pipelines" description="Every pipeline run across all repositories, newest first." />

      <div className="overflow-hidden rounded-lg border border-border-default bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-subtle text-xs text-fg-tertiary">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Status</th>
              <th className="px-3 py-2 text-left font-medium">Repository</th>
              <th className="px-3 py-2 text-left font-medium">Branch / Commit</th>
              <th className="px-3 py-2 text-left font-medium">Author</th>
              <th className="px-3 py-2 text-left font-medium">Environment</th>
              <th className="px-3 py-2 text-left font-medium">Trigger</th>
              <th className="px-3 py-2 text-left font-medium">Duration</th>
              <th className="px-3 py-2 text-left font-medium">Started</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {pipelineRuns.map((run) => (
              <tr key={run.id} className="transition-colors hover:bg-subtle/60">
                <td className="px-3 py-2.5">
                  <BuildStatus status={run.status} />
                </td>
                <td className="px-3 py-2.5">
                  <Link href={`/pipelines/${run.id}`} className="font-mono text-xs text-fg-accent hover:underline">
                    {run.repository}
                  </Link>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <BranchBadge branch={run.branch} />
                    <CommitHash hash={run.commitHash} />
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="size-5">
                      <AvatarFallback className="text-[10px]">{run.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-fg-secondary">{run.author.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <EnvironmentBadge environment={run.environment} />
                </td>
                <td className="px-3 py-2.5 text-xs text-fg-tertiary">{triggerLabel[run.trigger]}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-fg-tertiary">
                  {run.durationMs ? formatDuration(run.durationMs) : "—"}
                </td>
                <td className="px-3 py-2.5 text-xs text-fg-tertiary">{formatRelativeTime(run.startedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
