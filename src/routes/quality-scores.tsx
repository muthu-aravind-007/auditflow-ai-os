import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  ConsoleLayout,
  PanelHeader,
  Pill,
  SectionCard,
} from "@/components/auditflow/ConsoleLayout";

import { StatusDot } from "@/components/auditflow/Brand";

export const Route = createFileRoute("/quality-scores")({
  component: QualityScoresPage,
});

function Ring({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const radius = 26;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (value / 100) *
      circumference;

  return (
    <div className="relative h-[84px] w-[84px]">
      <svg
        viewBox="0 0 64 64"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="5"
          fill="none"
        />

        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeWidth="5"
          fill="none"
          strokeDasharray={
            circumference
          }
          strokeDashoffset={
            offset
          }
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}

function QualityScoresPage() {
  const [url, setUrl] =
    useState(
      "https://vercel.com"
    );

  const [loading, setLoading] =
    useState(false);

  const [scores, setScores] =
    useState<any[]>([]);

  const [
    selectedScore,
    setSelectedScore,
  ] = useState<any>(null);

  async function analyzeQuality() {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/quality",
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

      const data =
        await res.json();

      setScores(
        data.scores || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setSelectedScore(null);
  }

  return (
    <>
      <ConsoleLayout
        title="Quality scores"
        eyebrow="AI website grading"
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <StatusDot />
              Live quality
              inspection
            </span>

            <span>
              AI-powered scoring
              engine
            </span>
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
              onClick={
                analyzeQuality
              }
              disabled={loading}
              className="h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground"
            >
              {loading
                ? "Analyzing..."
                : "Analyze quality"}
            </button>
          </div>
        </SectionCard>

        {/* SCORES */}
        <div className="space-y-4">
          {scores.map(
            (score, index) => (
              <SectionCard
                key={index}
              >
                <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-[260px_1fr_320px]">
                  {/* LEFT */}
                  <div className="flex items-center gap-4 bg-card p-5">
                    <Ring
                      value={
                        score.value
                      }
                      color={
                        score.value >=
                        80
                          ? "#22c55e"
                          : score.value >=
                            60
                          ? "#eab308"
                          : "#ef4444"
                      }
                    />

                    <div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {score.key}
                      </div>

                      <div className="text-lg font-medium">
                        {
                          score.label
                        }
                      </div>

                      <div className="mt-1 text-sm text-muted-foreground">
                        Grade{" "}
                        {
                          score.grade
                        }
                      </div>
                    </div>
                  </div>

                  {/* MIDDLE */}
                  <div className="bg-card p-5">
                    <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                      Breakdown
                    </div>

                    <div className="space-y-4">
                      {score.breakdown.map(
                        (
                          item: any,
                          i: number
                        ) => (
                          <div
                            key={i}
                          >
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span>
                                {
                                  item.l
                                }
                              </span>

                              <span>
                                {
                                  item.v
                                }
                              </span>
                            </div>

                            <div className="h-2 rounded-full bg-white/5">
                              <div
                                className={`h-full rounded-full ${
                                  item.v >=
                                  80
                                    ? "bg-green-500"
                                    : item.v >=
                                      60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${item.v}%`,
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="bg-card p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Pill>
                        AI Insight
                      </Pill>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {
                        score.note
                      }
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedScore(
                            {
                              ...score,
                              modalType:
                                "evidence",
                            }
                          )
                        }
                        className="rounded-md border border-hairline px-3 py-2 text-sm hover:bg-white/5"
                      >
                        Evidence
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedScore(
                            {
                              ...score,
                              modalType:
                                "improve",
                            }
                          )
                        }
                        className="rounded-md border border-hairline px-3 py-2 text-sm hover:bg-white/5"
                      >
                        Improve →
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>
            )
          )}
        </div>
      </ConsoleLayout>

      {/* MODAL */}
{selectedScore && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    onClick={closeModal}
  >
    <div
      className="relative w-full max-w-[720px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* CLOSE BUTTON */}
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
          {selectedScore.label}
        </div>

        <div className="mt-1 text-sm text-muted-foreground">
          {selectedScore.modalType ===
          "evidence"
            ? "Quality evidence analysis"
            : "AI improvement recommendation"}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-h-[70vh] overflow-y-auto p-5">
        <div className="space-y-5">
          {/* SCORE */}
          <div className="flex items-center gap-4 rounded-xl border border-hairline bg-surface p-4">
            <Ring
              value={
                selectedScore.value
              }
              color={
                selectedScore.value >=
                80
                  ? "#22c55e"
                  : selectedScore.value >=
                    60
                  ? "#eab308"
                  : "#ef4444"
              }
            />

            <div>
              <div className="text-sm text-muted-foreground">
                Current grade
              </div>

              <div className="text-2xl font-semibold">
                {
                  selectedScore.grade
                }
              </div>
            </div>
          </div>

          {/* BREAKDOWN */}
          <div>
            <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              Score breakdown
            </div>

            <div className="space-y-3">
              {selectedScore.breakdown.map(
                (
                  item: any,
                  i: number
                ) => (
                  <div
                    key={i}
                    className="rounded-xl border border-hairline bg-surface p-4"
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>
                        {item.l}
                      </span>

                      <span>
                        {item.v}
                      </span>
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
                  </div>
                )
              )}
            </div>
          </div>

          {/* AI INSIGHT */}
          <div>
            <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              AI insight
            </div>

            <div className="rounded-xl border border-hairline bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
              {selectedScore.note}
            </div>
          </div>

          {/* RECOMMENDATIONS */}
          <div>
            <div className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              Recommended improvements
            </div>

            <div className="space-y-3">
              {selectedScore.breakdown.map(
                (
                  item: any,
                  i: number
                ) => (
                  <div
                    key={i}
                    className="rounded-xl border border-hairline bg-surface p-4"
                  >
                    <div className="mb-1 text-sm font-medium">
                      Improve{" "}
                      {item.l}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {item.v < 70
                        ? `Critical improvements needed in ${item.l.toLowerCase()} to increase user trust and performance.`
                        : item.v < 85
                        ? `Optimize ${item.l.toLowerCase()} for better consistency and engagement.`
                        : `${item.l} is performing well with only minor refinements recommended.`}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ACTIONS */}
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
              Apply improvements
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