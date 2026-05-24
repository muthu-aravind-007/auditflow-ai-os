import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-6 w-6">
        <div className="absolute inset-0 rounded-[6px] bg-accent/15 ring-1 ring-accent/40" />
        <div className="absolute inset-[5px] rounded-[3px] bg-accent" />
      </div>
      <span className="text-[15px] font-semibold tracking-tight">
        Audit<span className="text-muted-foreground">Flow</span>
      </span>
    </Link>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="text-mono inline-flex h-5 min-w-5 items-center justify-center rounded-[4px] border border-border bg-surface px-1.5 text-[10.5px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

export function StatusDot({ tone = "accent" }: { tone?: "accent" | "warning" | "danger" | "muted" }) {
  const map = {
    accent: "bg-accent shadow-[0_0_0_3px_oklch(0.72_0.14_155/0.15)]",
    warning: "bg-warning shadow-[0_0_0_3px_oklch(0.78_0.13_75/0.15)]",
    danger: "bg-danger shadow-[0_0_0_3px_oklch(0.66_0.18_22/0.15)]",
    muted: "bg-muted-foreground/60",
  };
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${map[tone]}`} />;
}
