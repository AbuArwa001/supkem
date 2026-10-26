import { CornerDownLeft, ArrowRight } from "lucide-react";
import { SearchResultItem, getSearchResultItemIcon } from "./dashboardSearchTypes";

interface SearchResultRowProps {
  item: SearchResultItem;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

export function SearchResultRow({
  item,
  isHighlighted,
  onMouseEnter,
  onClick,
}: SearchResultRowProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
        isHighlighted
          ? "bg-emerald-50/80 border border-emerald-200/60 shadow-2xs"
          : "hover:bg-slate-50 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
            isHighlighted ? "bg-white" : "bg-slate-100"
          }`}
        >
          {getSearchResultItemIcon(item.type)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-slate-900 truncate">
              {item.title}
            </p>
            {item.status && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                  item.status === "Approved"
                    ? "bg-emerald-100 text-emerald-800"
                    : item.status === "Submitted"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.status}
              </span>
            )}
          </div>
          <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
            {item.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 text-slate-400">
        {isHighlighted && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-lg border border-emerald-200/60 shadow-2xs">
            Select <CornerDownLeft size={10} />
          </span>
        )}
        <ArrowRight size={14} className={isHighlighted ? "text-emerald-700" : "text-slate-300"} />
      </div>
    </div>
  );
}
