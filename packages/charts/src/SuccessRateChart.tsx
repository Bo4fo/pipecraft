import * as React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export interface SuccessRatePoint {
  day: string;
  success: number;
}

export function SuccessRateChart({ data, height = 220 }: { data: SuccessRatePoint[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--pc-border-subtle)" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--pc-fg-tertiary)" }} axisLine={{ stroke: "var(--pc-border-default)" }} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--pc-fg-tertiary)" }} axisLine={false} tickLine={false} unit="%" />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--pc-border-strong)", strokeWidth: 1 }} />
        <Line
          type="monotone"
          dataKey="success"
          name="Success rate"
          stroke="var(--pc-status-success)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
