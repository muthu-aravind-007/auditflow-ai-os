import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  ConsoleLayout,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";

import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/recommendations")({
  component: RecommendationsPage,
});

function RecommendationsPage() {
  const [url, setUrl] = useState("https://vercel.com");

  const [loading, setLoading] = useState(false);

  const [selectedRecommendation, setSelectedRecommendation] =
    useState<any>(null);

  const [recommendations, setRecommendations] = useState([
    {
      id: "R-001",
      priority: "P0",
      tag: "Conversion",
      impact: "+18%",
      business: "Revenue",
      effort: "S",
      title: "Improve primary CTA visibility",
      detail:
        "Main CTA lacks visual dominance above the fold.",
      where: "/hero",
    },

    {
      id: "R-002",
      priority: "P1",
      tag: "SEO",
      impact: "+4 positions",
      business: "Traffic",
      effort: "M",
      title: "Add structured schema markup",
      detail:
        "Pages are missing FAQ and Product schema.",
      where: "/pricing",
    },

    {
      id: "R-003",
      priority: "P2",
      tag: "UX",
      impact: "Clarity",
      business: "Engagement",
      effort: "S",
      title: "Reduce paragraph width",
      detail:
        "Large text blocks reduce readability on desktop.",
      where: "/blog",
    },
  ]);

  async function generateRecommendations() {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/recommendations",
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

      setRecommendations(
        data.recommendations || []
      );
    } catch (error) {
      console.error(error);

      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setSelectedRecommendation(null);
  }

  return (
    <>
      <ConsoleLayout
        title="Recommendations"
        eyebrow="AI improvement feed"
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <StatusDot />
              {
                recommendations.length
              }{" "}
              recommendations generated
            </span>

            <span>
              Prioritized by impact
              and effort
            </span>
          </>
        }
        actions={
          <>
            <button
              type="button"
              className="rounded-lg border border-hairline px-4 py-2 text-sm hover:bg-white/5"
            >
              Export
            </button>
          </>
        }
      >
        {/* URL INPUT */}
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
              onClick={
                generateRecommendations
              }
              disabled={loading}
              className="h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Generating..."
                : "Generate recommendations"}
            </button>
          </div>
        </SectionCard>

        {/* FEED */}
        <SectionCard>
          <PanelHeader
            title="Recommendation feed"
            meta={`${recommendations.length} actions`}
            right="sorted by impact"
          />

          <div className="divide-y divide-hairline">
            {recommendations.map(
              (r, i) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[50px_70px_120px_1fr_100px_80px_90px] gap-4 px-5 py-4 hover:bg-surface/40"
                >
                  <div className="text-sm text-muted-foreground">
                    {String(
                      i + 1
                    ).padStart(2, "0")}
                  </div>

                  <div>
                    <Pill
                      tone={
                        r.priority ===
                        "P0"
                          ? "danger"
                          : r.priority ===
                            "P1"
                          ? "warning"
                          : "accent"
                      }
                    >
                      {r.priority}
                    </Pill>
                  </div>

                  <div>
                    <Pill>
                      {r.tag}
                    </Pill>
                  </div>

                  <div>
                    <div className="text-sm font-medium">
                      {r.title}
                    </div>

                    <div className="mt-1 text-sm text-muted-foreground">
                      {r.detail}
                    </div>

                    <div className="mt-1 text-xs text-muted-foreground">
                      where · {r.where}
                    </div>
                  </div>

                  <div className="text-sm">
                    {r.business}
                  </div>

                  <div className="text-right text-sm font-medium text-accent">
                    {r.impact}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedRecommendation(
                          r
                        )
                      }
                      className="rounded-lg border border-hairline px-3 py-2 text-sm transition-all hover:bg-white/5"
                    >
                      Open →
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </SectionCard>
      </ConsoleLayout>

      {/* MODAL */}
      {selectedRecommendation && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
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
              onClick={closeModal}
              className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-background text-lg text-muted-foreground transition-all hover:bg-white/5 hover:text-white"
            >
              ✕
            </button>

            {/* HEADER */}
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

            {/* BODY */}
            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <Pill
                    tone={
                      selectedRecommendation.priority ===
                      "P0"
                        ? "danger"
                        : selectedRecommendation.priority ===
                          "P1"
                        ? "warning"
                        : "accent"
                    }
                  >
                    {
                      selectedRecommendation.priority
                    }
                  </Pill>

                  <Pill>
                    {
                      selectedRecommendation.tag
                    }
                  </Pill>
                </div>

                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Problem detected
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4 text-sm leading-relaxed">
                    {
                      selectedRecommendation.detail
                    }
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    AI recommendation
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
                    Optimize this section
                    by improving visual
                    hierarchy, reducing
                    friction, and making
                    the user journey more
                    direct. AI predicts
                    measurable gains in
                    engagement and
                    conversion after
                    implementation.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-hairline bg-surface p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Expected impact
                    </div>

                    <div className="text-2xl font-semibold text-green-500">
                      {
                        selectedRecommendation.impact
                      }
                    </div>
                  </div>

                  <div className="rounded-xl border border-hairline bg-surface p-4">
                    <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Business area
                    </div>

                    <div className="text-2xl font-semibold">
                      {
                        selectedRecommendation.business
                      }
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-hairline bg-surface p-4">
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Location
                  </div>

                  <div className="text-sm">
                    {
                      selectedRecommendation.where
                    }
                  </div>
                </div>

                <div className="rounded-xl border border-hairline bg-surface p-4">
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Estimated effort
                  </div>

                  <div className="text-sm">
                    {
                      selectedRecommendation.effort
                    }{" "}
                    · Small engineering
                    effort required
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