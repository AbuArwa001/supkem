export const DetailItem = ({
  label,
  value,
  isMono = false,
}: {
  label: string;
  value: string;
  isMono?: boolean;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 py-3 sm:py-4 border-b border-slate-100 last:border-0">
    <span className="text-slate-500 font-medium text-xs sm:text-sm shrink-0">{label}</span>
    <span
      className={
        isMono
          ? "text-slate-900 font-mono text-xs font-semibold bg-slate-100 px-2 py-1 rounded break-all"
          : "text-slate-900 font-bold text-xs sm:text-sm break-words"
      }
    >
      {value}
    </span>
  </div>
);
