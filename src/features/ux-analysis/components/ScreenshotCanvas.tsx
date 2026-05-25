import { IssueOverlay } from "./IssueOverlay";

const issues = [
  {
    id: "A1",
    label: "Headline unclear",
    top: "22%",
    left: "18%",
    severity: "high",
  },
  {
    id: "A2",
    label: "CTA too weak",
    top: "48%",
    left: "58%",
    severity: "medium",
  },
  {
    id: "A3",
    label: "Low trust visibility",
    top: "76%",
    left: "36%",
    severity: "low",
  },
];

export function ScreenshotCanvas() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div>
          <h3 className="text-sm font-medium text-white">
            Website Preview
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            AI detected usability issues on this page
          </p>
        </div>

        <span className="text-xs text-zinc-500">
          /pricing
        </span>
      </div>

      <div className="relative">
        <img
          src="/audit-preview.png"
          alt="Website preview"
          className="w-full object-cover"
        />

        {issues.map((issue) => (
          <IssueOverlay
            key={issue.id}
            id={issue.id}
            label={issue.label}
            top={issue.top}
            left={issue.left}
            severity={issue.severity}
          />
        ))}
      </div>
    </div>
  );
}