import { Radio } from "lucide-react";

interface SocialMediaWallEmptyStateProps {
  onReset: () => void;
}

export function SocialMediaWallEmptyState({ onReset }: SocialMediaWallEmptyStateProps) {
  return (
    <div className="py-20 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-200 p-8 space-y-3">
      <Radio className="w-10 h-10 text-slate-300 mx-auto" />
      <h4 className="text-base font-bold text-slate-800">
        No posts found matching your filter
      </h4>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">
        Try clearing your search query or switching to another social platform channel.
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-sm"
      >
        Reset Filters
      </button>
    </div>
  );
}
