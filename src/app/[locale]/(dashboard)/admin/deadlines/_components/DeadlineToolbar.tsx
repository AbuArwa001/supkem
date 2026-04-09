import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeadlineToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

const FILTERS = ["all", "danger", "warning", "info"];

/**
 * Toolbar component with search and filtering for deadlines.
 */
export function DeadlineToolbar({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
}: DeadlineToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
      <div className="relative w-full md:w-96">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search deadlines..."
          className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-700 font-outfit"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-2xl w-full md:w-auto overflow-x-auto scrollbar-hide">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
              filter === f
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
