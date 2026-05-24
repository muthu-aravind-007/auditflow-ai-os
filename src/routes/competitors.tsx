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
import { CompetitorMatrix } from "@/components/auditflow/Sections";

export const Route = createFileRoute("/competitors")({
  component: CompetitorsPage,
  head: () => ({
    meta: [
      { title: "Competitor comparison — AuditFlow" },
      { name: "description", content: "Side-by-side audit comparison with AI-generated competitive insights." },
    ],
  }),
});

const dims = ["UX", "Conversion", "SEO", "Performance", "Trust", "Brand"];
const me = { name: "yourbrand.com", scores: [74, 61, 88, 71, 54, 79] };
const peer = { name: "linear.app", scores: [92, 88, 86, 91, 84, 90] };

const insights = [
  { tone: "danger" as const, t: "Conversion gap of −27", n: "Linear consolidates a single primary CTA per surface and pairs it with proof at hero-level. You're losing intent to CTA ambiguity on /pricing." },
  { tone: "warning" as const, t: "Trust gap of −30", n: "Linear surfaces customer logos within first 720px on mobile + SOC 2 badge in pricing footer. Both are absent on your surfaces." },
  { tone: "accent" as const, t: "SEO advantage of +2", n: "You out-rank Linear on schema coverage. Hold this lead by adding Product + FAQ markup on /pricing." },
];

function CompetitorsPage() {
  return (
    <ConsoleLayout
      title="Competitor comparison"
      eyebrow="Side-by-side intelligence"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot tone="muted" /> 5 peers tracked · SaaS / Productivity
          </span>
          <span>Refreshed daily · last 14m ago</span>
        </>
      }
      actions={
        <>
          <GhostButton>Edit peer set</GhostButton>
          <GhostButton>Niche: SaaS</GhostButton>
          <PrimaryButton>Run benchmark</PrimaryButton>
        </>
      }
    >
      {/* Side-by-side hero compare */}
      <SectionCard className="mb-6">
        <PanelHeader title="Side-by-side · yourbrand.com vs linear.app" meta="primary peer" right="weighted score" />
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          <CompareCard
            name={me.name}
            you
            score={Math.round(me.scores.reduce((a, b) => a + b, 0) / me.scores.length)}
            scores={me.scores}
          />
          <CompareCard
            name={peer.name}
            score={Math.round(peer.scores.reduce((a, b) => a + b, 0) / peer.scores.length)}
            scores={peer.scores}
          />
        </div>
        <div className="grid grid-cols-2 gap-px border-t border-hairline bg-border md:grid-cols-6">
          {dims.map((d, i) => {
            const diff = me.scores[i] - peer.scores[i];
            return (
              <div key={d} className="bg-card p-3 text-center">
                <div className="text-mono mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">{d}</div>
                <div className={`text-mono text-[15px] font-medium tabular-nums ${diff >= 0 ? "text-accent" : "text-warning"}`}>
                  {diff >= 0 ? "+" : ""}
                  {diff}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Full matrix */}
      <div className="mb-6">
        <CompetitorMatrix />
      </div>

      {/* AI competitive insights */}
      <SectionCard className="mb-6">
        <PanelHeader title="AI competitive insights" meta="3 strategic deltas · ranked by buyer impact" right="model: gpt-audit v4" />
        <ul className="divide-y divide-hairline">
          {insights.map((it, i) => (
            <li key={i} className="grid grid-cols-[40px_1fr_120px] items-start gap-4 px-5 py-4 hover:bg-surface/40">
              <StatusDot tone={it.tone} />
              <div>
                <div className="text-[13.5px] font-medium">{it.t}</div>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">{it.n}</p>
              </div>
              <div className="flex justify-end gap-2">
                <GhostButton>Open</GhostButton>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* UX + Conversion compare panels */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ComparePanel
          title="UX compare · hero band"
          you={{ items: ["1 generic CTA", "Headline lacks ICP", "No proof above fold"] }}
          peer={{ name: "linear.app", items: ["1 primary CTA + text link", "ICP-named headline", "Customer logos in hero"] }}
        />
        <ComparePanel
          title="Conversion compare · /pricing"
          you={{ items: ["3 competing CTAs", "Comparison table below fold", "No SOC 2 badge"] }}
          peer={{ name: "linear.app", items: ["1 CTA per tier", "Comparison anchor in nav", "SOC 2 + 99.9% SLA badge"] }}
        />
      </div>
    </ConsoleLayout>
  );
}

function CompareCard({
  name,
  score,
  scores,
  you,
}: {
  name: string;
  score: number;
  scores: number[];
  you?: boolean;
}) {
  return (
    <div className={`bg-card p-5 ${you ? "bg-accent/[0.04]" : ""}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {you && <Pill tone="accent">YOU</Pill>}
          <span className="text-[14px] font-medium">{name}</span>
        </div>
        <div className="text-mono text-[24px] font-semibold tabular-nums">{score}</div>
      </div>
      <div className="space-y-2">
        {dims.map((d, i) => (
          <div key={d} className="grid grid-cols-[100px_1fr_40px] items-center gap-3">
            <span className="text-[11.5px] text-muted-foreground">{d}</span>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full ${scores[i] >= 85 ? "bg-accent" : scores[i] >= 70 ? "bg-foreground/40" : "bg-warning"}`}
                style={{ width: `${scores[i]}%` }}
              />
            </div>
            <span className="text-mono text-right text-[11px] tabular-nums text-foreground/80">{scores[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparePanel({
  title,
  you,
  peer,
}: {
  title: string;
  you: { items: string[] };
  peer: { name: string; items: string[] };
}) {
  return (
    <SectionCard>
      <PanelHeader title={title} />
      <div className="grid grid-cols-2 gap-px bg-border">
        <div className="bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Pill tone="accent">YOU</Pill>
            <span className="text-[12.5px] font-medium">yourbrand.com</span>
          </div>
          <ul className="space-y-1.5 text-[12.5px] text-muted-foreground">
            {you.items.map((i) => (
              <li key={i} className="flex gap-2">
                <StatusDot tone="warning" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Pill>peer</Pill>
            <span className="text-[12.5px] font-medium">{peer.name}</span>
          </div>
          <ul className="space-y-1.5 text-[12.5px] text-muted-foreground">
            {peer.items.map((i) => (
              <li key={i} className="flex gap-2">
                <StatusDot tone="accent" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
