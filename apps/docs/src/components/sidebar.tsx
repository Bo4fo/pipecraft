"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  GitBranch,
  LayoutDashboard,
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

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border-default bg-surface">
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3.5">
        <Link href="/overview" className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-accent-1 text-accent-fg">
            <GitBranch className="size-3.5" />
          </span>
          <span className="text-sm font-semibold text-fg-primary">PipeCraft</span>
        </Link>
        <ThemeToggle />
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-fg-secondary transition-colors",
                "hover:bg-subtle hover:text-fg-primary",
                active && "bg-subtle text-fg-primary",
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1">{item.label}</span>
              {!!item.badge && (
                <span className="flex size-4 items-center justify-center rounded-full bg-accent-1 text-[10px] font-semibold text-accent-fg">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-border-subtle p-3">
        <Link href="/components" className="block text-xs text-fg-tertiary hover:text-fg-accent">
          Component docs &rarr;
        </Link>
        <Link href="/login" className="block text-xs text-fg-tertiary hover:text-fg-accent">
          Log out
        </Link>
      </div>
    </aside>
  );
}
