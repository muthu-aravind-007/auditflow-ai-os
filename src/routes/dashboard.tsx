import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, Kbd, StatusDot } from "@/components/auditflow/Brand";
import { AuditPreview } from "@/components/auditflow/AuditPreview";
import { RecommendationsFeed, CompetitorMatrix, WorkflowTimeline } from "@/components/auditflow/Sections";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Console — AuditFlow" }, { name: "description", content: "AuditFlow operations console." }] }),
});

const navGroups = [
  {
    label: "Workspace",
    items: [
      { icon: IconHome, label: "Overview", active: true },
      { icon: IconRuns, label: "Audit runs", badge: "3" },
      { icon: IconScore, label: "Quality scores" },
      { icon: IconTimeline, label: "History" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { icon: IconUX, label: "UX analysis" },
      { icon: IconCV, label: "Conversion" },
      { icon: IconSEO, label: "SEO & performance" },
      { icon: IconTrust, label: "Trust & brand" },
      { icon: IconCompetitor, label: "Competitors" },
    ],
  },
  {
    label: "Output",
    items: [
      { icon: IconReco, label: "Recommendations" },
      { icon: IconReport, label: "Reports" },
      { icon: IconSettings, label: "Settings" },
    ],
  },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[232px] shrink-0 flex-col border-r border-hairline bg-surface/40 md:flex">
        <div className="flex h-12 items-center border-b border-hairline px-4">
          <Logo />
        </div>
        <div className="border-b border-hairline px-3 py-3">
          <button className="flex w-full items-center justify-between rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[12px] text-muted-foreground hover:bg-surface-elevated">
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-[3px] bg-accent/20 ring-1 ring-accent/40" />
              <span className="text-foreground/90">Northbeam Studio</span>
            </span>
            <span className="text-[10px]">⌄</span>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navGroups.map((g) => (
            <div key={g.label} className="mb-4">
              <div className="text-mono px-2 pb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">{g.label}</div>
              {g.items.map((it) => (
                <a key={it.label} href="#" className={`group flex items-center justify-between rounded-[6px] px-2 py-1.5 text-[12.5px] transition-colors ${it.active ? "bg-surface-elevated text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"}`}>
                  <span className="flex items-center gap-2.5">
                    <it.icon />
                    {it.label}
                  </span>
                  {it.badge && (
                    <span className="text-mono rounded-[3px] bg-accent/20 px-1.5 py-0.5 text-[10px] text-accent">{it.badge}</span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="border-t border-hairline px-3 py-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-accent/50 to-accent/10 ring-1 ring-accent/30" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-medium">Mara Chen</div>
              <div className="text-mono truncate text-[10.5px] text-muted-foreground">mara@northbeam.studio</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1">
        {/* Command bar */}
        <div className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-hairline bg-background/85 px-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[12px] text-muted-foreground hover:text-foreground">← Marketing</Link>
            <span className="text-hairline">/</span>
            <span className="text-[12.5px] font-medium">Overview</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[12px] text-muted-foreground hover:bg-surface-elevated">
              <IconSearch />
              <span>Ask AuditFlow or jump to…</span>
              <span className="mx-2 h-3 w-px bg-hairline" />
              <Kbd>⌘</Kbd><Kbd>K</Kbd>
            </button>
            <button className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[12px] text-muted-foreground hover:bg-surface-elevated">
              <IconBell />
            </button>
            <button className="rounded-md bg-accent px-3 py-1.5 text-[12.5px] font-medium text-accent-foreground hover:opacity-90">
              New audit
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-[1280px] px-6 py-6">
          {/* Title row */}
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-mono mb-1 text-[10.5px] uppercase tracking-wider text-muted-foreground">Active audit</div>
              <h1 className="text-[22px] font-medium tracking-tight">linear.app — full intelligence run</h1>
              <div className="text-mono mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><StatusDot /> Running · step 4 of 7</span>
                <span>Started 14:22 UTC</span>
                <span>Operator: M. Chen</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[12px] hover:bg-surface-elevated">Export</button>
              <button className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[12px] hover:bg-surface-elevated">Share</button>
              <button className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[12px] hover:bg-surface-elevated">Re-run</button>
            </div>
          </div>

          {/* KPI strip */}
          <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-5">
            {[
              { k: "Overall score", v: "74", s: "B+", tone: "accent" },
              { k: "Critical findings", v: "6", s: "−2 vs last", tone: "warning" },
              { k: "Recommendations", v: "24", s: "ranked", tone: "muted" },
              { k: "Est. lift", v: "+11.4%", s: "conversion", tone: "accent" },
              { k: "Time to ship", v: "2.3d", s: "median", tone: "muted" },
            ].map((m) => (
              <div key={m.k} className="bg-card p-4">
                <div className="text-mono mb-1.5 text-[10.5px] uppercase tracking-wider text-muted-foreground">{m.k}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[26px] font-medium tracking-tight tabular-nums">{m.v}</span>
                  <span className={`text-mono text-[10.5px] ${m.tone === "accent" ? "text-accent" : m.tone === "warning" ? "text-warning" : "text-muted-foreground"}`}>{m.s}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live audit preview */}
          <div className="mb-6">
            <AuditPreview />
          </div>

          {/* Recommendations + timeline */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
            <RecommendationsFeed />
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-mono mb-3 text-[10.5px] uppercase tracking-wider text-muted-foreground">Run timeline</div>
              <WorkflowTimeline />
            </div>
          </div>

          {/* Competitors */}
          <CompetitorMatrix />

          <div className="mt-10 border-t border-hairline pt-5 text-mono flex items-center justify-between text-[10.5px] text-muted-foreground">
            <span>AuditFlow console · region: eu-west-1 · build 4.2.1</span>
            <span className="flex items-center gap-1.5"><StatusDot /> All systems nominal</span>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Inline icons (1.5px stroke, 14px) ---------- */
const S = "h-3.5 w-3.5 stroke-current";
function IconHome() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>; }
function IconRuns() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M5 3v18M5 7h11l-3 3 3 3H5"/></svg>; }
function IconScore() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>; }
function IconTimeline() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M4 6h16M4 12h10M4 18h16"/></svg>; }
function IconUX() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/></svg>; }
function IconCV() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M3 17l5-5 4 4 8-8"/><path d="M14 8h6v6"/></svg>; }
function IconSEO() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><circle cx="11" cy="11" r="6"/><path d="M21 21l-5-5"/></svg>; }
function IconTrust() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>; }
function IconCompetitor() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M4 20V10M12 20V4M20 20v-7"/></svg>; }
function IconReco() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 14.8 6.9 17.2l1-5.5-4-3.9L9.6 7z"/></svg>; }
function IconReport() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/></svg>; }
function IconSettings() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2.1-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2L5.1 6 3.1 9.3l2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2.1 1.2L10 21h4l.5-2.5a7 7 0 0 0 2-1.2l2.4.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>; }
function IconSearch() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><circle cx="11" cy="11" r="6"/><path d="M21 21l-5-5"/></svg>; }
function IconBell() { return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}><path d="M6 16V10a6 6 0 1 1 12 0v6l2 2H4zM10 21h4"/></svg>; }
