"use client";

import { CheckCircle2, Rocket, Timer, Workflow } from "lucide-react";
import { Badge, Card, CardContent, CardHeader, CardTitle, MetricCard } from "@pipecraft/ui";
import { BuildsPerDayChart } from "@pipecraft/charts";
import { PageHeader } from "@/components/page-header";
import { buildsPerDayData, topFailingPipelines } from "@/lib/mock-data";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Last 7 days across all projects." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Success rate" value="94%" icon={CheckCircle2} />
        <MetricCard label="Avg. build time" value="4m 12s" icon={Timer} />
        <MetricCard label="Deployments" value="23" icon={Rocket} />
        <MetricCard label="Active pipelines" value="6" icon={Workflow} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Builds per day</CardTitle>
          </CardHeader>
          <CardContent>
            <BuildsPerDayChart data={buildsPerDayData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Highest failure rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-3">
            {topFailingPipelines.map((p) => (
              <div key={p.name} className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-fg-primary">{p.name}</p>
                  <p className="text-xs text-fg-tertiary">{p.project}</p>
                </div>
                <Badge variant="danger">{p.failRatePercent}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
