import { createFileRoute } from "@tanstack/react-router";
import {
  ConsoleLayout,
  GhostButton,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — AuditFlow" },
      { name: "description", content: "Workspace, brand kit, integrations and audit defaults." },
    ],
  }),
});

function SettingsPage() {
  return (
    <ConsoleLayout
      title="Settings"
      eyebrow="Workspace · Northbeam Studio"
      meta={<><span>3 seats · EU region · plan: Studio</span></>}
      actions={<><GhostButton>Billing</GhostButton><GhostButton>API keys</GhostButton></>}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard>
          <PanelHeader title="Audit defaults" />
          <div className="divide-y divide-hairline">
            {[
              { k: "Scope", v: "Full crawl · 142 pages" },
              { k: "Viewports", v: "375 · 768 · 1440" },
              { k: "Competitor set", v: "5 peers · SaaS" },
              { k: "Retry policy", v: "2 attempts · 30s/120s backoff" },
              { k: "Schedule", v: "Weekly · Monday 06:00 UTC" },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-2 px-5 py-3 text-[12.5px]">
                <span className="text-muted-foreground">{r.k}</span>
                <span>{r.v}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <PanelHeader title="Integrations" />
          <div className="divide-y divide-hairline">
            {[
              { k: "Linear", v: "Connected", tone: "accent" as const },
              { k: "Notion", v: "Connected", tone: "accent" as const },
              { k: "Slack", v: "Connected · #audits", tone: "accent" as const },
              { k: "Figma", v: "Not connected", tone: "muted" as const },
              { k: "HubSpot", v: "Not connected", tone: "muted" as const },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-[120px_1fr_90px] items-center gap-3 px-5 py-3 text-[12.5px]">
                <span>{r.k}</span>
                <span className="text-muted-foreground">{r.v}</span>
                <div className="flex justify-end">
                  <Pill tone={r.tone}>{r.tone === "accent" ? "active" : "off"}</Pill>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </ConsoleLayout>
  );
}
