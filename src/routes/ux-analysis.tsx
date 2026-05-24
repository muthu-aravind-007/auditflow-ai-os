import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";
import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/ux-analysis")({
  component: UXAnalysisPage,
  head: () => ({
    meta: [
      { title: "UX analysis — AuditFlow" },
      { name: "description", content: "AI visual inspection: hierarchy, CTA visibility, readability and layout consistency." },
    ],
  }),
});

const annotations = [
  { id: "A1", x: "16%", y: "22%", tone: "danger" as const, label: "Headline ambiguity" },
  { id: "A2", x: "62%", y: "34%", tone: "warning" as const, label: "Secondary CTA outweighs primary" },
  { id: "A3", x: "30%", y: "68%", tone: "accent" as const, label: "Proof cluster too low" },
  { id: "A4", x: "78%", y: "76%", tone: "warning" as const, label: "Inconsistent radius / spacing" },
];

const heuristics = [
  { name: "Visual hierarchy", v: 88 },
  { name: "Readability", v: 84 },
  { name: "Affordance clarity", v: 76 },
  { name: "Cognitive load", v: 72 },
  { name: "Layout consistency", v: 81 },
  { name: "Content density", v: 69 },
];

const issues = [
  {
    code: "UX-204",
    tone: "danger" as const,
    title: "Hero headline does not specify ICP",
    where: "/ · above the fold",
    detail: "Vision model finds 0 buyer-naming tokens in first 60 chars. Reader survey predicts 38% bounce delta.",
  },
  {
    code: "UX-188",
    tone: "warning" as const,
    title: "Secondary CTA visually dominates primary",
    where: "/pricing · hero band",
    detail: "Outline CTA has 1.8× the visual weight of solid primary due to width and adjacent whitespace.",
  },
  {
    code: "UX-152",
    tone: "warning" as const,
    title: "Body copy line length exceeds 92ch on desktop",
    where: "/blog/* · article body",
    detail: "Average measure 102ch. Readability index drops 14% above 90ch in long-form content.",
  },
  {
    code: "UX-091",
    tone: "accent" as const,
    title: "Inconsistent corner radius across surfaces",
    where: "global · cards & inputs",
    detail: "5 distinct radius values detected (4/6/8/10/12px). Recommend collapsing to a 3-step scale.",
  },
];

function UXAnalysisPage() {
  return (
    <ConsoleLayout
      title="UX analysis"
      eyebrow="Visual + heuristic intelligence"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot /> 14 critical patterns · 38 viewports analyzed
          </span>
          <span>Vision model: gpt-vision-audit v4 + 140 heuristics</span>
        </>
      }
      actions={
        <>
          <GhostButton>Viewport: 1440</GhostButton>
          <GhostButton>Compare viewports</GhostButton>
          <GhostButton>Export overlays</GhostButton>
        </>
      }
    >
      {/* Annotated screenshot + heuristics */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <SectionCard>
          <PanelHeader
            title="Annotated capture · /pricing"
            meta="4 AI annotations"
            right="1440 × 900"
          />
          <div className="p-4">
            <div className="relative overflow-hidden rounded-md border border-hairline bg-background">
              {/* faux page */}
              <div className="grid h-[420px] grid-cols-12 gap-3 p-5">
                <div className="col-span-12 flex items-center justify-between">
                  <div className="h-4 w-24 rounded-sm bg-white/[0.08]" />
                  <div className="flex gap-2">
                    <div className="h-3 w-12 rounded-sm bg-white/[0.05]" />
                    <div className="h-3 w-12 rounded-sm bg-white/[0.05]" />
                    <div className="h-3 w-12 rounded-sm bg-white/[0.05]" />
                  </div>
                </div>
                <div className="col-span-7 mt-6 flex flex-col gap-2">
                  <div className="h-6 w-4/5 rounded-sm bg-white/[0.08]" />
                  <div className="h-6 w-3/5 rounded-sm bg-white/[0.08]" />
                  <div className="mt-2 h-3 w-3/4 rounded-sm bg-white/[0.05]" />
                  <div className="h-3 w-2/3 rounded-sm bg-white/[0.05]" />
                  <div className="mt-3 flex gap-2">
                    <div className="h-7 w-24 rounded-sm bg-accent/30 ring-1 ring-accent/50" />
                    <div className="h-7 w-28 rounded-sm bg-white/[0.08]" />
                  </div>
                </div>
                <div className="col-span-5 mt-6 grid grid-cols-2 gap-2">
                  <div className="rounded-sm bg-white/[0.05]" />
                  <div className="rounded-sm bg-white/[0.05]" />
                  <div className="col-span-2 rounded-sm bg-white/[0.04]" />
                </div>
                <div className="col-span-12 mt-4 grid grid-cols-4 gap-2">
                  <div className="h-16 rounded-sm bg-white/[0.04]" />
                  <div className="h-16 rounded-sm bg-white/[0.04]" />
                  <div className="h-16 rounded-sm bg-white/[0.04]" />
                  <div className="h-16 rounded-sm bg-white/[0.04]" />
                </div>
              </div>
              {/* Annotations */}
              {annotations.map((a) => (
                <div
                  key={a.id}
                  className="absolute"
                  style={{ left: a.x, top: a.y }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-mono text-[10px] font-medium ${
                        a.tone === "danger"
                          ? "bg-danger text-white"
                          : a.tone === "warning"
                          ? "bg-warning text-background"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {a.id}
                    </span>
                    <span className="rounded-[4px] border border-hairline bg-background/85 px-1.5 py-0.5 text-[10.5px] backdrop-blur">
                      {a.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <PanelHeader title="Heuristic scoring" meta="61 signals" />
          <div className="space-y-3 p-5">
            {heuristics.map((h) => (
              <div key={h.name}>
                <div className="mb-1 flex items-center justify-between text-[12px]">
                  <span className="text-foreground/90">{h.name}</span>
                  <span className="text-mono tabular-nums text-foreground/80">{h.v}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full ${h.v >= 80 ? "bg-accent" : h.v >= 70 ? "bg-warning" : "bg-danger"}`}
                    style={{ width: `${h.v}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-4 rounded-md border border-hairline bg-surface p-3 text-[12px] leading-relaxed text-muted-foreground">
              <span className="text-foreground/90">AI summary · </span>
              Hierarchy and readability are strong. Conversion-adjacent affordances (CTA pairs, pricing
              cards) carry the lowest scores. Focus refactor on /pricing and /integrations.
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Issues list */}
      <SectionCard>
        <PanelHeader title="Detected UX issues" meta="14 critical · 22 high" right="sorted by severity" />
        <div className="divide-y divide-hairline">
          {issues.map((i) => (
            <div key={i.code} className="grid grid-cols-[100px_1fr_140px] gap-4 px-5 py-4 hover:bg-surface/40">
              <div className="flex items-center gap-2">
                <StatusDot tone={i.tone} />
                <span className="text-mono text-[11px] text-muted-foreground">{i.code}</span>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[13px] font-medium">{i.title}</span>
                  <Pill>{i.where}</Pill>
                </div>
                <p className="text-[12.5px] leading-relaxed text-muted-foreground">{i.detail}</p>
              </div>
              <div className="flex items-start justify-end gap-2">
                <GhostButton>Evidence</GhostButton>
                <GhostButton>Fix →</GhostButton>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </ConsoleLayout>
  );
}
