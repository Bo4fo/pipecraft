import type { PipelineStageData } from "@pipecraft/ui";

export interface Author {
  name: string;
  avatarUrl?: string;
}

export interface PipelineRun {
  id: string;
  repository: string;
  branch: string;
  commitHash: string;
  commitMessage: string;
  author: Author;
  status: "success" | "failed" | "running" | "queued" | "cancelled";
  environment: "production" | "staging" | "preview";
  trigger: "push" | "pull_request" | "manual" | "schedule";
  durationMs: number;
  startedAt: string;
  stages: PipelineStageData[];
}

const authors: Author[] = [
  { name: "Ama Owusu" },
  { name: "Kwame Asante" },
  { name: "Priya Nair" },
  { name: "Marcus Lee" },
  { name: "Sofia Rossi" },
  { name: "Daniel Kim" },
];

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function buildStages(overallStatus: PipelineRun["status"]): PipelineStageData[] {
  const order: PipelineStageData["status"][] =
    overallStatus === "success"
      ? ["success", "success", "success", "success", "success"]
      : overallStatus === "failed"
        ? ["success", "success", "failed", "skipped", "skipped"]
        : overallStatus === "running"
          ? ["success", "success", "running", "queued", "queued"]
          : overallStatus === "cancelled"
            ? ["success", "cancelled", "cancelled", "cancelled", "cancelled"]
            : ["queued", "queued", "queued", "queued", "queued"];

  const names = ["Build", "Test", "Security Scan", "Deploy", "Verify"];
  const stepNames = [
    ["Install dependencies", "Compile", "Bundle assets"],
    ["Unit tests", "Integration tests", "Coverage report"],
    ["Dependency audit", "SAST scan", "Container scan"],
    ["Push image", "Apply manifests", "Health check"],
    ["Smoke tests", "Synthetic monitors"],
  ];

  return names.map((name, i) => ({
    id: `stage-${i}`,
    name,
    status: order[i]!,
    durationMs: order[i] === "queued" ? undefined : 30_000 + i * 15_000,
    steps: stepNames[i]!.map((stepName, j) => ({
      id: `stage-${i}-step-${j}`,
      name: stepName,
      status: order[i] === "running" && j === stepNames[i]!.length - 1 ? "running" : order[i]!,
      durationMs: order[i] === "queued" ? undefined : 8_000 + j * 4_000,
    })),
  }));
}

const repos = ["pipecraft/api-gateway", "pipecraft/web-console", "pipecraft/billing-service", "pipecraft/worker-fleet"];
const branches = ["main", "release/2.4", "feat/edge-caching", "fix/webhook-retry", "chore/deps"];
const statuses: PipelineRun["status"][] = ["success", "failed", "running", "queued", "cancelled"];
const environments: PipelineRun["environment"][] = ["production", "staging", "preview"];
const triggers: PipelineRun["trigger"][] = ["push", "pull_request", "manual", "schedule"];

export const pipelineRuns: PipelineRun[] = Array.from({ length: 24 }).map((_, i) => {
  const status = statuses[i % statuses.length]!;
  return {
    id: `run-${1000 + i}`,
    repository: repos[i % repos.length]!,
    branch: branches[i % branches.length]!,
    commitHash: Math.random().toString(16).slice(2, 10).padEnd(8, "0"),
    commitMessage: [
      "Fix webhook retry backoff",
      "Add edge cache invalidation",
      "Bump dependency versions",
      "Improve cold start latency",
      "Refactor billing reconciliation job",
      "Add rate limiter to gateway",
    ][i % 6]!,
    author: authors[i % authors.length]!,
    status,
    environment: environments[i % environments.length]!,
    trigger: triggers[i % triggers.length]!,
    durationMs: status === "queued" ? 0 : 120_000 + (i % 5) * 45_000,
    startedAt: minutesAgo(i * 17 + 3),
    stages: buildStages(status),
  };
});

export const activeDeploymentsCount = pipelineRuns.filter((r) => r.status === "running").length;

export interface DeploymentRecord {
  id: string;
  environment: "production" | "staging" | "preview";
  status: "queued" | "deploying" | "success" | "failed" | "cancelled";
  commitHash: string;
  branch: string;
  triggeredBy: string;
  deployedAt: string;
  durationMs?: number;
}

export const deployments: DeploymentRecord[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `dep-${2000 + i}`,
  environment: environments[i % environments.length]!,
  status: (["success", "success", "deploying", "failed", "success", "queued"] as const)[i % 6]!,
  commitHash: Math.random().toString(16).slice(2, 10),
  branch: branches[i % branches.length]!,
  triggeredBy: authors[i % authors.length]!.name,
  deployedAt: minutesAgo(i * 34 + 5),
  durationMs: 60_000 + (i % 4) * 20_000,
}));

export const deploymentTimelineEvents = deployments.slice(0, 6).map((d) => ({
  id: d.id,
  environment: d.environment,
  status: d.status as "queued" | "deploying" | "success" | "failed" | "cancelled",
  commitHash: d.commitHash,
  deployedAt: d.deployedAt,
  description: `Deployed to ${d.environment} by ${d.triggeredBy}`,
}));

export interface EnvironmentRecord {
  id: string;
  name: string;
  environment: "production" | "staging" | "preview" | "development";
  status: "healthy" | "degraded" | "offline" | "deploying";
  url?: string;
  commitHash: string;
  deployedAt: string;
}

export const environmentRecords: EnvironmentRecord[] = [
  { id: "env-prod", name: "Production", environment: "production", status: "healthy", url: "https://app.pipecraft.dev", commitHash: "a1b2c3d", deployedAt: minutesAgo(12) },
  { id: "env-staging", name: "Staging", environment: "staging", status: "deploying", url: "https://staging.pipecraft.dev", commitHash: "e4f5a6b", deployedAt: minutesAgo(2) },
  { id: "env-preview-142", name: "Preview #142", environment: "preview", status: "healthy", url: "https://pr-142.pipecraft.dev", commitHash: "c7d8e9f", deployedAt: minutesAgo(46) },
  { id: "env-dev", name: "Development", environment: "development", status: "degraded", commitHash: "1a2b3c4", deployedAt: minutesAgo(120) },
];

export interface ServiceRecord {
  id: string;
  name: string;
  description: string;
  status: "healthy" | "degraded" | "offline" | "deploying";
  latencyMs: number;
  uptimePercent: number;
}

const uptimeDayStatuses = (seed: number) =>
  Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86_400_000).toISOString().slice(0, 10),
    status: (i + seed) % 11 === 0 ? "degraded" : (i + seed) % 23 === 0 ? "down" : "up",
  })) as { date: string; status: "up" | "degraded" | "down" | "no-data" }[];

export const services: (ServiceRecord & { uptimeDays: ReturnType<typeof uptimeDayStatuses> })[] = [
  { id: "svc-api", name: "API Gateway", description: "Public REST + GraphQL edge", status: "healthy", latencyMs: 84, uptimePercent: 99.98, uptimeDays: uptimeDayStatuses(1) },
  { id: "svc-auth", name: "Auth Service", description: "OAuth2 / session issuance", status: "healthy", latencyMs: 41, uptimePercent: 99.99, uptimeDays: uptimeDayStatuses(2) },
  { id: "svc-billing", name: "Billing Service", description: "Invoicing and usage metering", status: "degraded", latencyMs: 310, uptimePercent: 99.71, uptimeDays: uptimeDayStatuses(3) },
  { id: "svc-worker", name: "Worker Fleet", description: "Async job processing", status: "healthy", latencyMs: 12, uptimePercent: 99.95, uptimeDays: uptimeDayStatuses(4) },
  { id: "svc-search", name: "Search Index", description: "Elasticsearch cluster", status: "offline", latencyMs: 0, uptimePercent: 97.12, uptimeDays: uptimeDayStatuses(5) },
];

export interface IncidentRecord {
  id: string;
  title: string;
  severity: "critical" | "major" | "minor";
  startedAt: string;
  affectedServices: string[];
  resolved: boolean;
}

export const incidents: IncidentRecord[] = [
  { id: "inc-1", title: "Elevated error rate on Search Index", severity: "major", startedAt: minutesAgo(38), affectedServices: ["Search Index"], resolved: false },
  { id: "inc-2", title: "Billing Service latency spike", severity: "minor", startedAt: minutesAgo(90), affectedServices: ["Billing Service"], resolved: false },
  { id: "inc-3", title: "Auth Service brief outage", severity: "critical", startedAt: minutesAgo(60 * 26), affectedServices: ["Auth Service"], resolved: true },
];

export interface RunnerRecord {
  id: string;
  name: string;
  status: "healthy" | "running" | "offline" | "pending";
  os: string;
  currentJob?: string;
}

export const runners: RunnerRecord[] = [
  { id: "runner-1", name: "gh-runner-01", status: "running", os: "ubuntu-22.04", currentJob: "api-gateway#4821 · test" },
  { id: "runner-2", name: "gh-runner-02", status: "healthy", os: "ubuntu-22.04" },
  { id: "runner-3", name: "gh-runner-03", status: "offline", os: "ubuntu-22.04" },
  { id: "runner-4", name: "macos-runner-01", status: "pending", os: "macos-14" },
];

export const queuedJobs = [
  { id: "job-1", name: "web-console#992 · build", status: "queued" as const, queuedAt: minutesAgo(1), runner: "gh-runner-02" },
  { id: "job-2", name: "worker-fleet#301 · deploy", status: "queued" as const, queuedAt: minutesAgo(3) },
  { id: "job-3", name: "billing-service#177 · security-scan", status: "running" as const, queuedAt: minutesAgo(6), runner: "gh-runner-01" },
];

export const artifacts = [
  { id: "artifact-1", name: "api-gateway-v2.4.1-linux-amd64.tar.gz", sizeBytes: 48_204_192, createdAt: minutesAgo(20) },
  { id: "artifact-2", name: "web-console-build-report.json", sizeBytes: 128_400, createdAt: minutesAgo(35) },
  { id: "artifact-3", name: "coverage-lcov.info", sizeBytes: 892_113, createdAt: minutesAgo(35) },
];

export const releases = [
  { version: "v2.4.1", name: "Edge caching improvements", publishedAt: minutesAgo(60 * 4), isLatest: true, notes: "Adds regional cache invalidation and fixes webhook retry backoff." },
  { version: "v2.4.0", name: "Billing reconciliation rewrite", publishedAt: minutesAgo(60 * 28), notes: "Reworks the nightly reconciliation job to run incrementally." },
  { version: "v2.4.0-rc.1", publishedAt: minutesAgo(60 * 30), isPrerelease: true },
];

// ---- Chart data ----

export const deploymentFrequencyData = Array.from({ length: 14 }).map((_, i) => ({
  day: new Date(Date.now() - (13 - i) * 86_400_000).toLocaleDateString("en-US", { weekday: "short" }),
  deployments: Math.max(1, Math.round(6 + Math.sin(i / 2) * 4 + (i % 3))),
}));

export const buildDurationData = Array.from({ length: 14 }).map((_, i) => ({
  day: new Date(Date.now() - (13 - i) * 86_400_000).toLocaleDateString("en-US", { weekday: "short" }),
  durationMinutes: Math.round(4 + Math.cos(i / 3) * 1.5 + (i % 2)),
}));

export const successRateData = Array.from({ length: 14 }).map((_, i) => ({
  day: new Date(Date.now() - (13 - i) * 86_400_000).toLocaleDateString("en-US", { weekday: "short" }),
  success: 88 + Math.round(Math.sin(i / 4) * 8),
}));

export const incidentHistoryData = [
  { month: "Apr", incidents: 4 },
  { month: "May", incidents: 2 },
  { month: "Jun", incidents: 5 },
  { month: "Jul", incidents: 1 },
  { month: "Aug", incidents: 3 },
  { month: "Sep", incidents: 2 },
];

export const buildsPerDayData = Array.from({ length: 7 }).map((_, i) => ({
  day: new Date(Date.now() - (6 - i) * 86_400_000).toLocaleDateString("en-US", { weekday: "short" }),
  builds: Math.max(3, Math.round(14 + Math.sin(i / 1.5) * 6)),
}));

// ---- Notifications ----

export interface NotificationRecord {
  id: string;
  variant: "danger" | "success" | "info";
  title: string;
  detail: string;
  time: string;
  read: boolean;
}

export const notifications: NotificationRecord[] = [
  { id: "n-1", variant: "danger", title: "Build failed", detail: "API Gateway #12 on develop", time: minutesAgo(10), read: false },
  { id: "n-2", variant: "success", title: "Deployment succeeded", detail: "Mobile Release #7 shipped to production", time: minutesAgo(60), read: false },
  { id: "n-3", variant: "info", title: "New comment", detail: "Priya Nair commented on Backend Oauth #1", time: minutesAgo(180), read: true },
  { id: "n-4", variant: "info", title: "Pipeline optimized", detail: "Backend Oauth build time reduced by 5%", time: minutesAgo(60 * 24), read: true },
  { id: "n-5", variant: "info", title: "Weekly report ready", detail: "PipeCraft Demo workspace summary", time: minutesAgo(60 * 48), read: true },
];

export const unreadNotificationCount = notifications.filter((n) => !n.read).length;

// ---- Integrations ----

export interface IntegrationRecord {
  id: string;
  name: string;
  category: string;
  connected: boolean;
  detail: string;
}

export const integrations: IntegrationRecord[] = [
  { id: "github", name: "GitHub", category: "Source control", connected: true, detail: "12 repositories linked" },
  { id: "gitlab", name: "GitLab", category: "Source control", connected: false, detail: "Not connected" },
  { id: "slack", name: "Slack", category: "Notifications", connected: true, detail: "Posting to #ci-cd" },
  { id: "dockerhub", name: "Docker Hub", category: "Container registry", connected: false, detail: "Not connected" },
  { id: "jira", name: "Jira", category: "Issue tracking", connected: true, detail: "Linked to OPS project" },
  { id: "pagerduty", name: "PagerDuty", category: "Incident alerts", connected: false, detail: "Not connected" },
];

// ---- Team ----

export interface TeamMemberRecord {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member" | "Viewer";
}

export const teamMembers: TeamMemberRecord[] = [
  { id: "t-1", name: "Ama Owusu", email: "ama@pipecraft.dev", role: "Owner" },
  { id: "t-2", name: "Kwame Asante", email: "kwame@pipecraft.dev", role: "Admin" },
  { id: "t-3", name: "Priya Nair", email: "priya@pipecraft.dev", role: "Member" },
  { id: "t-4", name: "Marcus Lee", email: "marcus@pipecraft.dev", role: "Member" },
  { id: "t-5", name: "Sofia Rossi", email: "sofia@pipecraft.dev", role: "Viewer" },
];

// ---- Analytics: highest failure rate ----

export const topFailingPipelines = [
  { name: "API Gateway", project: "Internal Tools", failRatePercent: 26 },
  { name: "Data Pipeline ETL", project: "Internal Tools", failRatePercent: 12 },
];
