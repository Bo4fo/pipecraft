import * as React from "react";
import { Inbox } from "lucide-react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col items-center justify-center gap-2 px-6 py-10 text-center", className)}
      {...props}
    >
      <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-subtle text-fg-tertiary">
        {icon ?? <Inbox className="size-5" />}
      </div>
      <p className="text-sm font-medium text-fg-primary">{title}</p>
      {description && <p className="max-w-sm text-xs text-fg-tertiary">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = "EmptyState";
