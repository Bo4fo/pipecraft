import * as React from "react";
import { cn } from "../../lib/cn";
import { Card, CardContent, CardHeader, CardTitle } from "../core/Card";
import { ServiceStatus, type ServiceStatusKind } from "./ServiceStatus";
import { UptimeIndicator, type UptimeDayStatus } from "./UptimeIndicator";

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description?: string;
  status: ServiceStatusKind;
  latencyMs?: number;
  uptimeDays?: { date: string; status: UptimeDayStatus }[];
  uptimePercent?: number;
}

export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ name, description, status, latencyMs, uptimeDays, uptimePercent, className, ...props }, ref) => (
    <Card ref={ref} className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <ServiceStatus status={status} />
      </CardHeader>
      <CardContent className="pt-3">
        {description && <p className="mb-3 text-sm text-fg-secondary">{description}</p>}
        {typeof latencyMs === "number" && (
          <p className="mb-3 font-mono text-xs text-fg-tertiary">{latencyMs}ms p95 latency</p>
        )}
        {uptimeDays && <UptimeIndicator days={uptimeDays} uptimePercent={uptimePercent} />}
      </CardContent>
    </Card>
  ),
);
ServiceCard.displayName = "ServiceCard";
