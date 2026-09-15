import * as React from "react";
import { GitBranch } from "lucide-react";
import { cn } from "../../lib/cn";

export interface BranchBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  branch: string;
  isDefault?: boolean;
}

export const BranchBadge = React.forwardRef<HTMLSpanElement, BranchBadgeProps>(
  ({ branch, isDefault, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border-default bg-surface px-1.5 py-0.5 font-mono text-xs text-fg-secondary",
        isDefault && "border-status-accent-border bg-status-accent-bg text-status-accent",
        className,
      )}
      {...props}
    >
      <GitBranch className="size-3" aria-hidden />
      {branch}
    </span>
  ),
);
BranchBadge.displayName = "BranchBadge";
