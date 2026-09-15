import * as React from "react";
import { cn } from "../../lib/cn";
import { formatDuration, formatRelativeTime } from "../../lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";
import { EnvironmentBadge, type EnvironmentKind } from "./EnvironmentBadge";
import { CommitHash } from "./CommitHash";
import { BranchBadge } from "./BranchBadge";
import { DeploymentStatus, type DeploymentStatusKind } from "./DeploymentStatus";

export interface DeploymentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  environment: EnvironmentKind | (string & {});
  status: DeploymentStatusKind;
  commitHash: string;
  branch: string;
  triggeredBy: string;
  deployedAt: string;
  durationMs?: number;
}

export const DeploymentCard = React.forwardRef<HTMLDivElement, DeploymentCardProps>(
  ({ id, environment, status, commitHash, branch, triggeredBy, deployedAt, durationMs, className, ...props }, ref) => (
    <Card ref={ref} className={cn(className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="font-mono">{id}</CardTitle>
          <EnvironmentBadge environment={environment} />
        </div>
        <DeploymentStatus status={status} />
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-3 text-xs text-fg-tertiary">
        <CommitHash hash={commitHash} />
        <BranchBadge branch={branch} />
        <span>by {triggeredBy}</span>
        <span>&middot;</span>
        <span>{formatRelativeTime(deployedAt)}</span>
        {typeof durationMs === "number" && (
          <>
            <span>&middot;</span>
            <span className="font-mono">{formatDuration(durationMs)}</span>
          </>
        )}
      </CardContent>
    </Card>
  ),
);
DeploymentCard.displayName = "DeploymentCard";
