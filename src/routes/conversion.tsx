import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";
import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/conversion")({
  component: ConversionPage,
  head: () => ({
    meta: [
      { title: "Conversion intelligence — AuditFlow" },
      { name: "description", content: "Funnel friction, CTA effectiveness and lead capture analysis." },
    ],
  }),
});

const funnel = [
  { stage: "Land", visitors: 100, drop: 0 },
  { stage: "Engage", visitors: 71, drop: 29 },
  { stage: "Pricing view", visitors: 38, drop: 33 },
  { stage: "CTA click", visitors: 14, drop: 24 },
  { stage: "Form start", visitors: 9, drop: 5 },
  { stage: "Form submit", visitors: 5.2, drop: 3.8 },
];

const ctas = [
  { id: "CTA-01", label: "Start free trial", page: "/", role: "Primary", visibility: 92, weight: 71, clicks: "high" },
  { id: "CTA-02", label: "Get a demo", page: "/", role: "Secondary", visibility: 88, weight: 64, clicks: "med" },
  { id: "CTA-03", label: "Start free trial", page: "/pricing", role: "Primary", visibility: 64, weight: 48, clicks: "low" },
  { id: "CTA-04", label: "Talk to sales", page: "/pricing", role: "Secondary", visibility: 81, weight: 72, clicks: "med" },
  { id: "CTA-05", label: "Watch product tour", page: "/product", role: "Tertiary", visibility: 38, weight: 22, clicks: "low" },
];

const opportunities = [
  { tag: "Primary intent", impact: "+18%", title: "Promote single primary CTA on /pricing", note: "Visitors hesitate across three equal-weight CTAs. Demote 'Talk to sales' to text link." },
  { tag: "Trust", impact: "+9%", title: "Surface customer logos above the fold", note: "Proof currently at 1840px depth. 71% of mobile sessions never reach it." },
  { tag: "Form friction", impact: "+6%", title: "Reduce demo form from 9 fields to 4", note: "Predictive model: each additional field beyond 4 reduces submit rate by 4–7%." },
  { tag: "Decision support", impact: "+4%", title: "Add comparison anchor link in pricing nav", note: "76% of pricing visitors scroll past the comparison table without seeing it." },
];

function ConversionPage() {
  return (
    <ConsoleLayout
      title="Conversion intelligence"
      eyebrow="Funnel + CTA reasoning"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot tone="warning" /> Conversion score 61 · −3 vs prev
          </span>
          <span>12 flows traced · 4 drop-off points isolated</span>
          <span>Est. lift if shipped: +11.4%</span>
        </>
      }
      actions={
        <>
          <GhostButton>Path: trial signup</GhostButton>
          <GhostButton>Compare segment</GhostButton>
          <GhostButton>Export</GhostButton>
        </>
      }
    >
      {/* Funnel + insights */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <SectionCard>
          <PanelHeader title="Trial signup funnel" meta="last 7d · all sources" tone="warning" right="modelled drop-off" />
          <div className="p-5">
            <div className="space-y-3">
              {funnel.map((f, i) => (
                <div key={f.stage} className="grid grid-cols-[140px_1fr_70px_80px] items-center gap-4">
                  <div className="text-[12.5px]">
                    <span className="text-mono mr-2 text-[10.5px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    {f.stage}
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full ${i === 0 ? "bg-accent" : f.drop > 25 ? "bg-danger" : f.drop > 10 ? "bg-warning" : "bg-accent"}`}
                      style={{ width: `${f.visitors}%` }}
                    />
                  </div>
                  <div className="text-mono text-right text-[12px] tabular-nums text-foreground/85">{f.visitors}%</div>
                  <div
                    className={`text-mono text-right text-[11px] tabular-nums ${
                      f.drop > 25 ? "text-danger" : f.drop > 10 ? "text-warning" : "text-muted-foreground"
                    }`}
                  >
                    {i === 0 ? "—" : `−${f.drop}%`}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-md border border-hairline bg-surface p-3">
              <div className="mb-1 flex items-center gap-2">
                <Pill tone="danger">Critical drop</Pill>
                <span className="text-mono text-[10.5px] text-muted-foreground">stage 03 → 04</span>
              </div>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                The 33pt drop between pricing view and CTA click is the largest of the funnel. AI attributes
                ~60% of this to competing CTA visual weight and ambiguous plan differentiation copy.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <PanelHeader title="Engagement bottlenecks" meta="4 detected" right="ranked by lost intent" />
          <ul className="divide-y divide-hairline">
            {[
              { p: "/pricing", t: "Plan ambiguity", w: "−18%", n: "Visitors re-scroll comparison table 2.3× on average." },
              { p: "/product", t: "Tour CTA invisible on mobile", w: "−7%", n: "CTA hidden behind sticky nav at 375px width." },
              { p: "/contact", t: "Form length exceeds patience curve", w: "−6%", n: "9 fields; predicted abandonment after 4." },
              { p: "/", t: "Hero subhead lacks ICP", w: "−5%", n: "No buyer-naming tokens — generic value prop." },
            ].map((b, i) => (
              <li key={i} className="grid grid-cols-[80px_1fr_60px] items-start gap-3 px-5 py-3 hover:bg-surface/40">
                <div className="text-mono text-[11px] text-muted-foreground">{b.p}</div>
                <div>
                  <div className="text-[12.5px] font-medium">{b.t}</div>
                  <div className="text-[11.5px] text-muted-foreground">{b.n}</div>
                </div>
                <div className="text-mono text-right text-[12px] tabular-nums text-warning">{b.w}</div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* CTA effectiveness */}
      <SectionCard className="mb-6">
        <PanelHeader title="CTA effectiveness matrix" meta="5 primary surfaces" />
        <div className="grid grid-cols-[80px_1.4fr_100px_100px_1fr_1fr_80px_90px] gap-3 border-b border-hairline px-5 py-2 text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          <div>ID</div>
          <div>Label</div>
          <div>Page</div>
          <div>Role</div>
          <div>Visibility</div>
          <div>Visual weight</div>
          <div className="text-right">Click rate</div>
          <div className="text-right">Action</div>
        </div>
        {ctas.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-[80px_1.4fr_100px_100px_1fr_1fr_80px_90px] items-center gap-3 border-b border-hairline px-5 py-3 last:border-0 hover:bg-surface/40"
          >
            <div className="text-mono text-[11px] text-muted-foreground">{c.id}</div>
            <div className="text-[12.5px] font-medium">{c.label}</div>
            <div className="text-mono text-[11.5px] text-muted-foreground">{c.page}</div>
            <div className="text-[12px]">{c.role}</div>
            <Meter value={c.visibility} />
            <Meter value={c.weight} />
            <div
              className={`text-mono text-right text-[12px] tabular-nums ${
                c.clicks === "high" ? "text-accent" : c.clicks === "med" ? "text-foreground/85" : "text-warning"
              }`}
            >
              {c.clicks}
            </div>
            <div className="flex justify-end">
              <GhostButton>Inspect</GhostButton>
            </div>
          </div>
        ))}
      </SectionCard>

      {/* Opportunities */}
      <SectionCard>
        <PanelHeader title="Conversion opportunities" meta="ranked · expected lift" right="model: gpt-audit v4" />
        <ul className="divide-y divide-hairline">
          {opportunities.map((o, i) => (
            <li key={i} className="grid grid-cols-[40px_120px_1fr_100px_100px] items-start gap-3 px-5 py-3 hover:bg-surface/40">
              <div className="text-mono pt-0.5 text-[11px] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
              <Pill tone="accent">{o.tag}</Pill>
              <div>
                <div className="text-[13px] font-medium">{o.title}</div>
                <div className="text-[12px] text-muted-foreground">{o.note}</div>
              </div>
              <div className="text-mono text-right text-[14px] font-medium tabular-nums text-accent">{o.impact}</div>
              <div className="flex justify-end">
                <GhostButton>Open →</GhostButton>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </ConsoleLayout>
  );
}

function Meter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full ${value >= 80 ? "bg-accent" : value >= 60 ? "bg-warning" : "bg-danger"}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-mono w-7 text-right text-[11px] tabular-nums text-foreground/80">{value}</span>
    </div>
  );
}
