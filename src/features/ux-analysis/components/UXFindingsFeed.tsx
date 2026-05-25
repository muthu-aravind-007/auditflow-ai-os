import { SeverityBadge } from "./SeverityBadge";

const findings = [
  {
    id: "UX-204",
    title: "Hero headline is unclear",
    description:
      "Users may not understand the product value within the first few seconds.",
    severity: "high",
    fix: "Make the headline more specific and outcome-focused.",
  },

  {
    id: "UX-188",
    title: "Primary CTA lacks visibility",
    description:
      "The call-to-action blends into surrounding elements.",
    severity: "medium",
    fix: "Increase contrast and spacing around the CTA.",
  },

  {
    id: "UX-091",
    title: "Trust signals are too low",
    description:
      "Customer logos and testimonials appear too far below the fold.",
    severity: "low",
    fix: "Move social proof higher on the page.",
  },
];

export function UXFindingsFeed() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-5 py-4">
        <h3 className="text-sm font-medium text-white">
          UX Findings
        </h3>
      </div>

      <div className="divide-y divide-zinc-800">
        {findings.map((finding) => (
          <div
            key={finding.id}
            className="flex items-start justify-between gap-6 px-5 py-5"
          >
            <div className="max-w-2xl">
              <div className="mb-2 flex items-center gap-3">
                <p className="text-sm font-medium text-white">
                  {finding.title}
                </p>

                <SeverityBadge
                  severity={
                    finding.severity as
                      | "high"
                      | "medium"
                      | "low"
                  }
                />
              </div>

              <p className="text-sm leading-7 text-zinc-400">
                {finding.description}
              </p>

              <p className="mt-3 text-sm text-zinc-300">
                <span className="font-medium text-white">
                  Suggested fix:
                </span>{" "}
                {finding.fix}
              </p>
            </div>

            <button className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}