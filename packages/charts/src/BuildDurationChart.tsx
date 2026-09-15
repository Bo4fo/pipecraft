import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export interface BuildDurationPoint {
  day: string;
  durationMinutes: number;
}

export function BuildDurationChart({ data, height = 220 }: { data: BuildDurationPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="pc-build-duration" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--pc-status-accent)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--pc-status-accent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--pc-border-subtle)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--pc-fg-tertiary)" }} axisLine={{ stroke: "var(--pc-border-default)" }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "var(--pc-fg-tertiary)" }} axisLine={false} tickLine={false} unit="m" />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--pc-border-strong)", strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="durationMinutes"
          name="Avg. build time"
          stroke="var(--pc-status-accent)"
          fill="url(#pc-build-duration)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
