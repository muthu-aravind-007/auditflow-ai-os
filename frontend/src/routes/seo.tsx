import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";
import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/seo")({
  component: SEOPage,
  head: () => ({
    meta: [
      { title: "SEO & performance — AuditFlow" },
      { name: "description", content: "Technical SEO, metadata, performance and mobile responsiveness." },
    ],
  }),
});

const vitals = [
  { k: "LCP", v: "2.4s", target: "≤ 2.5s", tone: "accent" as const },
  { k: "INP", v: "210ms", target: "≤ 200ms", tone: "warning" as const },
  { k: "CLS", v: "0.04", target: "≤ 0.1", tone: "accent" as const },
  { k: "TTFB", v: "640ms", target: "≤ 800ms", tone: "accent" as const },
  { k: "JS bundle", v: "412kb", target: "≤ 300kb", tone: "danger" as const },
  { k: "Img weight", v: "1.8mb", target: "≤ 1.2mb", tone: "warning" as const },
];

const meta = [
  { page: "/", title: "Linear – Plan, build & launch", desc: 154, og: true, canonical: true, schema: "WebSite" },
  { page: "/pricing", title: "Pricing – Linear", desc: 138, og: true, canonical: true, schema: "—" },
  { page: "/product", title: "Product – Linear", desc: 92, og: true, canonical: false, schema: "Product" },
  { page: "/integrations", title: "Integrations", desc: 0, og: false, canonical: true, schema: "—" },
  { page: "/changelog", title: "Changelog – Linear", desc: 121, og: true, canonical: true, schema: "BlogPosting" },
];

const issues = [
  { code: "SEO-091", tone: "warning" as const, t: "Schema.org Product markup missing on /pricing", n: "Add Product + Offer schema. Projected +3 SERP positions in 30d." },
  { code: "SEO-064", tone: "danger" as const, t: "Missing meta description on /integrations", n: "Empty description tag. Google will synthesize — likely loses keyword intent." },
  { code: "SEO-118", tone: "warning" as const, t: "h1 duplicated across 6 blog pages", n: "All 6 use 'The Linear Blog' as h1. Use article title as h1 instead." },
  { code: "SEO-052", tone: "accent" as const, t: "Add FAQ schema to 6 product pages", n: "Existing FAQ content lacks structured data — rich snippet eligible." },
  { code: "PERF-031", tone: "danger" as const, t: "412kb JS bundle on /", n: "Above 300kb budget. Split vendor chunk and lazy-load hero animation." },
];

const mobile = [
  { v: "375 × 812", label: "iPhone 13", score: 78, notes: "Sticky nav covers hero CTA" },
  { v: "390 × 844", label: "iPhone 15", score: 81, notes: "OK · minor tap-target issue" },
  { v: "412 × 915", label: "Pixel 7", score: 84, notes: "OK" },
  { v: "768 × 1024", label: "iPad", score: 88, notes: "OK" },
];

function SEOPage() {
  return (
    <ConsoleLayout
      title="SEO & performance"
      eyebrow="Technical inspection"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot /> SEO score 88 · A−
          </span>
          <span>142 pages crawled · 6 schema types detected</span>
          <span>Crawler: auditflow-bot/4.2</span>
        </>
      }
      actions={
        <>
          <GhostButton>Re-crawl</GhostButton>
          <GhostButton>robots.txt</GhostButton>
          <GhostButton>Sitemap</GhostButton>
        </>
      }
    >
      {/* Core Web Vitals */}
      <SectionCard className="mb-6">
        <PanelHeader title="Core Web Vitals · performance budget" meta="p75 across 1k synthetic runs" right="renderer: chromium 124" />
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-6">
          {vitals.map((v) => (
            <div key={v.k} className="bg-card p-4">
              <div className="text-mono mb-1.5 text-[10.5px] uppercase tracking-wider text-muted-foreground">{v.k}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-[20px] font-medium tabular-nums">{v.v}</span>
                <StatusDot tone={v.tone} />
              </div>
              <div className="text-mono mt-1 text-[10.5px] text-muted-foreground">budget {v.target}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Metadata table + Mobile responsiveness */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <SectionCard>
          <PanelHeader title="Metadata coverage" meta="5 sampled pages · 142 total" />
          <div className="grid grid-cols-[1fr_1.6fr_70px_60px_70px_1fr] gap-3 border-b border-hairline px-5 py-2 text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
            <div>Page</div>
            <div>Title</div>
            <div className="text-right">Desc</div>
            <div className="text-right">OG</div>
            <div className="text-right">Canon.</div>
            <div>Schema</div>
          </div>
          {meta.map((m) => (
            <div
              key={m.page}
              className="grid grid-cols-[1fr_1.6fr_70px_60px_70px_1fr] items-center gap-3 border-b border-hairline px-5 py-2.5 last:border-0 hover:bg-surface/40"
            >
              <div className="text-mono text-[11.5px] text-muted-foreground">{m.page}</div>
              <div className="truncate text-[12.5px]">{m.title}</div>
              <div className={`text-mono text-right text-[12px] tabular-nums ${m.desc === 0 ? "text-danger" : m.desc < 120 ? "text-warning" : "text-accent"}`}>
                {m.desc}
              </div>
              <div className="flex justify-end">
                <StatusDot tone={m.og ? "accent" : "danger"} />
              </div>
              <div className="flex justify-end">
                <StatusDot tone={m.canonical ? "accent" : "warning"} />
              </div>
              <div className="text-mono text-[11.5px] text-muted-foreground">{m.schema}</div>
            </div>
          ))}
        </SectionCard>

        <SectionCard>
          <PanelHeader title="Mobile responsiveness" meta="4 viewports" />
          <div className="divide-y divide-hairline">
            {mobile.map((m) => (
              <div key={m.v} className="grid grid-cols-[1fr_50px] items-center gap-3 px-5 py-3">
                <div>
                  <div className="text-[12.5px] font-medium">{m.label}</div>
                  <div className="text-mono text-[11px] text-muted-foreground">{m.v}</div>
                  <div className="mt-1 text-[11.5px] text-muted-foreground">{m.notes}</div>
                </div>
                <div
                  className={`text-mono text-right text-[16px] tabular-nums ${
                    m.score >= 85 ? "text-accent" : m.score >= 75 ? "text-foreground/85" : "text-warning"
                  }`}
                >
                  {m.score}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Issues */}
      <SectionCard>
        <PanelHeader title="Detected SEO + performance issues" meta="12 active · 3 critical" />
        <div className="divide-y divide-hairline">
          {issues.map((i) => (
            <div key={i.code} className="grid grid-cols-[110px_1fr_140px] gap-4 px-5 py-3 hover:bg-surface/40">
              <div className="flex items-center gap-2">
                <StatusDot tone={i.tone} />
                <span className="text-mono text-[11px] text-muted-foreground">{i.code}</span>
              </div>
              <div>
                <div className="text-[13px] font-medium">{i.t}</div>
                <div className="text-[12px] text-muted-foreground">{i.n}</div>
              </div>
              <div className="flex items-start justify-end gap-2">
                <Pill>{i.code.startsWith("PERF") ? "perf" : "seo"}</Pill>
                <GhostButton>Open</GhostButton>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </ConsoleLayout>
  );
}
