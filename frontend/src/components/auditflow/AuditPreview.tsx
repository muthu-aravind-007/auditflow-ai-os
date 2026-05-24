import { StatusDot } from "./Brand";

/* The hero workflow preview — a believable AI audit run window */
export function AuditPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="text-mono flex items-center gap-2 rounded-md border border-hairline bg-background/60 px-2 py-1 text-[11px] text-muted-foreground">
            <StatusDot />
            auditflow.app / runs / linear-com-2f1c
          </div>
          <div className="text-mono text-[10.5px] text-muted-foreground">v4.2.1</div>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-12 gap-0">
          {/* Left rail */}
          <div className="col-span-3 border-r border-hairline px-3 py-3">
            <div className="text-mono mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Pipeline</div>
            <Step label="Crawl & render" status="done" detail="142 pages" />
            <Step label="Visual capture" status="done" detail="38 viewports" />
            <Step label="UX heuristics" status="done" detail="61 signals" />
            <Step label="Conversion paths" status="running" detail="12 flows" />
            <Step label="SEO + perf scan" status="queued" />
            <Step label="Trust audit" status="queued" />
            <Step label="Generate report" status="queued" />
          </div>

          {/* Center analysis */}
          <div className="col-span-6 border-r border-hairline">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
              <div className="flex items-center gap-2 text-[12.5px] font-medium">
                <span className="text-muted-foreground">Analyzing</span>
                <span>linear.app/pricing</span>
              </div>
              <div className="text-mono text-[11px] text-muted-foreground">
                Run · 00:01:42
              </div>
            </div>

            {/* Screenshot frame */}
            <div className="relative m-4 overflow-hidden rounded-md border border-hairline bg-background">
              <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-hairline bg-surface/80 px-2 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              </div>
              <div className="grid h-[180px] grid-cols-3 gap-2 p-3 pt-7">
                <div className="rounded-sm bg-white/[0.04]" />
                <div className="rounded-sm bg-white/[0.04]" />
                <div className="rounded-sm bg-white/[0.04]" />
                <div className="col-span-3 rounded-sm bg-white/[0.03]" />
                <div className="col-span-2 rounded-sm bg-white/[0.04]" />
                <div className="rounded-sm bg-accent/15 ring-1 ring-accent/40" />
              </div>
              {/* AI highlight callout */}
              <div className="absolute bottom-3 right-3 max-w-[210px] rounded-md border border-accent/40 bg-background/90 p-2 text-[11px] shadow-lg backdrop-blur">
                <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-accent">
                  <StatusDot /> CTA weakness
                </div>
                <div className="leading-snug text-foreground">
                  Primary CTA contrast 2.9:1 — below WCAG. Cluster competes with secondary link.
                </div>
              </div>
            </div>

            <div className="border-t border-hairline px-4 py-3">
              <div className="text-mono mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                Live findings · 24
              </div>
              <Finding tone="danger" code="UX-204" text="Pricing tiers lack anchor — visitors scroll past comparison." />
              <Finding tone="warning" code="CV-118" text="Free trial CTA hidden below the fold on 1366px viewport." />
              <Finding tone="accent" code="SEO-091" text="Schema.org Product markup missing on /pricing." />
            </div>
          </div>

          {/* Right scores */}
          <div className="col-span-3 px-4 py-4">
            <div className="text-mono mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">Quality score</div>
            <ScoreRing value={74} />
            <div className="mt-4 space-y-2.5">
              <ScoreBar label="UX clarity" value={82} />
              <ScoreBar label="Conversion" value={61} tone="warning" />
              <ScoreBar label="SEO" value={88} />
              <ScoreBar label="Performance" value={71} />
              <ScoreBar label="Trust signals" value={54} tone="danger" />
              <ScoreBar label="Brand cohesion" value={79} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ label, status, detail }: { label: string; status: "done" | "running" | "queued"; detail?: string }) {
  const dot =
    status === "done" ? "bg-accent" :
    status === "running" ? "bg-warning animate-pulse" :
    "bg-white/15";
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <div className="relative mt-1.5">
        <span className={`block h-1.5 w-1.5 rounded-full ${dot}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] leading-tight text-foreground">{label}</div>
        {detail && <div className="text-mono mt-0.5 text-[10.5px] text-muted-foreground">{detail}</div>}
      </div>
    </div>
  );
}

function Finding({ tone, code, text }: { tone: "accent" | "warning" | "danger"; code: string; text: string }) {
  return (
    <div className="flex items-start gap-2.5 border-t border-hairline py-2 first:border-0 first:pt-0">
      <StatusDot tone={tone} />
      <div className="text-mono shrink-0 text-[10.5px] text-muted-foreground">{code}</div>
      <div className="text-[12px] leading-snug text-foreground/90">{text}</div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const c = 2 * Math.PI * 30;
  const off = c - (value / 100) * c;
  return (
    <div className="relative mx-auto h-[110px] w-[110px]">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r="30" stroke="oklch(1 0 0 / 0.07)" strokeWidth="6" fill="none" />
        <circle cx="40" cy="40" r="30" stroke="oklch(0.72 0.14 155)" strokeWidth="6" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[28px] font-semibold tracking-tight tabular-nums">{value}</div>
        <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">B+ grade</div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, tone = "accent" }: { label: string; value: number; tone?: "accent" | "warning" | "danger" }) {
  const color = tone === "accent" ? "bg-accent" : tone === "warning" ? "bg-warning" : "bg-danger";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11.5px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-mono tabular-nums text-foreground/80">{value}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
