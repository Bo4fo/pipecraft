"use client";

import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Button, cn, formatRelativeTime } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { notifications, unreadNotificationCount } from "@/lib/mock-data";

const iconByVariant = {
  danger: AlertCircle,
  success: CheckCircle2,
  info: Info,
} as const;

const colorByVariant = {
  danger: "text-status-danger",
  success: "text-status-success",
  info: "text-fg-tertiary",
} as const;

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description={`${unreadNotificationCount} unread`}
        actions={<Button variant="outline" size="sm">Mark all read</Button>}
      />

      <div className="flex flex-col gap-1.5">
        {notifications.map((n) => {
          const Icon = iconByVariant[n.variant];
          return (
            <div
              key={n.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border border-border-default bg-surface px-4 py-3",
                !n.read && "border-l-2 border-l-accent-1",
              )}
            >
              <Icon className={cn("mt-0.5 size-4 shrink-0", colorByVariant[n.variant])} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-fg-primary">{n.title}</p>
                <p className="text-xs text-fg-tertiary">{n.detail}</p>
              </div>
              <span className="shrink-0 text-xs text-fg-tertiary">{formatRelativeTime(n.time)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
