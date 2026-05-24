import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";
import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/quality-scores")({
  component: QualityScoresPage,
  head: () => ({
    meta: [
      { title: "Quality scores — AuditFlow" },
      { name: "description", content: "UX, conversion, SEO, accessibility and trust scores with AI explanations." },
    ],
  }),
});

const scores = [
  {
    key: "UX",
    label: "UX clarity",
    value: 82,
    delta: "+4",
    grade: "B+",
    breakdown: [
      { l: "Visual hierarchy", v: 88 },
      { l: "Readability", v: 84 },
      { l: "Affordance clarity", v: 76 },
      { l: "Interaction friction", v: 79 },
    ],
    note: "Hierarchy strong above the fold; affordance drops on pricing and integrations pages.",
  },
  {
    key: "CV",
    label: "Conversion",
    value: 61,
    delta: "−3",
    grade: "C",
    tone: "warning" as const,
    breakdown: [
      { l: "Primary CTA clarity", v: 54 },
      { l: "Funnel continuity", v: 66 },
      { l: "Form completion", v: 71 },
      { l: "Decision support", v: 52 },
    ],
    note: "Three competing CTAs on /pricing dilute primary intent. Form length on /contact predicts ~22% drop-off.",
  },
  {
    key: "SEO",
    label: "SEO",
    value: 88,
    delta: "+1",
    grade: "A−",
    breakdown: [
      { l: "Metadata coverage", v: 94 },
      { l: "Semantic structure", v: 87 },
      { l: "Internal linking", v: 82 },
      { l: "Schema markup", v: 88 },
    ],
    note: "Strong baseline. Six product pages missing FAQ schema — projected +3 SERP positions in 30d.",
  },
  {
    key: "A11Y",
    label: "Accessibility",
    value: 71,
    delta: "+0",
    grade: "C+",
    tone: "warning" as const,
    breakdown: [
      { l: "Color contrast", v: 64 },
      { l: "Keyboard navigation", v: 78 },
      { l: "Aria + roles", v: 73 },
      { l: "Focus management", v: 68 },
    ],
    note: "Contrast on muted text fails WCAG AA on 14 components. Modal focus traps inconsistent.",
  },
  {
    key: "TRT",
    label: "Trust signals",
    value: 54,
    delta: "−2",
    grade: "D+",
    tone: "danger" as const,
    breakdown: [
      { l: "Social proof density", v: 41 },
      { l: "Brand consistency", v: 79 },
      { l: "Security indicators", v: 58 },
      { l: "Contact clarity", v: 38 },
    ],
    note: "Customer logos sit at 1840px depth on mobile. No security badges on pricing. Support contact buried.",
  },
];

const severity = [
  { level: "Critical", count: 6, tone: "danger" as const, desc: "Block conversion or accessibility" },
  { level: "High", count: 11, tone: "warning" as const, desc: "Materially impact key flows" },
  { level: "Medium", count: 14, tone: "accent" as const, desc: "Improve clarity & polish" },
  { level: "Low", count: 23, tone: "muted" as const, desc: "Nice-to-have refinements" },
];

function Ring({ value, tone = "accent" }: { value: number; tone?: "accent" | "warning" | "danger" }) {
  const c = 2 * Math.PI * 26;
  const off = c - (value / 100) * c;
  const stroke =
    tone === "accent"
      ? "oklch(0.72 0.14 155)"
      : tone === "warning"
      ? "oklch(0.78 0.13 75)"
      : "oklch(0.66 0.18 22)";
  return (
    <div className="relative h-[84px] w-[84px]">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r="26" stroke="oklch(1 0 0 / 0.07)" strokeWidth="5" fill="none" />
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke={stroke}
          strokeWidth="5"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[20px] font-semibold tabular-nums">
        {value}
      </div>
    </div>
  );
}

function QualityScoresPage() {
  return (
    <ConsoleLayout
      title="Quality scores"
      eyebrow="linear.app · AR-4821"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot /> Composite 74 · B+ grade
          </span>
          <span>5 dimensions · weighted by buyer impact</span>
          <span>Last computed 2m ago</span>
        </>
      }
      actions={
        <>
          <GhostButton>Compare runs</GhostButton>
          <GhostButton>Weighting</GhostButton>
          <GhostButton>Export</GhostButton>
        </>
      }
    >
      {/* Severity strip */}
      <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        {severity.map((s) => (
          <div key={s.level} className="bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusDot tone={s.tone} />
                <span className="text-[12.5px] font-medium">{s.level}</span>
              </div>
              <span className="text-mono text-[18px] font-medium tabular-nums">{s.count}</span>
            </div>
            <div className="text-[11.5px] text-muted-foreground">{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Score breakdowns */}
      <div className="space-y-4">
        {scores.map((s) => (
          <SectionCard key={s.key}>
            <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-[260px_1fr_360px]">
              {/* Left: ring */}
              <div className="flex items-center gap-4 bg-card p-5">
                <Ring value={s.value} tone={s.tone ?? "accent"} />
                <div>
                  <div className="text-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                    {s.key}
                  </div>
                  <div className="text-[15px] font-medium">{s.label}</div>
                  <div className="text-mono mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>Grade {s.grade}</span>
                    <span className={s.delta.startsWith("-") || s.delta.startsWith("−") ? "text-warning" : "text-accent"}>
                      {s.delta} vs prev
                    </span>
                  </div>
                </div>
              </div>

              {/* Mid: breakdown bars */}
              <div className="bg-card p-5">
                <div className="text-mono mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Sub-dimensions
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {s.breakdown.map((b) => (
                    <div key={b.l}>
                      <div className="mb-1 flex items-center justify-between text-[11.5px]">
                        <span className="text-muted-foreground">{b.l}</span>
                        <span className="text-mono tabular-nums text-foreground/80">{b.v}</span>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                        <div
                          className={`h-full ${
                            b.v >= 80 ? "bg-accent" : b.v >= 60 ? "bg-warning" : "bg-danger"
                          }`}
                          style={{ width: `${b.v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: AI explanation */}
              <div className="bg-card p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Pill tone="accent">AI explanation</Pill>
                  <span className="text-mono text-[10.5px] text-muted-foreground">gpt-audit v4</span>
                </div>
                <p className="text-[12.5px] leading-relaxed text-foreground/90">{s.note}</p>
                <div className="mt-3 flex gap-2">
                  <GhostButton>Open evidence</GhostButton>
                  <GhostButton>Why this score?</GhostButton>
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </ConsoleLayout>
  );
}
