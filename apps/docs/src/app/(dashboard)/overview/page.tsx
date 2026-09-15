"use client";

import { CheckCircle2, Clock, Rocket, TrendingDown, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, DeploymentCard, MetricCard } from "@pipecraft/ui";
import {
  BuildDurationChart,
  DeploymentFrequencyChart,
  IncidentHistoryChart,
  SuccessRateChart,
} from "@pipecraft/charts";
import { PageHeader } from "@/components/page-header";
import {
  activeDeploymentsCount,
  buildDurationData,
  deploymentFrequencyData,
  deployments,
  incidentHistoryData,
  successRateData,
} from "@/lib/mock-data";

export default function OverviewPage() {
  return (
    <div>
      <PageHeader title="Overview" description="Fleet-wide CI/CD health across every repository and environment." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Deployment frequency" value="6.4/day" icon={Rocket} trend={{ value: "+12%", direction: "up" }} />
        <MetricCard label="Success rate" value="94.2%" icon={CheckCircle2} trend={{ value: "+2.1%", direction: "up" }} />
        <MetricCard
          label="Failure rate"
          value="5.8%"
          icon={TrendingDown}
          trend={{ value: "-1.4%", direction: "down", sentiment: "negative" }}
        />
        <MetricCard label="Avg. build time" value="4m 42s" icon={Timer} trend={{ value: "-8%", direction: "down", sentiment: "negative" }} />
        <MetricCard label="MTTR" value="18m" icon={Clock} trend={{ value: "-22%", direction: "down", sentiment: "negative" }} />
        <MetricCard label="Active deployments" value={activeDeploymentsCount} icon={Rocket} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Deployment frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <DeploymentFrequencyChart data={deploymentFrequencyData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Build duration</CardTitle>
          </CardHeader>
          <CardContent>
            <BuildDurationChart data={buildDurationData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success / failure rate</CardTitle>
          </CardHeader>
          <CardContent>
            <SuccessRateChart data={successRateData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Incident history</CardTitle>
          </CardHeader>
          <CardContent>
            <IncidentHistoryChart data={incidentHistoryData} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-fg-primary">Recent deployments</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {deployments.slice(0, 6).map((d) => (
            <DeploymentCard key={d.id} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}
