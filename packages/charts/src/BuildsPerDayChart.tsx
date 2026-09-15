import * as React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export interface BuildsPerDayPoint {
  day: string;
  builds: number;
}

export function BuildsPerDayChart({ data, height = 220 }: { data: BuildsPerDayPoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--pc-border-subtle)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--pc-fg-tertiary)" }} axisLine={{ stroke: "var(--pc-border-default)" }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "var(--pc-fg-tertiary)" }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--pc-bg-subtle)" }} />
        <Bar dataKey="builds" name="Builds" fill="var(--pc-accent-1)" radius={[4, 4, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
