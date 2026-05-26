import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode, ComponentType } from "react";
import { Logo, Kbd, StatusDot } from "./Brand";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType;
  badge?: string;
};

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { to: "/dashboard", label: "Overview", icon: IconHome },
      { to: "/quality-scores", label: "Quality scores", icon: IconScore },
      { to: "/reports", label: "Reports", icon: IconReport },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { to: "/ux-analysis", label: "UX analysis", icon: IconUX },
      { to: "/conversion", label: "Conversion", icon: IconCV },
      { to: "/seo", label: "SEO & performance", icon: IconSEO },
      { to: "/trust", label: "Trust & brand", icon: IconTrust },
    ],
  },
  {
    label: "Output",
    items: [
      { to: "/recommendations", label: "Recommendations", icon: IconReco },
    ],
  },
];

export function ConsoleLayout({
  title,
  eyebrow,
  meta,
  actions,
  children,
}: {
  title: string;
  eyebrow?: string;
  meta?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[232px] shrink-0 flex-col border-r border-hairline bg-surface/40 md:flex">
        <div className="flex h-12 items-center border-b border-hairline px-4">
          <Logo />
        </div>
        <div className="border-b border-hairline px-3 py-3">
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navGroups.map((g) => (
            <div key={g.label} className="mb-4">
              <div className="text-mono px-2 pb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {g.label}
              </div>
              {g.items.map((it) => {
                const active = pathname === it.to;
                return (
                  <Link
                    key={it.label}
                    to={it.to}
                    className={`group flex items-center justify-between rounded-[6px] px-2 py-1.5 text-[12.5px] transition-colors ${
                      active
                        ? "bg-surface-elevated text-foreground"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <it.icon />
                      {it.label}
                    </span>
                    {it.badge && (
                      <span className="text-mono rounded-[3px] bg-accent/20 px-1.5 py-0.5 text-[10px] text-accent">
                        {it.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1">
        {/* Command bar */}
        <div className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-hairline bg-background/85 px-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[12px] text-muted-foreground hover:text-foreground">
              ← Marketing
            </Link>
            <span className="text-hairline">/</span>
            <span className="text-[12.5px] font-medium">{title}</span>
          </div>
        </div>

        <div className="mx-auto max-w-[1280px] px-6 py-6">
          {/* Title row */}
          <div className="mb-6 flex items-end justify-between gap-6">
            <div className="min-w-0">
              {eyebrow && (
                <div className="text-mono mb-1 text-[10.5px] uppercase tracking-wider text-muted-foreground">
                  {eyebrow}
                </div>
              )}
              <h1 className="truncate text-[22px] font-medium tracking-tight">{title}</h1>
              {meta && (
                <div className="text-mono mt-1.5 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                  {meta}
                </div>
              )}
            </div>
            {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
          </div>

          {children}

          <div className="text-mono mt-10 flex items-center justify-between border-t border-hairline pt-5 text-[10.5px] text-muted-foreground">
          </div>
        </div>
      </main>
    </div>
  );
}

/* Shared small UI atoms used across pages */

export function PanelHeader({
  title,
  meta,
  right,
  tone = "accent",
}: {
  title: string;
  meta?: string;
  right?: ReactNode;
  tone?: "accent" | "warning" | "danger" | "muted";
}) {
  return (
    <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
      <div className="flex items-center gap-2.5">
        <StatusDot tone={tone} />
        <span className="text-[13px] font-medium">{title}</span>
        {meta && <span className="text-mono text-[11px] text-muted-foreground">· {meta}</span>}
      </div>
      {right && <div className="text-mono text-[11px] text-muted-foreground">{right}</div>}
    </div>
  );
}

export function GhostButton({ children }: { children: ReactNode }) {
  return (
    <button className="rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-[12px] hover:bg-surface-elevated">
      {children}
    </button>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button className="rounded-md bg-accent px-3 py-1.5 text-[12.5px] font-medium text-accent-foreground hover:opacity-90">
      {children}
    </button>
  );
}

export function Pill({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "accent" | "warning" | "danger";
}) {
  const map = {
    muted: "border-hairline bg-surface text-muted-foreground",
    accent: "border-accent/30 bg-accent/15 text-accent",
    warning: "border-warning/30 bg-warning/15 text-warning",
    danger: "border-danger/30 bg-danger/15 text-danger",
  };
  return (
    <span
      className={`text-mono rounded-[4px] border px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export function SectionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-card ${className}`}>
      {children}
    </div>
  );
}

export function MetaSep() {
  return <span className="opacity-40">·</span>;
}

/* ---------- Inline icons (1.5px stroke, 14px) ---------- */
const S = "h-3.5 w-3.5 stroke-current";
function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function IconRuns() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M5 3v18M5 7h11l-3 3 3 3H5" />
    </svg>
  );
}
function IconScore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconUX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
    </svg>
  );
}
function IconCV() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M3 17l5-5 4 4 8-8" />
      <path d="M14 8h6v6" />
    </svg>
  );
}
function IconSEO() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <circle cx="11" cy="11" r="6" />
      <path d="M21 21l-5-5" />
    </svg>
  );
}
function IconTrust() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    </svg>
  );
}
function IconCompetitor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}
function IconReco() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M12 2l2.4 5 5.6.8-4 3.9 1 5.5L12 14.8 6.9 17.2l1-5.5-4-3.9L9.6 7z" />
    </svg>
  );
}
function IconReport() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h7M9 17h7" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2.1-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2L5.1 6 3.1 9.3l2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2.1 1.2L10 21h4l.5-2.5a7 7 0 0 0 2-1.2l2.4.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <circle cx="11" cy="11" r="6" />
      <path d="M21 21l-5-5" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" className={S}>
      <path d="M6 16V10a6 6 0 1 1 12 0v6l2 2H4zM10 21h4" />
    </svg>
  );
}
