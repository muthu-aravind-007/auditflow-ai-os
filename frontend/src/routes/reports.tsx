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

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
  head: () => ({
    meta: [
      { title: "Reports — AuditFlow" },
      { name: "description", content: "Premium AI audit reports, branded PDF generation and executive summaries." },
    ],
  }),
});

const library = [
  { id: "RPT-118", title: "Linear · full intelligence audit", date: "May 24", pages: 38, format: "PDF · branded", status: "Ready" },
  { id: "RPT-117", title: "Notion · UX deep-dive", date: "May 22", pages: 24, format: "PDF · executive", status: "Ready" },
  { id: "RPT-116", title: "Raycast · conversion review", date: "May 21", pages: 18, format: "Notion export", status: "Ready" },
  { id: "RPT-115", title: "Arc · SEO + perf snapshot", date: "May 19", pages: 12, format: "PDF · compact", status: "Ready" },
];

const sections = [
  { n: "01", t: "Executive summary", p: "1–2", on: true },
  { n: "02", t: "Quality score breakdown", p: "3–5", on: true },
  { n: "03", t: "UX analysis · annotated", p: "6–12", on: true },
  { n: "04", t: "Conversion intelligence", p: "13–17", on: true },
  { n: "05", t: "SEO + performance", p: "18–22", on: true },
  { n: "06", t: "Trust & brand", p: "23–26", on: true },
  { n: "07", t: "Competitor benchmark", p: "27–31", on: true },
  { n: "08", t: "Prioritized recommendations", p: "32–36", on: true },
  { n: "09", t: "Appendix · raw findings", p: "37–38", on: false },
];

function ReportsPage() {
  return (
    <ConsoleLayout
      title="Reports"
      eyebrow="Stakeholder-ready output"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot /> 4 reports ready · 1 generating
          </span>
          <span>Default template: Branded PDF · 38 pages</span>
        </>
      }
      actions={
        <>
          <GhostButton>Template</GhostButton>
          <GhostButton>Brand kit</GhostButton>
          <PrimaryButton>Generate report</PrimaryButton>
        </>
      }
    >
      {/* Composer: preview + sections */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <SectionCard>
          <PanelHeader title="PDF preview · Linear · full intelligence audit" meta="38 pages · branded" right="page 1 of 38" />
          <div className="bg-surface/30 p-6">
            {/* Faux PDF page */}
            <div className="mx-auto aspect-[1/1.414] w-full max-w-[440px] overflow-hidden rounded-md border border-hairline bg-[oklch(0.98_0.005_250)] text-[oklch(0.16_0.005_270)] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
              <div className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-[3px] bg-[oklch(0.72_0.14_155)]" />
                    <span className="text-[11px] font-semibold tracking-tight">AuditFlow</span>
                  </div>
                  <span className="text-[9px] tracking-[0.2em] text-[oklch(0.45_0.01_260)]">CONFIDENTIAL · DRAFT</span>
                </div>
                <div className="mt-10">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[oklch(0.5_0.01_260)]">
                    Website intelligence audit
                  </div>
                  <h2 className="mt-2 text-[22px] font-semibold leading-tight tracking-tight">
                    linear.app
                  </h2>
                  <div className="mt-1 text-[10px] text-[oklch(0.45_0.01_260)]">
                    Prepared for Northbeam Studio · May 24, 2026
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[
                    { k: "Overall", v: "74" },
                    { k: "UX", v: "82" },
                    { k: "Conv.", v: "61" },
                    { k: "SEO", v: "88" },
                    { k: "Trust", v: "54" },
                    { k: "Brand", v: "79" },
                  ].map((m) => (
                    <div key={m.k} className="rounded-[4px] border border-[oklch(0.85_0_0)] p-2">
                      <div className="text-[8.5px] uppercase tracking-wider text-[oklch(0.5_0.01_260)]">{m.k}</div>
                      <div className="text-[16px] font-semibold tabular-nums">{m.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-[9.5px] uppercase tracking-[0.2em] text-[oklch(0.5_0.01_260)]">
                  Executive summary
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-[oklch(0.25_0.01_260)]">
                  Linear performs above category median in UX clarity and SEO. Conversion and trust
                  signal density are the most material levers, with an estimated +11.4% conversion lift
                  available within the next 24 working days.
                </p>

                <div className="mt-auto flex items-end justify-between pt-6 text-[8.5px] text-[oklch(0.5_0.01_260)]">
                  <span>AuditFlow · auditflow.app/runs/AR-4821</span>
                  <span>01 / 38</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <GhostButton>‹</GhostButton>
              <span className="text-mono text-[11px] text-muted-foreground">01 / 38</span>
              <GhostButton>›</GhostButton>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <PanelHeader title="Report sections" meta="9 sections · 38 pages" />
          <ul className="divide-y divide-hairline">
            {sections.map((s) => (
              <li
                key={s.n}
                className="grid grid-cols-[40px_1fr_70px_50px] items-center gap-3 px-5 py-2.5 hover:bg-surface/40"
              >
                <div className="text-mono text-[11px] text-muted-foreground tabular-nums">{s.n}</div>
                <div className="text-[12.5px]">{s.t}</div>
                <div className="text-mono text-right text-[11px] text-muted-foreground">pp. {s.p}</div>
                <div className="flex justify-end">
                  <span
                    className={`relative inline-flex h-4 w-7 items-center rounded-full ${
                      s.on ? "bg-accent" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 rounded-full bg-background transition-transform ${
                        s.on ? "translate-x-3.5" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-hairline px-5 py-3">
            <div className="text-mono text-[11px] text-muted-foreground">
              Format: PDF · branded · 8.5×11
            </div>
            <div className="flex gap-2">
              <GhostButton>Template</GhostButton>
              <PrimaryButton>Regenerate</PrimaryButton>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Export workflow */}
      <SectionCard className="mb-6">
        <PanelHeader title="Export workflow" meta="3 destinations enabled" right="brand kit applied" />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-4">
          {[
            { t: "Branded PDF", n: "8.5×11 · 38pp · client cover", tone: "accent" as const },
            { t: "Notion export", n: "Synced workspace · live link", tone: "accent" as const },
            { t: "Linear issues", n: "Auto-create from P0 + P1", tone: "accent" as const },
            { t: "Public share link", n: "Read-only · expires 30d", tone: "muted" as const },
          ].map((d) => (
            <div key={d.t} className="bg-card p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <StatusDot tone={d.tone} />
                <span className="text-[12.5px] font-medium">{d.t}</span>
              </div>
              <div className="text-[11.5px] text-muted-foreground">{d.n}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Library */}
      <SectionCard>
        <PanelHeader title="Report library" meta="4 ready · 1 generating" />
        <div className="grid grid-cols-[110px_1fr_90px_80px_140px_90px_100px] gap-3 border-b border-hairline px-5 py-2 text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          <div>ID</div>
          <div>Title</div>
          <div>Date</div>
          <div className="text-right">Pages</div>
          <div>Format</div>
          <div>Status</div>
          <div className="text-right">Action</div>
        </div>
        {library.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[110px_1fr_90px_80px_140px_90px_100px] items-center gap-3 border-b border-hairline px-5 py-3 last:border-0 hover:bg-surface/40"
          >
            <div className="text-mono text-[11.5px] text-muted-foreground">{r.id}</div>
            <div className="truncate text-[12.5px] font-medium">{r.title}</div>
            <div className="text-mono text-[11.5px] text-muted-foreground">{r.date}</div>
            <div className="text-mono text-right text-[11.5px] tabular-nums">{r.pages}</div>
            <div className="text-[12px] text-muted-foreground">{r.format}</div>
            <div><Pill tone="accent">{r.status}</Pill></div>
            <div className="flex justify-end gap-1.5">
              <GhostButton>Download</GhostButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </ConsoleLayout>
  );
}
