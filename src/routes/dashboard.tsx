import { createFileRoute } from "@tanstack/react-router";
import { StatusDot } from "@/components/auditflow/Brand";
import { ConsoleLayout, GhostButton } from "@/components/auditflow/ConsoleLayout";
import { AuditPreview } from "@/components/auditflow/AuditPreview";
import {
  RecommendationsFeed,
  CompetitorMatrix,
  WorkflowTimeline,
} from "@/components/auditflow/Sections";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Console — AuditFlow" },
      { name: "description", content: "AuditFlow operations console." },
    ],
  }),
});

function Dashboard() {
  return (
    <ConsoleLayout
      title="linear.app — full intelligence run"
      eyebrow="Active audit"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot /> Running · step 4 of 7
          </span>
          <span>Started 14:22 UTC</span>
          <span>Operator: M. Chen</span>
        </>
      }
      actions={
        <>
          <GhostButton>Export</GhostButton>
          <GhostButton>Share</GhostButton>
          <GhostButton>Re-run</GhostButton>
        </>
      }
    >
      {/* KPI strip */}
      <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-5">
        {[
          { k: "Overall score", v: "74", s: "B+", tone: "accent" },
          { k: "Critical findings", v: "6", s: "−2 vs last", tone: "warning" },
          { k: "Recommendations", v: "24", s: "ranked", tone: "muted" },
          { k: "Est. lift", v: "+11.4%", s: "conversion", tone: "accent" },
          { k: "Time to ship", v: "2.3d", s: "median", tone: "muted" },
        ].map((m) => (
          <div key={m.k} className="bg-card p-4">
            <div className="text-mono mb-1.5 text-[10.5px] uppercase tracking-wider text-muted-foreground">
              {m.k}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-medium tracking-tight tabular-nums">{m.v}</span>
              <span
                className={`text-mono text-[10.5px] ${
                  m.tone === "accent"
                    ? "text-accent"
                    : m.tone === "warning"
                    ? "text-warning"
                    : "text-muted-foreground"
                }`}
              >
                {m.s}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <AuditPreview />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <RecommendationsFeed />
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-mono mb-3 text-[10.5px] uppercase tracking-wider text-muted-foreground">
            Run timeline
          </div>
          <WorkflowTimeline />
        </div>
      </div>

      <CompetitorMatrix />
    </ConsoleLayout>
  );
}
