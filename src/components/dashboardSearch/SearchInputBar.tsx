import React from "react";
import { Search, X, Loader2 } from "lucide-react";

interface SearchInputBarProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  loading: boolean;
  onFocus: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchInputBar({
  inputRef,
  query,
  loading,
  onFocus,
  onChange,
  onClear,
  placeholder,
}: SearchInputBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-700 transition-colors">
        {loading ? <Loader2 className="h-4 w-4 animate-spin text-emerald-700" /> : <Search className="h-4 w-4" />}
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder || "Search platform..."}
        className="block w-full pl-10 pr-20 py-2.5 border border-slate-200/80 rounded-full leading-5 bg-white/95 text-slate-900 placeholder-slate-400 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-700/15 focus:border-emerald-700 focus:bg-white transition-all shadow-sm"
        value={query}
        onFocus={onFocus}
        onChange={onChange}
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5 pointer-events-none">
        {query ? (
          <button
            type="button"
            onClick={onClear}
            className="pointer-events-auto p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-100/90 border border-slate-200 rounded-md">
            <span className="text-[11px]">⌘</span>K
          </kbd>
        )}
      </div>
    </div>
  );
}
