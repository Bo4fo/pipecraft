import * as React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";
import { EnvironmentBadge, type EnvironmentKind } from "./EnvironmentBadge";
import { CommitHash } from "./CommitHash";
import type { ServiceStatusKind } from "./ServiceStatus";
import { ServiceStatus } from "./ServiceStatus";

export interface EnvironmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  environment: EnvironmentKind | (string & {});
  status: ServiceStatusKind;
  url?: string;
  commitHash?: string;
  deployedAt?: string;
}

export const EnvironmentCard = React.forwardRef<HTMLDivElement, EnvironmentCardProps>(
  ({ name, environment, status, url, commitHash, deployedAt, className, ...props }, ref) => (
    <Card ref={ref} className={cn(className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{name}</CardTitle>
          <EnvironmentBadge environment={environment} />
        </div>
        <ServiceStatus status={status} />
      </CardHeader>
      <CardContent className="flex items-center justify-between pt-3 text-xs text-fg-tertiary">
        <div className="flex items-center gap-2">
          {commitHash && <CommitHash hash={commitHash} />}
          {deployedAt && <span>{formatRelativeTime(deployedAt)}</span>}
        </div>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg-accent hover:underline">
            Visit <ExternalLink className="size-3" />
          </a>
        )}
      </CardContent>
    </Card>
  ),
);
EnvironmentCard.displayName = "EnvironmentCard";
