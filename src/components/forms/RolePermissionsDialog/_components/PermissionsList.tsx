"use client";

import { useState } from "react";
import {
    Loader2,
    CheckCircle2,
    ChevronDown,
    CheckSquare,
    Square,
    Eye,
    PlusCircle,
    Edit3,
    Trash2,
    Sparkles
} from "lucide-react";
import type { Permission } from "../types";
import {
    PermissionModuleMeta,
    PERMISSION_METADATA
} from "../permissionsRegistry";

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
    onToggleExpand
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
            {modules.map(({ meta, permissions }) => {
                const isExpanded = expandedModuleIds.includes(meta.id);
                const sectionPermIds = permissions.map(p => p.id);
                const sectionSelectedCount = permissions.filter(p => selectedIds.includes(p.id)).length;
                const isAllSectionSelected = permissions.length > 0 && sectionSelectedCount === permissions.length;
                const Icon = meta.icon;

                return (
                    <div
                        key={meta.id}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                            isExpanded
                                ? "bg-white border-slate-200 shadow-sm ring-1 ring-black/5"
                                : "bg-white border-slate-100 hover:border-slate-200 shadow-xs"
                        }`}
                    >
                        {/* Section Header (Clickable Dropdown Toggle) */}
                        <div
                            onClick={() => onToggleExpand(meta.id)}
                            className={`p-4 sm:px-5 flex items-center justify-between cursor-pointer select-none transition-colors ${
                                isExpanded ? "bg-slate-50/70" : "hover:bg-slate-50/50"
                            }`}
                        >
                            <div className="flex items-center gap-3.5 min-w-0 pr-3">
                                <div className={`shrink-0 p-2.5 rounded-xl border ${meta.badgeColor}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 font-outfit truncate">
                                            {meta.title}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 font-bold">
                                            ({permissions.length})
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5 hidden sm:block">
                                        {meta.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0">
                                {/* Section Selected Badge */}
                                <span
                                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${
                                        sectionSelectedCount > 0
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs"
                                            : "bg-slate-100 text-slate-400 border-transparent"
                                    }`}
                                >
                                    {sectionSelectedCount} / {permissions.length} Selected
                                </span>

                                {/* Section Select All Toggle */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleSection(sectionPermIds, !isAllSectionSelected);
                                    }}
                                    className="hidden sm:inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg border border-slate-200 bg-white text-[11px] font-bold text-slate-600 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                                    title={isAllSectionSelected ? "Deselect Section" : "Select Section"}
                                >
                                    {isAllSectionSelected ? (
                                        <>
                                            <Square className="w-3 h-3 text-slate-400" />
                                            <span>Clear</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckSquare className="w-3 h-3 text-primary" />
                                            <span>Select All</span>
                                        </>
                                    )}
                                </button>

                                {/* Chevron Indicator */}
                                <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 transition-transform duration-200 ${
                                        isExpanded ? "rotate-180 text-slate-700 bg-slate-200/60" : "bg-slate-100/80"
                                    }`}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Content */}
                        {isExpanded && (
                            <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 bg-slate-50/30">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {permissions.map((perm) => (
                                        <PermissionCard
                                            key={perm.id}
                                            perm={perm}
                                            isSelected={selectedIds.includes(perm.id)}
                                            onToggle={() => onToggle(perm.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function PermissionCard({
    perm,
    isSelected,
    onToggle
}: {
    perm: Permission;
    isSelected: boolean;
    onToggle: () => void;
}) {
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
                    <span
                        className={`text-xs font-black tracking-tight leading-snug font-outfit ${
                            isSelected ? "text-slate-900" : "text-slate-700"
                        }`}
                    >
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

            {/* Checkbox indicator */}
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

function ActionBadge({ action }: { action: "view" | "create" | "edit" | "delete" | "special" }) {
    switch (action) {
        case "view":
            return (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/80 text-[9px] font-black uppercase tracking-wider">
                    <Eye className="w-2.5 h-2.5" />
                    View
                </span>
            );
        case "create":
            return (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[9px] font-black uppercase tracking-wider">
                    <PlusCircle className="w-2.5 h-2.5" />
                    Create
                </span>
            );
        case "edit":
            return (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/80 text-[9px] font-black uppercase tracking-wider">
                    <Edit3 className="w-2.5 h-2.5" />
                    Edit
                </span>
            );
        case "delete":
            return (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200/80 text-[9px] font-black uppercase tracking-wider">
                    <Trash2 className="w-2.5 h-2.5" />
                    Delete
                </span>
            );
        case "special":
        default:
            return (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/80 text-[9px] font-black uppercase tracking-wider">
                    <Sparkles className="w-2.5 h-2.5" />
                    Action
                </span>
            );
    }
}

function inferAction(codename: string): "view" | "create" | "edit" | "delete" | "special" {
    if (codename.startsWith("view_")) return "view";
    if (codename.startsWith("add_")) return "create";
    if (codename.startsWith("change_")) return "edit";
    if (codename.startsWith("delete_")) return "delete";
    return "special";
}
