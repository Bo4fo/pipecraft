import * as React from "react";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";
import { Avatar, AvatarFallback, AvatarImage } from "../core/Avatar";
import { CommitHash } from "./CommitHash";
import { BranchBadge } from "./BranchBadge";

export interface CommitCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hash: string;
  message: string;
  author: { name: string; avatarUrl?: string };
  branch?: string;
  timestamp: string;
}

export const CommitCard = React.forwardRef<HTMLDivElement, CommitCardProps>(
  ({ hash, message, author, branch, timestamp, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-start gap-3 rounded-lg border border-border-default bg-surface p-3", className)} {...props}>
      <Avatar>
        <AvatarImage src={author.avatarUrl} alt={author.name} />
        <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg-primary">{message}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-tertiary">
          <span>{author.name}</span>
          <span>&middot;</span>
          <CommitHash hash={hash} />
          {branch && <BranchBadge branch={branch} />}
          <span>&middot;</span>
          <span>{formatRelativeTime(timestamp)}</span>
        </div>
      </div>
    </div>
  ),
);
CommitCard.displayName = "CommitCard";
