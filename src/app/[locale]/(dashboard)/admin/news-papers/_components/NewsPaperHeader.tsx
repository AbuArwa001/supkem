import React from "react";
import { Search, Plus } from "lucide-react";

interface NewsPaperHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export function NewsPaperHeader({
  searchTerm,
  onSearchChange,
  onCreateClick,
}: NewsPaperHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
          News Papers CMS
        </h1>
        <p className="text-foreground/60 font-medium">
          Manage digital newspapers and monthly issues.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
        <div className="relative group w-full sm:w-auto">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
          />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search news papers..."
            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-full sm:w-64 shadow-sm"
          />
        </div>

        <button
          onClick={onCreateClick}
          className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0 whitespace-nowrap w-full sm:w-auto"
        >
          <Plus size={20} /> Add News Paper
        </button>
      </div>
    </div>
  );
}
