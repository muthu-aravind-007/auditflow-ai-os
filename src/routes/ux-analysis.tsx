import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  ConsoleLayout,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";

import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/ux-analysis")({
  component: UXAnalysisPage,
  head: () => ({
    meta: [
      { title: "UX analysis — AuditFlow" },
      {
        name: "description",
        content:
          "AI visual inspection: hierarchy, CTA visibility, readability and layout consistency.",
      },
    ],
  }),
});

function UXAnalysisPage() {
  const [url, setUrl] = useState(
    "https://linear.app"
  );

  const [loading, setLoading] =
    useState(false);

  const [previewImage, setPreviewImage] =
    useState(
      "https://image.thum.io/get/width/1200/https://linear.app"
    );

  const [selectedIssue, setSelectedIssue] =
    useState<any>(null);

  const [heuristics, setHeuristics] =
    useState<any[]>([
      {
        name: "Visual hierarchy",
        v: 88,
      },
      {
        name: "Readability",
        v: 84,
      },
      {
        name: "Affordance clarity",
        v: 76,
      },
      {
        name: "Cognitive load",
        v: 72,
      },
      {
        name: "Layout consistency",
        v: 81,
      },
      {
        name: "Content density",
        v: 69,
      },
    ]);

  const [issues, setIssues] =
    useState<any[]>([
      {
        code: "UX-204",
        tone: "danger",
        title:
          "Hero headline does not specify ICP",
        where: "/ · above the fold",
        detail:
          "Vision model finds 0 buyer-naming tokens in first 60 chars.",
        recommendation:
          "Rewrite the hero headline with a buyer-focused value proposition and stronger clarity.",
        impact:
          "+14% estimated engagement",
      },
    ]);

  const [summary, setSummary] =
    useState(
      "Strong hierarchy and readability. CTA visibility and spacing consistency need improvement."
    );

  const annotations = [
    {
      id: "A1",
      x: "16%",
      y: "22%",
      tone: "danger",
      label: "Headline ambiguity",
    },
    {
      id: "A2",
      x: "62%",
      y: "34%",
      tone: "warning",
      label: "CTA imbalance",
    },
    {
      id: "A3",
      x: "30%",
      y: "68%",
      tone: "accent",
      label: "Proof section too low",
    },
  ];

  async function analyzeWebsite() {
    try {
      setLoading(true);

      setPreviewImage(
        `https://image.thum.io/get/width/1200/${url}`
      );

      const res = await fetch(
        "http://localhost:5000/analyze",
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

      const data = await res.json();

      setHeuristics(
        data.heuristics || []
      );

      setIssues(data.issues || []);

      setSummary(
        data.summary ||
          "Website analyzed successfully. Some UX improvements recommended."
      );
    } catch (error) {
      console.error(error);

      setHeuristics([]);

      setIssues([]);

      setSummary(
        "Unable to analyze this website."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ConsoleLayout
        title="UX analysis"
        eyebrow="Visual + heuristic intelligence"
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <StatusDot />
              Live UX inspection
            </span>

            <span>
              AI-powered website intelligence
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
              onClick={analyzeWebsite}
              disabled={loading}
              className="h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Analyzing..."
                : "Analyze website"}
            </button>
          </div>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          

          {/* HEURISTICS */}
          <SectionCard>
            <PanelHeader
              title="Heuristic scoring"
              meta={`${
                heuristics?.length || 0
              } signals`}
            />

            <div className="space-y-4 p-5">
              {heuristics?.map((h) => (
                <div key={h.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{h.name}</span>

                    <span>{h.v}</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full ${
                        h.v >= 80
                          ? "bg-green-500"
                          : h.v >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${h.v}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="rounded-md border border-hairline bg-surface p-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  AI Summary ·
                </span>{" "}
                {summary}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ISSUES */}
        <SectionCard>
          <PanelHeader
            title="Detected UX issues"
            meta={`${
              issues?.length || 0
            } issues found`}
            right="sorted by severity"
          />

          <div className="divide-y divide-hairline">
            {issues?.map((i) => (
              <div
                key={i.code}
                className="grid grid-cols-[100px_1fr_160px] gap-4 px-5 py-4 hover:bg-surface/40"
              >
                <div className="flex items-center gap-2">
                  <StatusDot
                    tone={i.tone}
                  />

                  <span className="text-mono text-[11px] text-muted-foreground">
                    {i.code}
                  </span>
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {i.title}
                    </span>

                    <Pill>
                      {i.where}
                    </Pill>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {i.detail}
                  </p>
                </div>

                <div className="flex items-start justify-end gap-2">
                  <button
                    onClick={() =>
                      setSelectedIssue(i)
                    }
                    className="rounded-md border border-hairline px-3 py-2 text-sm hover:bg-white/5"
                  >
                    Evidence
                  </button>

                  <button
                    onClick={() =>
                      setSelectedIssue(i)
                    }
                    className="rounded-md border border-hairline px-3 py-2 text-sm hover:bg-white/5"
                  >
                    Fix →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </ConsoleLayout>

      {/* MODAL */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div>
                <div className="text-lg font-semibold">
                  {
                    selectedIssue.title
                  }
                </div>

                <div className="mt-1 text-sm text-muted-foreground">
                  AI UX recommendation
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedIssue(
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
                  UX issue
                </div>

                <div className="text-sm leading-relaxed">
                  {
                    selectedIssue.detail
                  }
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  AI recommendation
                </div>

                <div className="rounded-lg border border-hairline bg-surface p-4 text-sm leading-relaxed">
                  {selectedIssue.recommendation ||
                    "Improve spacing, CTA hierarchy and visual clarity for better user engagement."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-hairline bg-surface p-4">
                  <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                    Expected impact
                  </div>

                  <div className="text-lg font-semibold text-green-500">
                    {selectedIssue.impact ||
                      "+11% engagement"}
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