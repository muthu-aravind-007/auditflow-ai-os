type Props = {
  id: string;
  label: string;
  top: string;
  left: string;
  severity: string;
};

export function IssueOverlay({
  id,
  label,
  top,
  left,
  severity,
}: Props) {
  const colors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-emerald-500",
  };

  return (
    <div
      className="absolute"
      style={{
        top,
        left,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-black ${colors[severity as keyof typeof colors]}`}
        >
          {id}
        </div>

        <div className="rounded-md border border-zinc-700 bg-black/90 px-3 py-1.5 text-xs text-white backdrop-blur">
          {label}
        </div>
      </div>
    </div>
  );
}