"use client";

import { DeploymentCard } from "@pipecraft/ui";
import { ApiTable, ComponentDocHeader, ComponentPreview, Section, Snippet } from "@/components/docs/doc-sections";

export default function DeploymentCardDocPage() {
  return (
    <div>
      <ComponentDocHeader
        name="DeploymentCard"
        description="A compact summary card for a single deployment: environment, status, commit, branch, who triggered it, and when."
      />

      <ComponentPreview>
        <div className="w-full max-w-sm">
          <DeploymentCard
            id="dep-2041"
            environment="production"
            status="success"
            commitHash="a1b2c3d"
            branch="main"
            triggeredBy="Ama Owusu"
            deployedAt={new Date(Date.now() - 12 * 60_000).toISOString()}
            durationMs={84_000}
          />
        </div>
      </ComponentPreview>

      <Section title="Installation">
        <Snippet language="bash" code={"npm install @pipecraft/ui"} />
      </Section>

      <Section title="Usage">
        <Snippet
          code={`import { DeploymentCard } from "@pipecraft/ui";

<DeploymentCard
  id="dep-2041"
  environment="production"
  status="success"
  commitHash="a1b2c3d"
  branch="main"
  triggeredBy="Ama Owusu"
  deployedAt="2026-09-15T09:12:00Z"
  durationMs={84000}
/>`}
        />
      </Section>

      <Section title="API">
        <ApiTable
          rows={[
            { name: "id", type: "string", description: "Deployment identifier." },
            { name: "environment", type: '"production" | "staging" | "preview" | string', description: "Target environment." },
            { name: "status", type: '"queued" | "deploying" | "success" | "failed" | "cancelled"', description: "Deployment lifecycle state." },
            { name: "commitHash", type: "string", description: "Git commit SHA (rendered truncated)." },
            { name: "branch", type: "string", description: "Source branch." },
            { name: "triggeredBy", type: "string", description: "Actor who triggered the deployment." },
            { name: "deployedAt", type: "string", description: "ISO timestamp, rendered as relative time." },
            { name: "durationMs", type: "number", description: "Optional deployment duration." },
          ]}
        />
      </Section>
    </div>
  );
}
