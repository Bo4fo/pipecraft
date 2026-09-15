import * as React from "react";
import { GitMerge, GitPullRequest, GitPullRequestClosed } from "lucide-react";
import { cn } from "../../lib/cn";

export type PullRequestState = "open" | "merged" | "closed" | "draft";

export interface PullRequestBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  number: number;
  state: PullRequestState;
}

const stateConfig: Record<PullRequestState, { icon: React.ElementType; className: string; label: string }> = {
  open: { icon: GitPullRequest, className: "text-status-success bg-status-success-bg border-status-success-border", label: "Open" },
  draft: { icon: GitPullRequest, className: "text-fg-tertiary bg-subtle border-border-default", label: "Draft" },
  merged: { icon: GitMerge, className: "text-status-accent bg-status-accent-bg border-status-accent-border", label: "Merged" },
  closed: { icon: GitPullRequestClosed, className: "text-status-danger bg-status-danger-bg border-status-danger-border", label: "Closed" },
};

export const PullRequestBadge = React.forwardRef<HTMLSpanElement, PullRequestBadgeProps>(
  ({ number, state, className, ...props }, ref) => {
    const { icon: Icon, className: stateClassName, label } = stateConfig[state];
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-xs font-medium", stateClassName, className)}
        {...props}
      >
        <Icon className="size-3" aria-hidden />
        #{number} {label}
      </span>
    );
  },
);
PullRequestBadge.displayName = "PullRequestBadge";
