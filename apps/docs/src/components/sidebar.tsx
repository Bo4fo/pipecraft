"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Boxes,
  GitBranch,
  LayoutDashboard,
  Rocket,
  Server,
  Settings,
  Workflow,
} from "lucide-react";
import { cn } from "@pipecraft/ui";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/pipelines", label: "Pipelines", icon: Workflow },
  { href: "/deployments", label: "Deployments", icon: Rocket },
  { href: "/environments", label: "Environments", icon: Boxes },
  { href: "/services", label: "Services", icon: Server },
  { href: "/monitoring", label: "Monitoring", icon: Activity },
  { href: "/incidents", label: "Incidents", icon: AlertTriangle },
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
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border-subtle p-3">
        <Link href="/components" className="text-xs text-fg-tertiary hover:text-fg-accent">
          Component docs &rarr;
        </Link>
      </div>
    </aside>
  );
}
