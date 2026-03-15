"use client";

import { Search, Plus } from "lucide-react";

interface VideoHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onUploadClick: () => void;
}

export const VideoHeader = ({
  searchTerm,
  onSearchChange,
  onUploadClick,
}: VideoHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
          Video Briefings
        </h1>
        <p className="text-foreground/60 font-medium">
          Manage uploaded video content and press briefings.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
          />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search videos..."
            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
          />
        </div>

        <button
          onClick={onUploadClick}
          className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2"
        >
          <Plus size={20} /> Upload Video
        </button>
      </div>
    </div>
  );
};
