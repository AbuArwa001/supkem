"use client";

import { CheckCircle2 } from "lucide-react";
import type { Permission } from "../types";
import { PERMISSION_METADATA } from "../permissionsRegistry";
import { ActionBadge, inferAction } from "./ActionBadge";

interface PermissionCardProps {
  perm: Permission;
  isSelected: boolean;
  onToggle: () => void;
}

export function PermissionCard({ perm, isSelected, onToggle }: PermissionCardProps) {
  const meta = PERMISSION_METADATA[perm.codename];
  const friendlyLabel = meta?.label || perm.name.replace(/^Can (add|change|delete|view) /i, "").trim() || perm.codename;
  const summary = meta?.summary;
  const actionType = meta?.action || inferAction(perm.codename);

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group relative flex items-start justify-between p-3.5 rounded-xl border text-left transition-all duration-150 active:scale-[0.99] ${
        isSelected
          ? "bg-emerald-50/60 border-emerald-300/80 shadow-xs ring-1 ring-emerald-500/10"
          : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/40"
      }`}
    >
      <div className="space-y-1 pr-2 min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <ActionBadge action={actionType} />
          <span className={`text-xs font-black tracking-tight leading-snug font-outfit ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
            {friendlyLabel}
          </span>
        </div>

        {summary && (
          <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-tight">
            {summary}
          </p>
        )}

        <p className="text-[9px] font-mono font-bold text-slate-400 tracking-wider">
          {perm.codename}
        </p>
      </div>

      <div
        className={`shrink-0 mt-0.5 h-5 w-5 rounded-lg flex items-center justify-center transition-all ${
          isSelected
            ? "bg-primary text-primary-foreground shadow-xs shadow-primary/30"
            : "bg-slate-100 text-transparent border border-slate-200 group-hover:border-slate-300"
        }`}
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
      </div>
    </button>
  );
}
