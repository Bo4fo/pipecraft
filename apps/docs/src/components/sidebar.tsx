"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  GitBranch,
  LayoutDashboard,
  LogOut,
  LoaderCircle,
  Plug,
  Rocket,
  Server,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import { cn } from "@pipecraft/ui";
import { unreadNotificationCount } from "@/lib/mock-data";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/pipelines", label: "Pipelines", icon: Workflow },
  { href: "/deployments", label: "Deployments", icon: Rocket },
  { href: "/environments", label: "Environments", icon: Boxes },
  { href: "/services", label: "Services", icon: Server },
  { href: "/monitoring", label: "Monitoring", icon: Activity },
  { href: "/incidents", label: "Incidents", icon: AlertTriangle },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/notifications", label: "Notifications", icon: Bell, badge: unreadNotificationCount },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/team", label: "Team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  return (
    <aside className="flex h-screen w-16 shrink-0 flex-col border-r border-border-default bg-surface md:w-56">
      <div className="flex flex-col items-center justify-between gap-3 border-b border-border-subtle px-4 py-3.5 md:flex-row md:gap-0">
        <Link href="/overview" aria-label="PipeCraft overview" className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent-1 text-accent-fg">
            <GitBranch className="size-3.5" />
          </span>
          <span className="hidden text-sm font-semibold text-fg-primary md:inline">PipeCraft</span>
        </Link>
        <ThemeToggle />
      </div>
      <nav aria-label="Main navigation" className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          const loading = isPending && pendingPath === item.href;
          const Icon = loading ? LoaderCircle : item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
              title={item.label}
              aria-busy={loading}
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                setPendingPath(item.href);
                startTransition(() => router.push(item.href));
              }}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-fg-secondary transition-colors",
                "hover:bg-subtle hover:text-fg-primary",
                (active || loading) && "bg-subtle text-fg-primary",
              )}
            >
              <Icon className={cn("size-4 shrink-0", loading && "animate-spin motion-reduce:animate-none")} />
              <span className="hidden flex-1 md:inline">{item.label}</span>
              {!!item.badge && (
                <span className="hidden size-4 items-center justify-center rounded-full bg-accent-1 text-[10px] font-semibold text-accent-fg md:flex">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-border-subtle p-3">
        <Link href="/login" aria-label="Log out" title="Log out" className="flex items-center gap-2 px-2 text-xs text-fg-tertiary hover:text-fg-accent">
          <LogOut className="size-4" /><span className="hidden md:inline">Log out</span>
        </Link>
      </div>
    </aside>
  );
}
