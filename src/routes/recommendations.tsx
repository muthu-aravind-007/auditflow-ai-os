import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";
import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/recommendations")({
  component: RecommendationsPage,
  head: () => ({
    meta: [
      { title: "Recommendations — AuditFlow" },
      { name: "description", content: "AI-generated business improvement feed, prioritized by impact and effort." },
    ],
  }),
});

type Reco = {
  id: string;
  priority: "P0" | "P1" | "P2";
  tag: "Conversion" | "Trust" | "UX" | "SEO" | "Brand" | "A11Y";
  impact: string;
  business: string;
  effort: "S" | "M" | "L";
  title: string;
  detail: string;
  where: string;
};

const recos: Reco[] = [
  { id: "R-024", priority: "P0", tag: "Conversion", impact: "+18%", business: "Revenue", effort: "S", title: "Promote single primary CTA on /pricing", detail: "Visitors hesitate between three equal-weight CTAs. Collapse to one primary action and demote 'Talk to sales' to a text link.", where: "/pricing" },
  { id: "R-023", priority: "P0", tag: "Trust", impact: "+9%", business: "Revenue", effort: "S", title: "Surface customer logos above the fold", detail: "Proof sits at 1840px depth. 71% of mobile sessions never reach it.", where: "global · home" },
  { id: "R-022", priority: "P0", tag: "Trust", impact: "Enterprise", business: "Pipeline", effort: "S", title: "Add SOC 2 badge to pricing footer", detail: "Enterprise buyers expect compliance signal within the first 60s scan.", where: "/pricing" },
  { id: "R-021", priority: "P1", tag: "UX", impact: "Clarity", business: "Activation", effort: "M", title: "Rewrite hero subhead to name ICP", detail: "Current copy describes capability without naming the buyer. Recommend benefit-led variant tested against ICP.", where: "/" },
  { id: "R-020", priority: "P1", tag: "Conversion", impact: "+6%", business: "Revenue", effort: "M", title: "Reduce demo form from 9 fields to 4", detail: "Each field beyond 4 reduces submit rate by 4–7%.", where: "/contact" },
  { id: "R-019", priority: "P1", tag: "SEO", impact: "+3 pos.", business: "Acquisition", effort: "S", title: "Add FAQ schema to 6 product pages", detail: "Existing FAQ content lacks structured data; rich snippet eligible.", where: "/product/*" },
  { id: "R-018", priority: "P1", tag: "A11Y", impact: "Compliance", business: "Risk", effort: "M", title: "Fix contrast on muted text components", detail: "14 components fail WCAG AA. Raise muted token by 6L*.", where: "global · tokens" },
  { id: "R-017", priority: "P2", tag: "Brand", impact: "Polish", business: "Perception", effort: "S", title: "Consolidate radius scale to 4/6/10", detail: "5 distinct radius values detected. Recommend a 3-step scale.", where: "global" },
];

const counts = [
  { p: "P0", tone: "danger" as const, n: 3, label: "Ship this week" },
  { p: "P1", tone: "warning" as const, n: 4, label: "This sprint" },
  { p: "P2", tone: "accent" as const, n: 17, label: "Backlog" },
];

const byTag = [
  { tag: "Conversion", n: 7, lift: "+24%" },
  { tag: "Trust", n: 5, lift: "+11%" },
  { tag: "UX", n: 6, lift: "+8%" },
  { tag: "SEO", n: 4, lift: "+5 pos." },
  { tag: "A11Y", n: 2, lift: "compliance" },
];

function RecommendationsPage() {
  return (
    <ConsoleLayout
      title="Recommendations"
      eyebrow="AI improvement feed"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot /> 24 actions · ranked by expected lift
          </span>
          <span>Cumulative est. lift if shipped: +11.4% conversion</span>
          <span>Median time to ship: 2.3d</span>
        </>
      }
      actions={
        <>
          <GhostButton>Send to Linear</GhostButton>
          <GhostButton>Send to Notion</GhostButton>
          <GhostButton>Export CSV</GhostButton>
        </>
      }
    >
      {/* Priority + tag counts */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <SectionCard>
          <PanelHeader title="By priority" meta="3 buckets" />
          <div className="grid grid-cols-3 gap-px bg-border">
            {counts.map((c) => (
              <div key={c.p} className="bg-card p-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <StatusDot tone={c.tone} />
                  <span className="text-mono text-[11px] uppercase tracking-wider text-muted-foreground">{c.p}</span>
                </div>
                <div className="mt-1 text-[24px] font-medium tabular-nums">{c.n}</div>
                <div className="text-[11px] text-muted-foreground">{c.label}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <PanelHeader title="By dimension" meta="business impact" />
          <div className="grid grid-cols-5 gap-px bg-border">
            {byTag.map((t) => (
              <div key={t.tag} className="bg-card p-4">
                <div className="text-mono mb-1 text-[10.5px] uppercase tracking-wider text-muted-foreground">{t.tag}</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[20px] font-medium tabular-nums">{t.n}</span>
                  <span className="text-mono text-[11px] text-accent">{t.lift}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Feed */}
      <SectionCard>
        <PanelHeader title="Recommendation feed" meta="24 actions" right="sorted by priority + expected lift" />
        <div className="grid grid-cols-[50px_60px_110px_1fr_120px_110px_60px_90px] gap-3 border-b border-hairline px-5 py-2 text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          <div>#</div>
          <div>Pri</div>
          <div>Dimension</div>
          <div>Recommendation</div>
          <div>Business</div>
          <div className="text-right">Impact</div>
          <div className="text-right">Effort</div>
          <div className="text-right">Action</div>
        </div>
        {recos.map((r, i) => (
          <div
            key={r.id}
            className="grid grid-cols-[50px_60px_110px_1fr_120px_110px_60px_90px] items-start gap-3 border-b border-hairline px-5 py-3 last:border-0 hover:bg-surface/40"
          >
            <div className="text-mono pt-0.5 text-[11px] tabular-nums text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="pt-0.5">
              <Pill tone={r.priority === "P0" ? "danger" : r.priority === "P1" ? "warning" : "accent"}>
                {r.priority}
              </Pill>
            </div>
            <div className="pt-0.5">
              <Pill>{r.tag}</Pill>
            </div>
            <div>
              <div className="text-[13px] font-medium">{r.title}</div>
              <div className="text-[12px] text-muted-foreground">{r.detail}</div>
              <div className="text-mono mt-1 text-[10.5px] text-muted-foreground">
                where · {r.where}
              </div>
            </div>
            <div className="pt-0.5 text-[12px]">{r.business}</div>
            <div className="text-mono pt-0.5 text-right text-[13.5px] font-medium tabular-nums text-accent">
              {r.impact}
            </div>
            <div className="text-mono pt-0.5 text-right text-[12.5px] tabular-nums">{r.effort}</div>
            <div className="flex justify-end">
              <GhostButton>Open →</GhostButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </ConsoleLayout>
  );
}
