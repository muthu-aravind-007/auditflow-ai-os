import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import {
  ConsoleLayout,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";

import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/conversion")({
  component: ConversionPage,
});

function ConversionPage() {
  const [url, setUrl] = useState(
    "https://vercel.com"
  );

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState<any>(null);

  const [selectedReco, setSelectedReco] =
    useState<any>(null);

  async function analyzeConversion() {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/conversion",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({ url }),
        }
      );

      const result = await res.json();

      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ConsoleLayout
        title="Conversion intelligence"
        eyebrow="CTA + funnel analysis"
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <StatusDot />
              Live conversion analysis
            </span>

            <span>
              AI-powered conversion scoring
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
              onClick={analyzeConversion}
              disabled={loading}
              className="h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground"
            >
              {loading
                ? "Analyzing..."
                : "Analyze conversion"}
            </button>
          </div>
        </SectionCard>

        {data && (
          <>
            {/* FUNNEL */}
            <SectionCard className="mb-6">
              <PanelHeader
                title="Conversion funnel"
                meta="AI estimated flow"
              />

              <div className="space-y-4 p-5">
                {data.funnel.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[140px_1fr_70px] items-center gap-4"
                    >
                      <div className="text-sm">
                        {item.stage}
                      </div>

                      <div className="h-2 rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full ${
                            item.value >= 80
                              ? "bg-green-500"
                              : item.value >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${item.value}%`,
                          }}
                        />
                      </div>

                      <div className="text-right text-sm">
                        {item.value}%
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>

            {/* CTA ANALYSIS */}
            <SectionCard className="mb-6">
              <PanelHeader
                title="CTA effectiveness"
                meta={`${data.ctas.length} CTAs detected`}
              />

              <div className="divide-y divide-hairline">
                {data.ctas.map(
                  (
                    cta: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_100px_80px_100px] items-center gap-4 px-5 py-4"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {cta.label}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {cta.note}
                        </div>
                      </div>

                      <div>
                        <Pill>
                          {cta.role}
                        </Pill>
                      </div>

                      <div className="text-right text-sm">
                        {cta.score}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            setSelectedReco({
                              title:
                                cta.label,
                              note:
                                cta.note,
                              recommendation:
                                cta.recommendation ||
                                "Increase CTA contrast and reduce competing actions.",
                              impact:
                                cta.impact ||
                                "+12% estimated CTR",
                            })
                          }
                          className="rounded-md border border-hairline px-3 py-2 text-sm hover:bg-white/5"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>

            {/* OPPORTUNITIES */}
            <SectionCard>
              <PanelHeader
                title="Improvement opportunities"
                meta="AI recommendations"
              />

              <div className="divide-y divide-hairline">
                {data.opportunities.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[100px_1fr_120px] items-start gap-4 px-5 py-4"
                    >
                      <div>
                        <Pill tone="accent">
                          {item.tag}
                        </Pill>
                      </div>

                      <div>
                        <div className="text-sm font-medium">
                          {item.title}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {item.note}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm font-semibold text-green-500">
                          {item.impact}
                        </div>

                        <button
                          onClick={() =>
                            setSelectedReco(
                              item
                            )
                          }
                          className="rounded-md border border-hairline px-3 py-2 text-sm hover:bg-white/5"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>
          </>
        )}
      </ConsoleLayout>

      {/* MODAL */}
      {selectedReco && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div>
                <div className="text-lg font-semibold">
                  {selectedReco.title}
                </div>

                <div className="mt-1 text-sm text-muted-foreground">
                  AI conversion recommendation
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedReco(
                    null
                  )
                }
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div>
                <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Problem detected
                </div>

                <div className="text-sm leading-relaxed">
                  {
                    selectedReco.note
                  }
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  AI recommendation
                </div>

                <div className="rounded-lg border border-hairline bg-surface p-4 text-sm leading-relaxed">
                  {selectedReco.recommendation ||
                    "Simplify the conversion flow and increase CTA visibility to improve user clarity."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-hairline bg-surface p-4">
                  <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Expected impact
                  </div>

                  <div className="text-lg font-semibold text-green-500">
                    {selectedReco.impact ||
                      "+10% conversion lift"}
                  </div>
                </div>

                <div className="rounded-lg border border-hairline bg-surface p-4">
                  <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Priority
                  </div>

                  <div className="text-lg font-semibold">
                    High
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button className="rounded-md border border-hairline px-4 py-2 text-sm hover:bg-white/5">
                  Export
                </button>

                <button className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  Apply recommendation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}