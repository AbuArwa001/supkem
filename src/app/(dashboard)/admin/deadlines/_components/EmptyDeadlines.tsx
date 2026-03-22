import React from "react";
import { CheckCircle2 } from "lucide-react";

interface EmptyDeadlinesProps {
  onReset: () => void;
}

/**
 * UI to display when no deadlines match the filter.
 */
export function EmptyDeadlines({ onReset }: EmptyDeadlinesProps) {
  return (
    <div className="p-20 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-[40px] space-y-4">
      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="text-emerald-500" size={40} />
      </div>
      <div className="max-w-sm mx-auto space-y-2">
        <h3 className="text-2xl font-black font-outfit text-slate-900">
          No matching deadlines
        </h3>
        <p className="text-slate-400 font-medium">
          Try adjusting your filters or search query to find what you're looking
          for.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all"
      >
        Reset Filters
      </button>
    </div>
  );
}
