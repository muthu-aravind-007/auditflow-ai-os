const scores = [
  {
    label: "Readability",
    value: 82,
  },
  {
    label: "CTA Clarity",
    value: 61,
  },
  {
    label: "Visual Hierarchy",
    value: 88,
  },
  {
    label: "Trust Signals",
    value: 54,
  },
];

export function UXScoreOverview() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-white">
          UX Score Overview
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          Core usability categories
        </p>
      </div>

      <div className="space-y-5">
        {scores.map((score) => (
          <div key={score.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-300">
                {score.label}
              </span>

              <span className="text-sm font-medium text-white">
                {score.value}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${score.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}