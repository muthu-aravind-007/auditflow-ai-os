import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import {
  ConsoleLayout,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";

import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const [url, setUrl] = useState(
    "https://vercel.com"
  );

  const [loading, setLoading] =
    useState(false);

  const [report, setReport] =
    useState<any>(null);

  const [
    selectedFinding,
    setSelectedFinding,
  ] = useState<any>(null);

  async function generateReport() {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/report",
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

      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setSelectedFinding(null);
  }

  return (
    <>
      <ConsoleLayout
        title="Reports"
        eyebrow="AI audit reports"
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <StatusDot />
              Live report generation
            </span>

            <span>
              AI-powered audit summary
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
  type="button"
  onClick={generateReport}
  disabled={loading}
  className="h-11 rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition-all hover:opacity-90 disabled:opacity-50"
>
              {loading
                ? "Generating..."
                : "Generate report"}
            </button>
          </div>
        </SectionCard>

        {report && (
          <>
            {/* REPORT OVERVIEW */}
            <SectionCard className="mb-6">
              <PanelHeader
                title="Audit report"
                meta={report.website}
                right={report.grade}
              />

              <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-4">
                {report.scores.map(
                  (item: any) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-hairline bg-card p-4"
                    >
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>

                      <div className="mt-2 text-2xl font-semibold">
                        {item.score}
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>

            {/* SUMMARY */}
            <SectionCard className="mb-6">
              <PanelHeader
                title="Executive summary"
                meta="AI generated"
              />

              <div className="p-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  {report.summary}
                </p>
              </div>
            </SectionCard>

            {/* ISSUES */}
            <SectionCard className="mb-6">
              <PanelHeader
                title="Key findings"
                meta={`${report.findings.length} findings`}
              />

              <div className="divide-y divide-hairline">
                {report.findings.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[120px_1fr_100px] gap-4 px-5 py-4"
                    >
                      <div>
                        <Pill
                          tone={
                            item.priority ===
                            "High"
                              ? "danger"
                              : item.priority ===
                                "Medium"
                              ? "warning"
                              : "accent"
                          }
                        >
                          {item.priority}
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

                      <div className="flex justify-end">
                        <button
  type="button"
  onClick={() => {
    setSelectedFinding(item);
  }}
  className="rounded-lg border border-hairline px-3 py-2 text-sm transition-all hover:bg-white/5"
>
                          Open
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </SectionCard>

            {/* RECOMMENDATIONS */}
            <SectionCard>
              <PanelHeader
                title="Recommendations"
                meta={`${report.recommendations.length} actions`}
              />

              <div className="divide-y divide-hairline">
                {report.recommendations.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_100px] gap-4 px-5 py-4"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {item.title}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {item.note}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold text-green-500">
                          {item.impact}
                        </span>
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
      {selectedFinding && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => {
            closeModal();
          }}
        >
          <div
            className="relative w-full max-w-[680px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => {
                closeModal();
              }}
              className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-background text-lg text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="border-b border-hairline px-5 py-4 pr-16">
              <div className="text-xl font-semibold">
                {
                  selectedFinding.title
                }
              </div>

              <div className="mt-1 text-sm text-muted-foreground">
                Detailed AI report insight
              </div>
            </div>

            {/* BODY */}
            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="space-y-5">
                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Priority
                  </div>

                  <Pill
                    tone={
                      selectedFinding.priority ===
                      "High"
                        ? "danger"
                        : selectedFinding.priority ===
                          "Medium"
                        ? "warning"
                        : "accent"
                    }
                  >
                    {
                      selectedFinding.priority
                    }
                  </Pill>
                </div>

                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Problem detected
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4 text-sm leading-relaxed">
                    {
                      selectedFinding.note
                    }
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    AI recommendation
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
                    Improve this section by simplifying the user flow, increasing clarity, and reducing friction for visitors. AI predicts measurable improvements in engagement and trust after implementation.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-hairline bg-surface p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Estimated impact
                    </div>

                    <div className="text-2xl font-semibold text-green-500">
                      +12%
                    </div>
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Confidence
                    </div>

                    <div className="text-2xl font-semibold">
                      92%
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
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
                    Apply recommendation
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