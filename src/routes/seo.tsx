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

export const Route = createFileRoute("/seo")({
  component: SEOPage,
});

function SEOPage() {
  const [url, setUrl] = useState("https://vercel.com");
  const [loading, setLoading] = useState(false);

  const [seoData, setSeoData] = useState<any>(null);

  async function analyzeSEO() {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/seo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      setSeoData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConsoleLayout
      title="SEO & performance"
      eyebrow="Technical inspection"
      meta={
        <>
          <span className="flex items-center gap-1.5">
            <StatusDot />
            Live SEO analysis
          </span>

          <span>AI-powered crawler</span>
        </>
      }
    >
      {/* URL INPUT */}
      <SectionCard className="mb-6">
        <div className="flex flex-col gap-4 p-5 lg:flex-row">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="h-11 flex-1 rounded-md border border-hairline bg-background px-4 text-sm outline-none"
          />

          <button
            onClick={analyzeSEO}
            disabled={loading}
            className="h-11 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground"
          >
            {loading ? "Analyzing..." : "Analyze SEO"}
          </button>
        </div>
      </SectionCard>

      {/* SCORE CARDS */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SectionCard>
          <div className="p-5">
            <div className="text-sm text-muted-foreground">
              SEO Score
            </div>

            <div className="mt-2 text-3xl font-bold">
              {seoData?.seoScore || "--"}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="p-5">
            <div className="text-sm text-muted-foreground">
              Performance
            </div>

            <div className="mt-2 text-3xl font-bold">
              {seoData?.performance || "--"}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="p-5">
            <div className="text-sm text-muted-foreground">
              Accessibility
            </div>

            <div className="mt-2 text-3xl font-bold">
              {seoData?.accessibility || "--"}
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="p-5">
            <div className="text-sm text-muted-foreground">
              Best Practices
            </div>

            <div className="mt-2 text-3xl font-bold">
              {seoData?.bestPractices || "--"}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ISSUES */}
      <SectionCard>
        <PanelHeader
          title="Detected SEO issues"
          meta={`${seoData?.issues?.length || 0} issues found`}
        />

        <div className="divide-y divide-hairline">
          {seoData?.issues?.map((issue: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[100px_1fr_120px] gap-4 px-5 py-4"
            >
              <div className="flex items-center gap-2">
                <StatusDot
                  tone={
                    issue.severity === "high"
                      ? "danger"
                      : issue.severity === "medium"
                      ? "warning"
                      : "accent"
                  }
                />

                <span className="text-sm">
                  {issue.code}
                </span>
              </div>

              <div>
                <div className="text-sm font-medium">
                  {issue.title}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {issue.description}
                </p>
              </div>

              <div className="flex justify-end">
                <Pill>
                  {issue.type}
                </Pill>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </ConsoleLayout>
  );
}