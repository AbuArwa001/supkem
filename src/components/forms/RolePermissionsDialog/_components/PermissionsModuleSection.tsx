"use client";

import { ChevronDown, CheckSquare, Square } from "lucide-react";
import type { Permission } from "../types";
import { PermissionModuleMeta } from "../permissionsRegistry";
import { PermissionCard } from "./PermissionCard";

interface PermissionsModuleSectionProps {
  meta: PermissionModuleMeta;
  permissions: Permission[];
  selectedIds: (string | number)[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggle: (id: string | number) => void;
  onToggleSection: (ids: (string | number)[], selectAll: boolean) => void;
}

export function PermissionsModuleSection({
  meta,
  permissions,
  selectedIds,
  isExpanded,
  onToggleExpand,
  onToggle,
  onToggleSection,
}: PermissionsModuleSectionProps) {
  const sectionPermIds = permissions.map((p) => p.id);
  const selectedCount = permissions.filter((p) => selectedIds.includes(p.id)).length;
  const isAllSelected = permissions.length > 0 && selectedCount === permissions.length;
  const Icon = meta.icon;

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isExpanded ? "bg-white border-slate-200 shadow-sm ring-1 ring-black/5" : "bg-white border-slate-100 hover:border-slate-200 shadow-xs"}`}>
      <div onClick={onToggleExpand} className={`p-4 sm:px-5 flex items-center justify-between cursor-pointer select-none transition-colors ${isExpanded ? "bg-slate-50/70" : "hover:bg-slate-50/50"}`}>
        <div className="flex items-center gap-3.5 min-w-0 pr-3">
          <div className={`shrink-0 p-2.5 rounded-xl border ${meta.badgeColor}`}><Icon className="w-5 h-5" /></div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 font-outfit truncate">{meta.title}</h4>
              <span className="text-[10px] text-slate-400 font-bold">({permissions.length})</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5 hidden sm:block">{meta.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${selectedCount > 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs" : "bg-slate-100 text-slate-400 border-transparent"}`}>
            {selectedCount} / {permissions.length} Selected
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSection(sectionPermIds, !isAllSelected);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-600 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
            title={isAllSelected ? "Deselect Section" : "Select Section"}
          >
            {isAllSelected ? (<><Square className="w-3 h-3 text-slate-400" /><span>Clear</span></>) : (<><CheckSquare className="w-3 h-3 text-primary" /><span>Select All</span></>)}
          </button>

          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180 text-slate-700 bg-slate-200/60" : "bg-slate-100/80"}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {permissions.map((perm) => (
              <PermissionCard key={perm.id} perm={perm} isSelected={selectedIds.includes(perm.id)} onToggle={() => onToggle(perm.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
