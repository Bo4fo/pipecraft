"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@pipecraft/ui";
import { componentCategories, componentRegistry } from "@/lib/component-registry";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-border-default px-3 py-6">
      <Link href="/overview" className="mb-6 block text-xs text-fg-tertiary hover:text-fg-accent">
        &larr; Back to dashboard
      </Link>
      {componentCategories.map((category) => (
        <div key={category} className="mb-5">
          <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-fg-tertiary">{category}</p>
          <nav className="space-y-0.5">
            {componentRegistry
              .filter((c) => c.category === category)
              .map((c) => {
                const href = `/components/${c.slug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={c.slug}
                    href={c.documented ? href : "/components"}
                    aria-disabled={!c.documented}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors",
                      c.documented ? "text-fg-secondary hover:bg-subtle hover:text-fg-primary" : "text-fg-disabled",
                      active && "bg-subtle text-fg-primary",
                    )}
                  >
                    {c.name}
                    {!c.documented && <span className="text-[10px]">soon</span>}
                  </Link>
                );
              })}
          </nav>
        </div>
      ))}
    </aside>
  );
}
