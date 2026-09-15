import * as React from "react";
import type { TooltipProps } from "recharts";

export function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-md border border-border-default bg-surface-raised px-2.5 py-1.5 text-xs shadow-lg">
      <p className="mb-1 font-medium text-fg-primary">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-1.5 text-fg-secondary">
          <span className="size-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-mono text-fg-primary">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}
