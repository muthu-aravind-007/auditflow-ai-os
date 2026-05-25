type Props = {
  severity: "high" | "medium" | "low";
};

export function SeverityBadge({ severity }: Props) {
  const styles = {
    high: "bg-red-500/10 text-red-400 border-red-500/20",
    medium: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${styles[severity]}`}
    >
      {severity}
    </div>
  );
}