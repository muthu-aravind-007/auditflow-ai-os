import { useState } from "react";

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
});

function TrustPage() {
  const [url, setUrl] = useState(
    "https://vercel.com"
  );

  const [loading, setLoading] =
    useState(false);

  const [trustData, setTrustData] =
    useState<any>(null);

  async function analyzeTrust() {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/trust",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      const data = await res.json();

      setTrustData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConsoleLayout
      title="Trust & brand cohesion"
      eyebrow="Trust signal analysis"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot />
            Live trust inspection
          </span>

          <span>
            AI-powered trust detection
          </span>
        </>
      }
    >
      {/* URL INPUT */}
      <SectionCard className="mb-6">
        <div className="flex flex-col gap-4 p-5 lg:flex-row">
          <input
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            placeholder="https://example.com"
            className="h-11 flex-1 rounded-md border border-hairline bg-background px-4 text-sm outline-none"
          />

          <button
            onClick={analyzeTrust}
            disabled={loading}
            className="h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground"
          >
            {loading
              ? "Analyzing..."
              : "Analyze trust"}
          </button>
        </div>
      </SectionCard>

      {trustData && (
        <>
          {/* TRUST INDICATORS */}
          <SectionCard className="mb-6">
            <PanelHeader
              title="Trust indicators"
              meta={`${trustData.indicators.length} signals detected`}
            />

            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
              {trustData.indicators.map(
                (item: any, i: number) => (
                  <div
                    key={i}
                    className="bg-card p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {item.k}
                      </span>

                      <StatusDot
                        tone={item.tone}
                      />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {item.note}
                    </div>
                  </div>
                )
              )}
            </div>
          </SectionCard>

          {/* BRAND + CONTACT */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* BRAND */}
            <SectionCard>
              <PanelHeader
                title="Brand consistency"
                meta="AI scoring"
              />

              <div className="space-y-4 p-5">
                {trustData.brand.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[160px_1fr_50px] items-center gap-4"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {item.k}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {item.n}
                        </div>
                      </div>

                      <div className="h-2 rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full ${
                            item.v >= 80
                              ? "bg-green-500"
                              : item.v >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${item.v}%`,
                          }}
                        />
                      </div>

                      <div className="text-right text-sm">
                        {item.v}
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>

            {/* CONTACT */}
            <SectionCard>
              <PanelHeader
                title="Contact clarity"
                meta="Business trust"
              />

              <div className="divide-y divide-hairline">
                {trustData.contact.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[110px_1fr_30px] items-center gap-3 px-5 py-3"
                    >
                      <div className="text-sm text-muted-foreground">
                        {item.k}
                      </div>

                      <div className="text-sm">
                        {item.v}
                      </div>

                      <div className="flex justify-end">
                        <StatusDot
                          tone={item.tone}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>
          </div>

          {/* AI SUMMARY */}
          <SectionCard>
            <PanelHeader
              title="AI trust summary"
              meta="AuditFlow AI"
            />

            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
              {trustData.summary.map(
                (
                  section: any,
                  i: number
                ) => (
                  <div
                    key={i}
                    className="bg-card p-5"
                  >
                    <div className="mb-3">
                      <Pill
                        tone={section.tone}
                      >
                        {section.title}
                      </Pill>
                    </div>

                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {section.items.map(
                        (
                          item: string,
                          idx: number
                        ) => (
                          <li key={idx}>
                            • {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}
            </div>
          </SectionCard>
        </>
      )}
    </ConsoleLayout>
  );
}