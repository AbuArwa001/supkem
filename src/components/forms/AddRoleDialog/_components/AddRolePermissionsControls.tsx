import { Search, CheckSquare, Square, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AddRolePermissionsControlsProps {
  selectedCount: number;
  totalCount: number;
  isAllExpanded: boolean;
  onExpandAll: () => void;
  isAllSelected: boolean;
  onSelectAll: () => void;
  search: string;
  setSearch: (val: string) => void;
}

export function AddRolePermissionsControls({
  selectedCount,
  totalCount,
  isAllExpanded,
  onExpandAll,
  isAllSelected,
  onSelectAll,
  search,
  setSearch,
}: AddRolePermissionsControlsProps) {
  return (
    <div className="space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
            Assign Operational Permissions
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            Expand each module dropdown to toggle individual actions or batch-assign.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-primary/10 text-primary border-none font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
            {selectedCount} Selected
          </Badge>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExpandAll}
            className="h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 border-slate-200"
          >
            {isAllExpanded ? (
              <><ChevronUp className="w-3.5 h-3.5 mr-1" />Collapse All</>
            ) : (
              <><ChevronDown className="w-3.5 h-3.5 mr-1" />Expand All</>
            )}
          </Button>

          {totalCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSelectAll}
              className="h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 hover:text-primary hover:bg-primary/5 border-slate-200"
            >
              {isAllSelected ? (
                <><Square className="w-3.5 h-3.5 mr-1 text-slate-400" />Deselect All</>
              ) : (
                <><CheckSquare className="w-3.5 h-3.5 mr-1 text-primary" />Select All</>
              )}
            </Button>
          )}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Filter by action name, module (e.g. Finance, Applications)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white font-medium text-xs transition-all shadow-none"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
