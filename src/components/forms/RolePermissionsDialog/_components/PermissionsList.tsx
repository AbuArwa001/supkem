"use client";

import { Loader2 } from "lucide-react";
import type { Permission } from "../types";
import { PermissionModuleMeta } from "../permissionsRegistry";
import { PermissionsModuleSection } from "./PermissionsModuleSection";

export interface GroupedModule {
  meta: PermissionModuleMeta;
  permissions: Permission[];
}

interface PermissionsListProps {
  isLoading: boolean;
  modules: GroupedModule[];
  selectedIds: (string | number)[];
  onToggle: (id: string | number) => void;
  onToggleSection: (ids: (string | number)[], selectAll: boolean) => void;
  expandedModuleIds: string[];
  onToggleExpand: (moduleId: string) => void;
}

export function PermissionsList({
  isLoading,
  modules,
  selectedIds,
  onToggle,
  onToggleSection,
  expandedModuleIds,
  onToggleExpand,
}: PermissionsListProps) {
  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="bg-primary/10 p-4 rounded-2xl">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="text-slate-500 font-black uppercase tracking-widest text-[11px]">
          Loading Operational Permissions Matrix...
        </p>
      </div>
    );
  }

  if (!modules || modules.length === 0) {
    return (
      <div className="py-12 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl">
        <p className="text-slate-500 font-bold text-sm">No matching permissions found</p>
        <p className="text-slate-400 text-xs mt-1">Try adjusting your search query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {modules.map(({ meta, permissions }) => (
        <PermissionsModuleSection
          key={meta.id}
          meta={meta}
          permissions={permissions}
          selectedIds={selectedIds}
          isExpanded={expandedModuleIds.includes(meta.id)}
          onToggleExpand={() => onToggleExpand(meta.id)}
          onToggle={onToggle}
          onToggleSection={onToggleSection}
        />
      ))}
    </div>
  );
}
