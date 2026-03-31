import React from "react";
import { Plus, Search } from "lucide-react";

interface LeadershipHeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onCreateClick: () => void;
}

export function LeadershipHeader({
  searchTerm,
  onSearchChange,
  onCreateClick,
}: LeadershipHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-black font-outfit text-primary tracking-tight">
          Leadership & Governance
        </h1>
        <p className="text-foreground/50 font-medium tracking-wide">
          Manage SUPKEM officials and board members.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group flex-1 md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors"
            size={18}
          />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leaders..."
            className="w-full pl-12 pr-6 py-4 bg-white border border-border focus:border-primary/20 rounded-2xl outline-none font-medium transition-all shadow-sm"
          />
        </div>
        <button
          onClick={onCreateClick}
          className="px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 shrink-0 premium-gradient shadow-primary/20"
        >
          <Plus size={20} />
          <span>Add Leader</span>
        </button>
      </div>
    </div>
  );
}
