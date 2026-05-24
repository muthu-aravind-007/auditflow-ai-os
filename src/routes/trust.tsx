import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";
import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/trust")({
  component: TrustPage,
  head: () => ({
    meta: [
      { title: "Trust & brand — AuditFlow" },
      { name: "description", content: "Social proof, brand consistency, security indicators and contact clarity." },
    ],
  }),
});

const indicators = [
  { k: "Customer logos", present: true, depth: "1840px", tone: "warning" as const, note: "Below fold on mobile" },
  { k: "Testimonials", present: true, depth: "1120px", tone: "accent" as const, note: "Strong placement" },
  { k: "G2 / Capterra badges", present: false, depth: "—", tone: "danger" as const, note: "Missing entirely" },
  { k: "SOC 2 / security badge", present: false, depth: "—", tone: "danger" as const, note: "Add on /pricing footer" },
  { k: "Press logos", present: true, depth: "footer", tone: "warning" as const, note: "Footer-only — low visibility" },
  { k: "Case studies link", present: true, depth: "nav", tone: "accent" as const, note: "Primary nav · OK" },
  { k: "Active social", present: true, depth: "footer", tone: "accent" as const, note: "X + LinkedIn linked" },
  { k: "Founder bio / about", present: true, depth: "/about", tone: "accent" as const, note: "OK · could be richer" },
];

const brand = [
  { k: "Logo usage", v: 94, n: "1 inconsistent variant on /careers" },
  { k: "Color palette", v: 81, n: "3 off-palette accents detected" },
  { k: "Typography scale", v: 88, n: "Consistent · 2 orphan sizes" },
  { k: "Tone of voice", v: 72, n: "Marketing vs docs voice diverges" },
  { k: "Imagery style", v: 79, n: "Mixed photo / illustration cadence" },
];

const contact = [
  { k: "Email", v: "support@linear.app", tone: "accent" as const, depth: "footer" },
  { k: "Phone", v: "—", tone: "danger" as const, depth: "—" },
  { k: "Live chat", v: "Available", tone: "accent" as const, depth: "global" },
  { k: "Office address", v: "San Francisco, CA", tone: "warning" as const, depth: "/about" },
  { k: "Response SLA", v: "Not stated", tone: "warning" as const, depth: "—" },
];

function TrustPage() {
  return (
    <ConsoleLayout
      title="Trust & brand cohesion"
      eyebrow="Signal density + professionalism"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot tone="danger" /> Trust score 54 · D+
          </span>
          <span>8 trust indicators scanned · 3 missing</span>
          <span>Brand drift detected on 4 surfaces</span>
        </>
      }
      actions={
        <>
          <GhostButton>Brand kit</GhostButton>
          <GhostButton>Voice profile</GhostButton>
          <GhostButton>Export</GhostButton>
        </>
      }
    >
      {/* Indicators */}
      <SectionCard className="mb-6">
        <PanelHeader title="Trust indicator detection" meta="8 signals · weighted by visibility" tone="warning" />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {indicators.map((i) => (
            <div key={i.k} className="bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[12.5px] font-medium">{i.k}</span>
                <StatusDot tone={i.tone} />
              </div>
              <div className="text-mono mb-1 text-[10.5px] text-muted-foreground">
                depth · {i.depth}
              </div>
              <div className="text-[11.5px] text-muted-foreground">{i.note}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Brand + Contact */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <SectionCard>
          <PanelHeader title="Brand consistency" meta="5 dimensions" />
          <div className="space-y-4 p-5">
            {brand.map((b) => (
              <div key={b.k} className="grid grid-cols-[160px_1fr_50px] items-center gap-4">
                <div>
                  <div className="text-[12.5px] font-medium">{b.k}</div>
                  <div className="text-[11.5px] text-muted-foreground">{b.n}</div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full ${b.v >= 85 ? "bg-accent" : b.v >= 70 ? "bg-warning" : "bg-danger"}`}
                    style={{ width: `${b.v}%` }}
                  />
                </div>
                <div className="text-mono text-right text-[12px] tabular-nums text-foreground/85">{b.v}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <PanelHeader title="Contact clarity" meta="5 channels" tone="warning" />
          <div className="divide-y divide-hairline">
            {contact.map((c) => (
              <div key={c.k} className="grid grid-cols-[110px_1fr_70px_30px] items-center gap-3 px-5 py-2.5">
                <div className="text-[12.5px] text-muted-foreground">{c.k}</div>
                <div className="truncate text-[12.5px]">{c.v}</div>
                <div className="text-mono text-right text-[11px] text-muted-foreground">{c.depth}</div>
                <div className="flex justify-end"><StatusDot tone={c.tone} /></div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Professionalism AI summary */}
      <SectionCard>
        <PanelHeader title="Professionalism scoring · AI summary" meta="weighted composite 67" right="model: gpt-audit v4" />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {[
            {
              title: "Strengths",
              tone: "accent" as const,
              items: [
                "Brand mark and palette discipline above category average",
                "Live chat and case-study link in primary nav",
                "Clean typography scale; readable across surfaces",
              ],
            },
            {
              title: "Weaknesses",
              tone: "warning" as const,
              items: [
                "No security or compliance badge anywhere on /pricing",
                "Press + customer logos sit below the mobile fold",
                "Voice in docs reads more formal than marketing — inconsistent",
              ],
            },
            {
              title: "Risk to buyer trust",
              tone: "danger" as const,
              items: [
                "Enterprise buyers will not see SOC 2 evidence in 0 to 60s scan",
                "Absence of stated SLA undermines support story",
                "No third-party badge (G2 / Capterra) on a competitive shortlist page",
              ],
            },
          ].map((c) => (
            <div key={c.title} className="bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Pill tone={c.tone}>{c.title}</Pill>
              </div>
              <ul className="space-y-2 text-[12.5px] leading-relaxed text-foreground/90">
                {c.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-mono pt-0.5 text-[10.5px] text-muted-foreground">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>
    </ConsoleLayout>
  );
}
