import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  PrimaryButton,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";
import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/audit-runs")({
  component: AuditRunsPage,
  head: () => ({
    meta: [
      { title: "Audit runs — AuditFlow" },
      { name: "description", content: "Active queue, history and failure handling for AuditFlow scans." },
    ],
  }),
});

type Run = {
  id: string;
  url: string;
  status: "running" | "queued" | "complete" | "failed";
  progress: number;
  step: string;
  score?: number;
  duration: string;
  started: string;
  operator: string;
  findings?: number;
};

const queue: Run[] = [
  {
    id: "AR-4821",
    url: "linear.app",
    status: "running",
    progress: 58,
    step: "Conversion paths (4/7)",
    duration: "01:42",
    started: "14:22 UTC",
    operator: "M. Chen",
  },
  {
    id: "AR-4820",
    url: "framer.com/pricing",
    status: "running",
    progress: 21,
    step: "Visual capture (2/7)",
    duration: "00:31",
    started: "14:38 UTC",
    operator: "Auto · webhook",
  },
  {
    id: "AR-4819",
    url: "vercel.com",
    status: "queued",
    progress: 0,
    step: "Awaiting renderer",
    duration: "—",
    started: "—",
    operator: "M. Chen",
  },
  {
    id: "AR-4818",
    url: "supabase.com",
    status: "queued",
    progress: 0,
    step: "Awaiting renderer",
    duration: "—",
    started: "—",
    operator: "P. Okafor",
  },
];

const history: Run[] = [
  {
    id: "AR-4817",
    url: "notion.so",
    status: "complete",
    progress: 100,
    step: "Report ready",
    score: 86,
    duration: "02:14",
    started: "13:02 UTC",
    operator: "P. Okafor",
    findings: 18,
  },
  {
    id: "AR-4816",
    url: "raycast.com",
    status: "complete",
    progress: 100,
    step: "Report ready",
    score: 91,
    duration: "01:58",
    started: "12:41 UTC",
    operator: "M. Chen",
    findings: 12,
  },
  {
    id: "AR-4815",
    url: "stripe.com/atlas",
    status: "complete",
    progress: 100,
    step: "Report ready",
    score: 78,
    duration: "02:33",
    started: "11:50 UTC",
    operator: "Auto · cron",
    findings: 27,
  },
  {
    id: "AR-4814",
    url: "linear.app/method",
    status: "failed",
    progress: 41,
    step: "Visual capture timeout",
    duration: "00:48",
    started: "11:12 UTC",
    operator: "M. Chen",
  },
  {
    id: "AR-4813",
    url: "arc.net",
    status: "complete",
    progress: 100,
    step: "Report ready",
    score: 84,
    duration: "01:46",
    started: "10:30 UTC",
    operator: "M. Chen",
    findings: 22,
  },
];

function StatusCell({ status }: { status: Run["status"] }) {
  const map = {
    running: { tone: "warning" as const, label: "Running" },
    queued: { tone: "muted" as const, label: "Queued" },
    complete: { tone: "accent" as const, label: "Complete" },
    failed: { tone: "danger" as const, label: "Failed" },
  };
  const { tone, label } = map[status];
  return (
    <span className="flex items-center gap-1.5">
      <StatusDot tone={tone} />
      <span className="text-[12px]">{label}</span>
    </span>
  );
}

function ProgressBar({ value, status }: { value: number; status: Run["status"] }) {
  const color =
    status === "failed"
      ? "bg-danger"
      : status === "complete"
      ? "bg-accent"
      : status === "running"
      ? "bg-warning"
      : "bg-white/15";
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function AuditRunsPage() {
  return (
    <ConsoleLayout
      title="Audit runs"
      eyebrow="Operations"
      meta={
        <>
          <span>2 running · 2 queued · 38 completed today</span>
          <span>Renderer pool: 6 / 8 workers</span>
        </>
      }
      actions={
        <>
          <GhostButton>Filters</GhostButton>
          <GhostButton>Schedules</GhostButton>
          <PrimaryButton>Run new audit</PrimaryButton>
        </>
      }
    >
      {/* New audit composer */}
      <SectionCard className="mb-6">
        <PanelHeader title="Run new audit" meta="composer" right="⌘ + N" />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <div className="bg-card p-4">
            <div className="text-mono mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Target URL
            </div>
            <div className="flex items-center gap-2 rounded-md border border-hairline bg-surface px-2.5 py-1.5">
              <span className="text-mono text-[11px] text-muted-foreground">https://</span>
              <span className="text-[13px] text-foreground">yourbrand.com</span>
            </div>
          </div>
          <div className="bg-card p-4">
            <div className="text-mono mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Scope
            </div>
            <div className="text-[13px]">Full crawl · 142 pages</div>
          </div>
          <div className="bg-card p-4">
            <div className="text-mono mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Viewports
            </div>
            <div className="text-[13px]">375 · 768 · 1440</div>
          </div>
          <div className="bg-card p-4">
            <div className="text-mono mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Competitor set
            </div>
            <div className="text-[13px]">5 peers · SaaS</div>
          </div>
          <div className="flex items-center justify-end gap-2 bg-card p-4">
            <GhostButton>Save preset</GhostButton>
            <PrimaryButton>Launch</PrimaryButton>
          </div>
        </div>
      </SectionCard>

      {/* Active queue */}
      <SectionCard className="mb-6">
        <PanelHeader title="Active queue" meta="2 running · 2 queued" tone="warning" right="auto-refresh 5s" />
        <div className="grid grid-cols-[110px_1.7fr_120px_1.6fr_90px_1fr_90px] gap-3 border-b border-hairline px-5 py-2 text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          <div>Run</div>
          <div>Target</div>
          <div>Status</div>
          <div>Step / progress</div>
          <div className="text-right">Elapsed</div>
          <div>Operator</div>
          <div className="text-right">Action</div>
        </div>
        {queue.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[110px_1.7fr_120px_1.6fr_90px_1fr_90px] items-center gap-3 border-b border-hairline px-5 py-3 last:border-0 hover:bg-surface/40"
          >
            <div className="text-mono text-[11.5px] text-muted-foreground">{r.id}</div>
            <div className="truncate text-[12.5px]">{r.url}</div>
            <StatusCell status={r.status} />
            <div>
              <div className="mb-1.5 flex items-center justify-between text-[11.5px]">
                <span className="text-muted-foreground">{r.step}</span>
                <span className="text-mono tabular-nums text-foreground/80">{r.progress}%</span>
              </div>
              <ProgressBar value={r.progress} status={r.status} />
            </div>
            <div className="text-mono text-right text-[11.5px] tabular-nums text-muted-foreground">
              {r.duration}
            </div>
            <div className="truncate text-[12px] text-muted-foreground">{r.operator}</div>
            <div className="flex justify-end">
              <GhostButton>{r.status === "queued" ? "Promote" : "Open"}</GhostButton>
            </div>
          </div>
        ))}
      </SectionCard>

      {/* History */}
      <SectionCard className="mb-6">
        <PanelHeader title="Completed history" meta="last 24h · 38 runs" right="export CSV" />
        <div className="grid grid-cols-[110px_1.7fr_120px_70px_90px_90px_1fr_90px] gap-3 border-b border-hairline px-5 py-2 text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          <div>Run</div>
          <div>Target</div>
          <div>Status</div>
          <div className="text-right">Score</div>
          <div className="text-right">Findings</div>
          <div className="text-right">Duration</div>
          <div>Operator</div>
          <div className="text-right">Action</div>
        </div>
        {history.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[110px_1.7fr_120px_70px_90px_90px_1fr_90px] items-center gap-3 border-b border-hairline px-5 py-3 last:border-0 hover:bg-surface/40"
          >
            <div className="text-mono text-[11.5px] text-muted-foreground">{r.id}</div>
            <div className="truncate text-[12.5px]">{r.url}</div>
            <StatusCell status={r.status} />
            <div
              className={`text-mono text-right text-[12.5px] tabular-nums ${
                r.score && r.score >= 85
                  ? "text-accent"
                  : r.score && r.score >= 70
                  ? "text-foreground/85"
                  : r.score
                  ? "text-warning"
                  : "text-muted-foreground"
              }`}
            >
              {r.score ?? "—"}
            </div>
            <div className="text-mono text-right text-[11.5px] text-muted-foreground tabular-nums">
              {r.findings ?? "—"}
            </div>
            <div className="text-mono text-right text-[11.5px] tabular-nums text-muted-foreground">
              {r.duration}
            </div>
            <div className="truncate text-[12px] text-muted-foreground">{r.operator}</div>
            <div className="flex justify-end gap-1.5">
              {r.status === "failed" && <Pill tone="danger">retry</Pill>}
              <GhostButton>Open</GhostButton>
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Failures panel */}
      <SectionCard>
        <PanelHeader title="Failure inbox" meta="1 unresolved" tone="danger" right="auto-retry policy: 2 attempts" />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          <div className="bg-card p-5">
            <div className="text-mono mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              AR-4814 · linear.app/method
            </div>
            <div className="mb-2 text-[13px] font-medium">Visual capture timeout</div>
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              Renderer exceeded 30s on viewport 1440. Likely heavy client animation. Recommend lowering
              capture concurrency or extending budget to 45s.
            </p>
            <div className="mt-3 flex gap-2">
              <GhostButton>Retry</GhostButton>
              <GhostButton>Adjust budget</GhostButton>
            </div>
          </div>
          <div className="bg-card p-5">
            <div className="text-mono mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              Renderer pool
            </div>
            <div className="space-y-2">
              {[
                { name: "edge-fra-01", load: 88 },
                { name: "edge-fra-02", load: 72 },
                { name: "edge-iad-01", load: 41 },
                { name: "edge-iad-02", load: 0 },
              ].map((w) => (
                <div key={w.name}>
                  <div className="mb-0.5 flex items-center justify-between text-[11.5px]">
                    <span className="text-mono text-muted-foreground">{w.name}</span>
                    <span className="text-mono tabular-nums text-foreground/80">{w.load}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full ${
                        w.load > 80 ? "bg-warning" : w.load > 0 ? "bg-accent" : "bg-white/15"
                      }`}
                      style={{ width: `${Math.max(2, w.load)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card p-5">
            <div className="text-mono mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              Auto-retry policy
            </div>
            <ul className="space-y-1.5 text-[12.5px] text-muted-foreground">
              <li>· 2 attempts before failure surfaces</li>
              <li>· Backoff: 30s, 120s</li>
              <li>· Skip on 4xx target responses</li>
              <li>· Alert operator after 3 consecutive failures</li>
            </ul>
          </div>
        </div>
      </SectionCard>
    </ConsoleLayout>
  );
}
