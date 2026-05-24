import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, Kbd, StatusDot } from "@/components/auditflow/Brand";
import { AuditPreview } from "@/components/auditflow/AuditPreview";
import { SectionLabel, IntelligenceGrid, RecommendationsFeed, CompetitorMatrix, WorkflowTimeline } from "@/components/auditflow/Sections";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />

      <Section id="01" title="Intelligence modules">
        <IntelligenceGrid />
      </Section>

      <Section id="02" title="AI recommendations">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <RecommendationsFeed />
          <SideNote />
        </div>
      </Section>

      <Section id="03" title="Competitor benchmark">
        <CompetitorMatrix />
      </Section>

      <Section id="04" title="Audit workflow">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h3 className="mb-4 max-w-md text-[24px] font-medium leading-tight tracking-tight">
              Every audit is a reproducible pipeline — not a one-off scan.
            </h3>
            <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground">
              Each run captures the rendered website, scores it across six intelligence
              dimensions, and produces a ranked plan your team can ship. Re-run weekly
              to track drift, regressions and conversion impact.
            </p>
          </div>
          <WorkflowTimeline />
        </div>
      </Section>

      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1240px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-5 text-[12.5px] text-muted-foreground md:flex">
            <a href="#platform" className="hover:text-foreground">Platform</a>
            <a href="#intelligence" className="hover:text-foreground">Intelligence</a>
            <a href="#workflow" className="hover:text-foreground">Workflow</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#docs" className="hover:text-foreground">Docs</a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:bg-surface-elevated md:flex">
            <span>Search audits</span>
            <Kbd>⌘</Kbd><Kbd>K</Kbd>
          </button>
          <Link to="/dashboard" className="text-[12.5px] text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link to="/dashboard" className="rounded-md bg-accent px-3 py-1.5 text-[12.5px] font-medium text-accent-foreground transition-opacity hover:opacity-90">
            Open console
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 radial-glow" />
      <div className="relative mx-auto max-w-[1240px] px-6 pb-24 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1 text-[11.5px] text-muted-foreground">
            <StatusDot />
            <span className="text-mono uppercase tracking-wider">v4.2 · vision + reasoning pipeline</span>
          </div>
          <h1 className="text-balance text-[52px] font-medium leading-[1.05] tracking-tight md:text-[64px]">
            The AI operating system for{" "}
            <span className="text-muted-foreground">website intelligence.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
            AuditFlow runs a vision-grade audit on any website — surfacing UX friction,
            conversion leaks, trust gaps and SEO regressions, then ranks the work by
            expected business lift.
          </p>
          <div className="mt-7 flex items-center justify-center gap-2">
            <Link to="/dashboard" className="rounded-md bg-accent px-4 py-2 text-[13px] font-medium text-accent-foreground transition-opacity hover:opacity-90">
              Run an audit
            </Link>
            <a href="#workflow" className="rounded-md border border-border bg-surface px-4 py-2 text-[13px] font-medium text-foreground/90 transition-colors hover:bg-surface-elevated">
              See the workflow
            </a>
          </div>
          <div className="text-mono mt-5 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
            <span>SOC 2 Type II</span><span className="text-hairline">·</span>
            <span>EU + US regions</span><span className="text-hairline">·</span>
            <span>Used by 1,200+ agencies</span>
          </div>
        </div>

        <div className="mt-16">
          <AuditPreview />
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <SectionLabel index={id} title={title} />
        {children}
      </div>
    </section>
  );
}

function SideNote() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-6">
      <div>
        <div className="text-mono mb-3 text-[10.5px] uppercase tracking-wider text-muted-foreground">How it ranks</div>
        <h4 className="mb-3 text-[18px] font-medium tracking-tight">Lift × confidence × effort</h4>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Every recommendation is scored using observed peer performance,
          confidence intervals from your traffic baseline and a realistic
          implementation cost. The feed reflects what actually moves the needle.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-hairline bg-hairline">
        {[
          { k: "Median lift", v: "+11.4%" },
          { k: "Time to ship", v: "2.3d" },
          { k: "Adopted", v: "82%" },
        ].map((s) => (
          <div key={s.k} className="bg-card p-3">
            <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.k}</div>
            <div className="mt-1 text-[16px] font-medium tabular-nums">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section className="border-t border-hairline">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden px-6 py-24">
        <div className="absolute inset-0 radial-glow opacity-70" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-[40px] font-medium leading-tight tracking-tight">
            Audit your first website in under two minutes.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] text-muted-foreground">
            No setup, no scripts. Paste a URL and AuditFlow returns a ranked plan
            your team can ship the same day.
          </p>
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-md border border-border bg-surface p-1.5">
            <span className="text-mono pl-2 text-[12px] text-muted-foreground">https://</span>
            <input
              defaultValue="yourcompany.com"
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
            />
            <Link to="/dashboard" className="rounded-[5px] bg-accent px-3 py-1.5 text-[12.5px] font-medium text-accent-foreground">
              Run audit →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-mono text-[11px] text-muted-foreground">© 2026 AuditFlow Systems, Inc.</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
          <a href="#" className="hover:text-foreground">Platform</a>
          <a href="#" className="hover:text-foreground">Changelog</a>
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Status</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
