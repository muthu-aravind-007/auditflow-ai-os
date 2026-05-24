import { StatusDot } from "./Brand";

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="text-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">{index}</span>
      <span className="h-px flex-1 bg-hairline" />
      <span className="text-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">{title}</span>
    </div>
  );
}

export function IntelligenceGrid() {
  const modules = [
    { code: "WIE-01", title: "Website intelligence engine", desc: "Headless browser fleet captures the rendered DOM, computed styles, layout shifts and visual hierarchy across viewports." },
    { code: "UX-02", title: "AI UX analysis", desc: "Vision + heuristic models score legibility, affordance, hierarchy and friction against 140+ proven UX patterns." },
    { code: "CV-03", title: "Conversion detection", desc: "Path-aware reasoning surfaces drop-off CTAs, decision overload and trust gaps along the buyer journey." },
    { code: "SEO-04", title: "SEO & performance audit", desc: "Crawl, schema, semantic structure and Core Web Vitals — graded against the top 20 ranking peers in your niche." },
    { code: "TRT-05", title: "Trust & brand cohesion", desc: "Tone, proof density, social signal placement and visual consistency scored across every public surface." },
    { code: "REC-06", title: "AI recommendation engine", desc: "Findings are clustered into ranked, copy-ready actions with expected lift and implementation effort." },
  ];
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
      {modules.map((m) => (
        <div key={m.code} className="bg-background p-6 transition-colors hover:bg-surface">
          <div className="text-mono mb-4 text-[10.5px] uppercase tracking-wider text-muted-foreground">{m.code}</div>
          <h3 className="mb-2 text-[15px] font-medium tracking-tight">{m.title}</h3>
          <p className="text-[13px] leading-relaxed text-muted-foreground">{m.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function RecommendationsFeed() {
  const items = [
    { tag: "Conversion", impact: "+18%", title: "Promote single primary CTA on /pricing", detail: "Visitors hesitate between three equal-weight buttons. Collapse to one primary action and demote 'Talk to sales' to a text link.", effort: "S" },
    { tag: "Trust", impact: "+9%", title: "Surface customer logos above the fold", detail: "Proof currently sits at 1,840px depth. 71% of sessions never reach it on mobile.", effort: "S" },
    { tag: "UX", impact: "Clarity", title: "Rewrite hero subhead to specify ICP", detail: "Current copy describes capability without naming the buyer. Recommend benefit-led variant tested against your ICP.", effort: "M" },
    { tag: "SEO", impact: "+3 pos.", title: "Add FAQ schema to product pages", detail: "Six product pages have FAQ content but no structured data. Estimated +3 ranking positions in 30 days.", effort: "S" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <div className="flex items-center gap-2.5">
          <StatusDot />
          <span className="text-[13px] font-medium">AI recommendation feed</span>
          <span className="text-mono text-[11px] text-muted-foreground">· 24 actions · sorted by expected lift</span>
        </div>
        <div className="text-mono text-[11px] text-muted-foreground">Updated 2m ago</div>
      </div>
      <div className="divide-y divide-hairline">
        {items.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 px-5 py-4 transition-colors hover:bg-surface/60">
            <div className="text-mono col-span-1 pt-0.5 text-[11px] text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</div>
            <div className="col-span-7">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-[4px] border border-hairline bg-surface px-1.5 py-0.5 text-mono text-[10px] uppercase tracking-wider text-muted-foreground">{r.tag}</span>
                <span className="text-[13.5px] font-medium">{r.title}</span>
              </div>
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">{r.detail}</p>
            </div>
            <div className="col-span-2 flex flex-col">
              <span className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">Impact</span>
              <span className="text-[14px] font-medium text-accent">{r.impact}</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">Effort</span>
              <span className="text-[14px] font-medium">{r.effort}</span>
            </div>
            <div className="col-span-1 flex items-start justify-end">
              <button className="text-mono rounded-[4px] border border-border bg-surface px-2 py-1 text-[11px] text-foreground/80 transition-colors hover:bg-surface-elevated">
                Open →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompetitorMatrix() {
  const rows = [
    { name: "linear.app", scores: [92, 88, 86, 91, 84, 90] },
    { name: "yourbrand.com", scores: [74, 61, 88, 71, 54, 79], me: true },
    { name: "notion.so", scores: [89, 83, 90, 78, 88, 92] },
    { name: "vercel.com", scores: [94, 79, 92, 96, 81, 88] },
    { name: "stripe.com", scores: [96, 94, 91, 89, 96, 95] },
  ];
  const cols = ["UX", "CV", "SEO", "Perf", "Trust", "Brand"];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <div className="flex items-center gap-2.5">
          <StatusDot tone="muted" />
          <span className="text-[13px] font-medium">Competitor comparison</span>
          <span className="text-mono text-[11px] text-muted-foreground">· 5 peers tracked</span>
        </div>
        <div className="text-mono text-[11px] text-muted-foreground">SaaS / Productivity</div>
      </div>
      <div className="px-5 py-2">
        <div className="grid grid-cols-[1.6fr_repeat(6,1fr)_0.8fr] gap-2 border-b border-hairline py-2 text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          <div>Site</div>
          {cols.map((c) => <div key={c} className="text-right">{c}</div>)}
          <div className="text-right">Avg</div>
        </div>
        {rows.map((r) => {
          const avg = Math.round(r.scores.reduce((a, b) => a + b, 0) / r.scores.length);
          return (
            <div key={r.name} className={`grid grid-cols-[1.6fr_repeat(6,1fr)_0.8fr] items-center gap-2 border-b border-hairline py-2.5 text-[12.5px] last:border-0 ${r.me ? "bg-accent/[0.04]" : ""}`}>
              <div className="flex items-center gap-2">
                {r.me && <span className="text-mono rounded-[3px] bg-accent/20 px-1 py-0.5 text-[9.5px] text-accent">YOU</span>}
                <span className={r.me ? "font-medium" : "text-foreground/85"}>{r.name}</span>
              </div>
              {r.scores.map((s, i) => (
                <div key={i} className="text-mono text-right tabular-nums">
                  <span className={s >= 85 ? "text-accent" : s >= 70 ? "text-foreground/85" : "text-warning"}>{s}</span>
                </div>
              ))}
              <div className="text-mono text-right font-medium tabular-nums">{avg}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WorkflowTimeline() {
  const steps = [
    { t: "00:00", title: "Audit initiated", body: "Run config: full crawl · 3 viewports · competitor set: 5" },
    { t: "00:12", title: "DOM + visual capture complete", body: "142 pages rendered. 38 viewport screenshots stored." },
    { t: "00:34", title: "UX heuristics scored", body: "61 UX signals evaluated. 14 critical patterns flagged." },
    { t: "01:08", title: "Conversion paths mapped", body: "12 conversion flows traced. 4 drop-off points isolated." },
    { t: "01:42", title: "AI recommendation pass", body: "24 actions clustered by expected lift and effort." },
    { t: "01:58", title: "Report ready", body: "Stakeholder PDF and Notion export prepared." },
  ];
  return (
    <ol className="relative ml-2 space-y-5 border-l border-hairline pl-6">
      {steps.map((s, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[27px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_oklch(0.72_0.14_155/0.15)]" />
          <div className="flex items-baseline gap-3">
            <span className="text-mono w-12 shrink-0 text-[10.5px] tabular-nums text-muted-foreground">{s.t}</span>
            <div>
              <div className="text-[13px] font-medium">{s.title}</div>
              <div className="text-[12px] text-muted-foreground">{s.body}</div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
