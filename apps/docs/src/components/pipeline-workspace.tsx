"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronDown, Circle, GitBranch, Github, Layers, LoaderCircle, Maximize2, Minimize2, PanelBottom, Terminal, X, XCircle } from "lucide-react";
import { BuildLog, formatDuration, type PipelineStageStatus } from "@pipecraft/ui";
import type { PipelineRun } from "@/lib/mock-data";
import { generateStepLogs } from "@/lib/mock-logs";
import { ProfilePicture } from "./profile-picture";

type Node = { id: string; name: string; status: PipelineStageStatus; column: number; row: number; duration?: number; progress?: number; detail: string };

const referenceNodes: Node[] = [
  { id: "build", name: "Backend- Build", status: "success", column: 1, row: 1, duration: 83000, detail: "Tests approved: 10" },
  { id: "auth", name: "Backend- Authentications", status: "success", column: 1, row: 2, duration: 503000, detail: "Tests approved: 10" },
  { id: "oauth", name: "Backend- Oauth", status: "success", column: 1, row: 3, duration: 203000, detail: "Tests approved: 10" },
  { id: "jwt", name: "Backend- jwt-Token", status: "success", column: 1, row: 4, duration: 83000, detail: "Tests approved: 10" },
  { id: "test-one", name: "Running Test One-Build", status: "running", column: 2, row: 1, progress: 58, detail: "Progress" },
  { id: "auth-test", name: "Backend- Authentications", status: "success", column: 2, row: 2, duration: 323000, detail: "Success" },
  { id: "test-two", name: "Running Test Two-Build", status: "running", column: 3, row: 1, progress: 81, detail: "Progress" },
  { id: "test-three", name: "Running Test Three-Build", status: "success", column: 4, row: 1, detail: "Success" },
  { id: "deployment", name: "Deployment", status: "queued", column: 5, row: 1, detail: "Waiting for tests" },
];

function StatusIcon({ status }: { status: PipelineStageStatus }) {
  if (status === "running") return <LoaderCircle className="animate-spin" />;
  if (status === "success") return <CheckCircle2 />;
  if (status === "failed") return <XCircle />;
  return <Circle />;
}

export function PipelineWorkspace({ run, runs }: { run?: PipelineRun; runs: PipelineRun[] }) {
  const router = useRouter();
  const [title, setTitle] = useState(run ? `${run.repository.split("/").pop()} #${run.id.replace("run-", "")}` : "Backend Oauth #1");
  const [branch, setBranch] = useState(run?.branch ?? "Master");
  const [selectedId, setSelectedId] = useState<string | null>(run ? null : "auth-test");
  const [logsOpen, setLogsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [simulation, setSimulation] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const editDialog = useRef<HTMLDialogElement>(null);

  const initialNodes = useMemo<Node[]>(() => run ? run.stages.flatMap((stage, column) => [
    { id: stage.id, name: stage.name, status: stage.status, column: column + 1, row: 1, duration: stage.durationMs, progress: stage.status === "running" ? 64 : undefined, detail: stage.status === "success" ? "Success" : stage.status === "running" ? "Progress" : stage.status },
    ...(stage.steps ?? []).map((step, row) => ({ id: step.id, name: step.name, status: step.status, column: column + 1, row: row + 2, duration: step.durationMs, detail: step.status === "success" ? "Success" : step.status })),
  ]) : referenceNodes, [run]);

  const nodes = useMemo(() => initialNodes.map((node) => {
    if (simulation === null) return node;
    const status = node.column < simulation ? "success" : node.column === simulation ? "running" : "queued";
    return { ...node, status: status as PipelineStageStatus, progress: status === "running" ? 58 : undefined, detail: status === "running" ? "Progress" : status === "success" ? "Success" : "Waiting" };
  }), [initialNodes, simulation]);
  const selected = nodes.find((node) => node.id === selectedId);
  const status = simulation !== null ? simulation > 5 ? "success" : "running" : run?.status ?? "running";
  const runningDemo = simulation !== null && simulation <= 5;
  const logLines = useMemo(() => {
    if (!selected) return [];
    if (selected.status === "queued") return [{ id: "waiting", content: "Waiting for upstream stages. No logs yet." }];
    return generateStepLogs(selected.name, selected.status);
  }, [selected]);

  useEffect(() => {
    if (!runningDemo) return;
    const timer = window.setInterval(() => setSimulation((value) => (value ?? 0) + 1), 1600);
    return () => window.clearInterval(timer);
  }, [runningDemo]);

  useEffect(() => {
    if (simulation === 6) setNotice("Demo run completed successfully.");
  }, [simulation]);

  return (
    <section className="pipeline-workspace" aria-label="Pipeline workspace">
      <div className="pipeline-summary">
        <div className="pipeline-breadcrumb">
          <Link href="/overview">Home</Link><span>/</span><span>{run?.repository.split("/")[0] ?? "Open Source Project"}</span><span>/</span><span className="pipeline-breadcrumb-current">{title}</span>
          <div className="pipeline-run-picker">
            <select aria-label="Choose pipeline run" value={run?.id ?? "featured"} onChange={(event) => router.push(event.target.value === "featured" ? "/pipelines" : `/pipelines/${event.target.value}`)}>
              <option value="featured">Featured pipeline</option>
              {runs.map((item) => <option key={item.id} value={item.id}>{item.repository.split("/").pop()} · {item.id} · {item.status}</option>)}
            </select>
            <ChevronDown size={12} aria-hidden />
          </div>
        </div>

        <div className="pipeline-title-row">
          <div className="pipeline-title-group"><h1>{title}</h1><span className={`pipeline-status-pill status-${status}`}><StatusIcon status={status} />{status}</span></div>
          <div className="pipeline-actions">
            <button className="pipeline-button" onClick={() => editDialog.current?.showModal()}>Edit Pipeline</button>
            <button className="pipeline-button primary" disabled={runningDemo} onClick={() => { setSimulation(1); setNotice("Running a demo pipeline…"); }}>{runningDemo ? "Running…" : "Run"}</button>
          </div>
        </div>

        <div className="pipeline-meta-grid">
          <div className="pipeline-meta-card"><span className="pipeline-meta-label">Status</span><span className={`pipeline-meta-status status-${status}`}><StatusIcon status={status} />{status}</span></div>
          <div className="pipeline-meta-card pipeline-timing">
            <div className="pipeline-timing-labels"><span>In queue</span><span>Running time</span><span>Optimized <b>On</b></span></div>
            <div className="pipeline-timing-bars"><i /><i><b style={{ width: simulation !== null ? `${Math.min(simulation, 5) * 20}%` : "74%" }} /></i></div>
            <div className="pipeline-timing-values"><span>{run ? "—" : "1m 23s"}</span><span>{run ? formatDuration(run.durationMs) : "50m"}</span><span>{run ? "—" : "-5%"}<ChevronDown size={10} /></span></div>
          </div>
          <div className="pipeline-meta-card"><span className="pipeline-meta-label">Branch</span><span className="pipeline-meta-value"><GitBranch size={13} />{branch}</span></div>
          <div className="pipeline-meta-card"><span className="pipeline-meta-label">Triggered by</span><span className="pipeline-meta-value"><ProfilePicture name={run?.author.name ?? "Derrick Agyapong"} size={17} variant={1} /><span>{run?.author.name ?? "Derrick Agyapong"}</span></span></div>
          <div className="pipeline-meta-card"><span className="pipeline-meta-label">Repository</span><a className="pipeline-meta-value" href={`https://github.com/${run?.repository ?? "Derrick/Open-Source-Project-Oauth"}`} target="_blank" rel="noreferrer"><Github size={17} /><span>{run?.repository ?? "github.com/Derrick/Open-Source-Project-Oauth/"}</span></a></div>
          <div className="pipeline-meta-card"><span className="pipeline-meta-label">Collaborators <ChevronDown size={10} /></span><Link href="/team" className="pipeline-collaborators" aria-label="View pipeline collaborators">{["Ama Owusu", "Kwame Asante", "Marcus Lee", "Sofia Rossi"].map((name, index) => <ProfilePicture key={name} name={name} size={19} variant={index} />)}<span>+2</span></Link></div>
          <button className="pipeline-panel-toggle" aria-label={logsOpen ? "Hide log panel" : "Show log panel"} aria-pressed={logsOpen} onClick={() => { setLogsOpen(!logsOpen); if (!selectedId) setSelectedId(nodes[0]?.id ?? null); }}><PanelBottom size={18} /></button>
        </div>
        <p className="pipeline-notice" role="status">{notice}</p>
      </div>

      <div className="pipeline-canvas" aria-label="Pipeline stages">
        <div className="pipeline-graph" style={{ gridTemplateColumns: `repeat(${Math.max(run?.stages.length ?? 5, 1)}, minmax(0, 1fr))` }}>
          <svg className="pipeline-connections" viewBox="0 0 1200 458" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 68 18 H 1040" />
            {!run && <><path d="M 68 136 H 252" /><path d="M 68 254 C 175 267 178 136 252 136" /><path d="M 68 372 C 178 409 174 136 252 136" /></>}
          </svg>
          {nodes.map((node) => (
            <button key={node.id} className={`pipeline-node status-${node.status} ${selectedId === node.id ? "is-selected" : ""} ${node.id === "test-three" ? "is-highlighted" : ""}`} style={{ gridColumn: node.column, gridRow: node.row, "--node-progress": `${node.progress ?? 0}%` } as React.CSSProperties} aria-pressed={selectedId === node.id} aria-label={`${node.name}, ${node.status}${node.duration ? `, ${formatDuration(node.duration)}` : ""}`} onClick={() => { setSelectedId(node.id); setLogsOpen(true); }}>
              <span className="pipeline-node-top"><StatusIcon status={node.status} />{node.duration && <span>{formatDuration(node.duration)}</span>}{node.id === "test-three" && <Layers className="pipeline-node-layers" />}</span>
              <span className="pipeline-node-name">{node.name}</span>
              <span className="pipeline-node-detail">{node.detail}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`pipeline-log-dock ${expanded ? "is-expanded" : ""} ${logsOpen ? "is-open" : ""}`}>
        <div className="pipeline-log-toolbar">
          <span><Terminal size={13} />{logsOpen && selected ? selected.name : "Select a stage to view logs"}</span>
          <div>{logsOpen && <button aria-label={expanded ? "Restore log panel" : "Expand log panel"} onClick={() => setExpanded(!expanded)}>{expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>}{logsOpen && <button aria-label="Close log panel" onClick={() => { setLogsOpen(false); setExpanded(false); }}><X size={16} /></button>}</div>
        </div>
        {logsOpen && selected && <BuildLog key={selected.id} jobName={selected.name} lines={logLines} className="pipeline-build-log" />}
      </div>

      <dialog ref={editDialog} className="pipeline-edit-dialog" aria-labelledby="pipeline-edit-title">
        <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setTitle(String(data.get("name")).trim()); setBranch(String(data.get("branch")).trim()); editDialog.current?.close(); setNotice("Pipeline details updated for this session."); }}>
          <div className="pipeline-dialog-heading"><h2 id="pipeline-edit-title">Edit pipeline</h2><button type="button" aria-label="Close edit pipeline" onClick={() => editDialog.current?.close()}><X size={18} /></button></div>
          <label htmlFor="pipeline-name">Pipeline name</label><input id="pipeline-name" name="name" defaultValue={title} key={title} required pattern=".*\S.*" />
          <label htmlFor="pipeline-branch">Branch</label><input id="pipeline-branch" name="branch" defaultValue={branch} key={branch} required pattern=".*\S.*" />
          <p>Changes apply to this demo session.</p>
          <div className="pipeline-actions"><button type="button" className="pipeline-button" onClick={() => editDialog.current?.close()}>Cancel</button><button className="pipeline-button primary" type="submit">Save changes</button></div>
        </form>
      </dialog>
    </section>
  );
}
