"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings } from "lucide-react";
import { unreadNotificationCount } from "@/lib/mock-data";
import { ProfilePicture } from "./profile-picture";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const section = pathname.split("/")[1] || "overview";
  const isPipeline = section === "pipelines";
  return (
    <div className={`flex min-w-0 flex-1 flex-col ${isPipeline ? "pipeline-shell" : ""}`}>
      <header className="dashboard-topbar flex h-16 shrink-0 items-center justify-between border-b border-border-subtle bg-surface px-6">
        <span className="text-lg font-semibold capitalize text-fg-primary">{section}</span>
        <div className="flex items-center gap-5">
          <Link href="/notifications" prefetch className="relative rounded-md p-1 text-fg-tertiary hover:text-fg-primary" aria-label={`Notifications, ${unreadNotificationCount} unread`}>
            <Bell className="size-[19px]" />
            {unreadNotificationCount > 0 && <span className="absolute right-1 top-1 size-2 rounded-full bg-red-400 ring-2 ring-surface" />}
          </Link>
          <Link href="/settings" prefetch className="rounded-md p-1 text-fg-tertiary hover:text-fg-primary" aria-label="Settings"><Settings className="size-5" /></Link>
          <Link href="/team" prefetch className="rounded-full ring-1 ring-white/10 transition-shadow hover:ring-2 hover:ring-indigo-400" aria-label="View profile and team">
            <ProfilePicture />
          </Link>
        </div>
      </header>
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className={isPipeline ? "h-full" : "mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8"}>{children}</div>
      </main>
    </div>
  );
}
