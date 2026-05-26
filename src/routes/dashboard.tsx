import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  ConsoleLayout,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";

import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [url, setUrl] = useState(
    "https://vercel.com"
  );

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState<any>(null);

  const [
    selectedRecommendation,
    setSelectedRecommendation,
  ] = useState<any>(null);

  async function runAudit() {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/dashboard",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            url,
          }),
        }
      );

      const result = await res.json();

      setData({
        ...result,
        generatedAt:
          new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setSelectedRecommendation(
      null
    );
  }

  return (
    <>
      <ConsoleLayout
        title={
          data?.website ||
          "Audit dashboard"
        }
        eyebrow="Live website intelligence"
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <StatusDot />
              Real-time audit
              analysis
            </span>

            <span>
              AI-powered website
              inspection
            </span>

            {data?.generatedAt && (
              <span>
                Generated{" "}
                {
                  data.generatedAt
                }
              </span>
            )}
          </>
        }
      >
        {/* INPUT */}
        <SectionCard className="mb-6">
          <div className="flex flex-col gap-4 p-5 lg:flex-row">
            <input
              value={url}
              onChange={(e) =>
                setUrl(
                  e.target.value
                )
              }
              placeholder="https://example.com"
              className="h-11 flex-1 rounded-md border border-hairline bg-background px-4 text-sm outline-none"
            />

            <button
              type="button"
              onClick={runAudit}
              disabled={loading}
              className="h-11 rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Running audit..."
                : "Run audit"}
            </button>
          </div>
        </SectionCard>

        {!data && (
          <SectionCard>
            <div className="flex h-[320px] items-center justify-center">
              <div className="text-center">
                <div className="mb-2 text-2xl font-semibold">
                  Run your first
                  audit
                </div>

                <div className="text-muted-foreground">
                  Enter a website
                  URL above to
                  generate live AI
                  analysis
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {data && (
          <>
            {/* KPI STRIP */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
              {data.kpis?.map(
                (item: any) => (
                  <SectionCard
                    key={item.label}
                  >
                    <div className="p-5">
                      <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {
                          item.label
                        }
                      </div>

                      <div className="flex items-end gap-2">
                        <div className="text-3xl font-semibold">
                          {
                            item.value
                          }
                        </div>

                        {item.grade && (
                          <div className="pb-1 text-sm text-accent">
                            {
                              item.grade
                            }
                          </div>
                        )}
                      </div>

                      <div className="mt-1 text-sm text-muted-foreground">
                        {item.note}
                      </div>
                    </div>
                  </SectionCard>
                )
              )}
            </div>

            {/* MAIN GRID */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
              {/* LIVE FINDINGS */}
              <SectionCard>
                <PanelHeader
                  title="Live findings"
                  meta={`${
                    data.findings
                      ?.length || 0
                  } issues detected`}
                />

                <div className="divide-y divide-hairline">
                  {data.findings?.map(
                    (
                      item: any,
                      i: number
                    ) => (
                      <div
                        key={i}
                        className="px-5 py-4"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <PillTone
                            tone={
                              item.priority
                            }
                          />

                          <span className="text-sm font-medium">
                            {
                              item.title
                            }
                          </span>
                        </div>

                        <div className="text-sm leading-relaxed text-muted-foreground">
                          {item.note}
                        </div>

                        {item.page && (
                          <div className="mt-2 text-[11px] text-muted-foreground">
                            page ·{" "}
                            {
                              item.page
                            }
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </SectionCard>

              {/* QUALITY SCORES */}
              <SectionCard>
                <PanelHeader
                  title="Quality scores"
                  meta="AI generated"
                />

                <div className="space-y-4 p-5">
                  {data.scores?.map(
                    (item: any) => (
                      <div
                        key={
                          item.label
                        }
                      >
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>
                            {
                              item.label
                            }
                          </span>

                          <span className="font-medium">
                            {
                              item.score
                            }
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className={`h-full ${
                              item.score >=
                              80
                                ? "bg-green-500"
                                : item.score >=
                                  60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${item.score}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </SectionCard>
            </div>

            {/* RECOMMENDATIONS */}
            <SectionCard className="mb-6">
              <PanelHeader
                title="AI recommendations"
                meta={`${
                  data
                    .recommendations
                    ?.length || 0
                } actions`}
              />

              <div className="divide-y divide-hairline">
                {data.recommendations?.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_120px_90px] gap-4 px-5 py-4"
                    >
                      <div>
                        <div className="mb-1 text-sm font-medium">
                          {
                            item.title
                          }
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {
                            item.note
                          }
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          Impact
                        </div>

                        <div className="font-semibold text-green-500">
                          {
                            item.impact
                          }
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRecommendation(
                              item
                            )
                          }
                          className="rounded-lg border border-hairline px-3 py-2 text-sm hover:bg-white/5"
                        >
                          Open →
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>

            {/* COMPETITORS */}
            {data.competitors && (
              <SectionCard>
                <PanelHeader
                  title="Competitor comparison"
                  meta={`${data.competitors.length} competitors`}
                />

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-hairline">
                      <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                        <th className="px-5 py-3">
                          Site
                        </th>

                        <th className="px-5 py-3">
                          UX
                        </th>

                        <th className="px-5 py-3">
                          SEO
                        </th>

                        <th className="px-5 py-3">
                          Conversion
                        </th>

                        <th className="px-5 py-3">
                          Trust
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.competitors.map(
                        (
                          item: any,
                          i: number
                        ) => (
                          <tr
                            key={i}
                            className="border-b border-hairline"
                          >
                            <td className="px-5 py-4 font-medium">
                              {
                                item.name
                              }
                            </td>

                            <td className="px-5 py-4">
                              {item.ux}
                            </td>

                            <td className="px-5 py-4">
                              {
                                item.seo
                              }
                            </td>

                            <td className="px-5 py-4">
                              {
                                item.conversion
                              }
                            </td>

                            <td className="px-5 py-4">
                              {
                                item.trust
                              }
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </SectionCard>
            )}
          </>
        )}
      </ConsoleLayout>

      {/* MODAL */}
      {selectedRecommendation && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[680px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-background text-lg text-muted-foreground hover:bg-white/5 hover:text-white"
            >
              ✕
            </button>

            <div className="border-b border-hairline px-5 py-4 pr-16">
              <div className="text-xl font-semibold">
                {
                  selectedRecommendation.title
                }
              </div>

              <div className="mt-1 text-sm text-muted-foreground">
                AI recommendation
                insight
              </div>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="space-y-5">
                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Recommendation
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4 text-sm leading-relaxed">
                    {
                      selectedRecommendation.note
                    }
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-hairline bg-surface p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Estimated impact
                    </div>

                    <div className="text-2xl font-semibold text-green-500">
                      {
                        selectedRecommendation.impact
                      }
                    </div>
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Confidence
                    </div>

                    <div className="text-2xl font-semibold">
                      94%
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-lg border border-hairline px-4 py-2 text-sm hover:bg-white/5"
                  >
                    Export
                  </button>

                  <button
                    type="button"
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PillTone({
  tone,
}: {
  tone: string;
}) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${
        tone === "High"
          ? "bg-red-500/20 text-red-400"
          : tone === "Medium"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-green-500/20 text-green-400"
      }`}
    >
      {tone}
    </span>
  );
}