type Props = {
  website: string;
  score: number;
  issues: number;
};

export function UXAnalysisHeader({
  website,
  score,
  issues,
}: Props) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          UX Audit
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          {website}
        </h1>

        <div className="mt-3 flex items-center gap-4 text-sm text-zinc-400">
          <span>
            UX Score:{" "}
            <span className="font-medium text-white">{score}</span>
          </span>

          <span className="text-zinc-700">•</span>

          <span>
            Issues found:{" "}
            <span className="font-medium text-white">{issues}</span>
          </span>
        </div>
      </div>

      <button className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white transition hover:bg-zinc-800">
        New Audit
      </button>
    </div>
  );
}