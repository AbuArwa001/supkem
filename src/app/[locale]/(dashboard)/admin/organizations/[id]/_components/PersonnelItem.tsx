"use client";

import { Ban, Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Personnel } from "./types";

interface PersonnelItemProps {
    personnel: Personnel;
    isSelf: boolean;
    canManage: boolean;
    actionLoading: string | null;
    onSuspendPersonnel?: (userId: string) => void;
    onRemovePersonnel?: (userId: string) => void;
}

export function PersonnelItem({
    personnel: p,
    isSelf,
    canManage,
    actionLoading,
    onSuspendPersonnel,
    onRemovePersonnel
}: PersonnelItemProps) {
    const t = useTranslations("Dashboard.admin.organizations.detail");
    const isSuspended = p.status === "Suspended";

    return (
        <div
            className={cn(
                "flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all",
                isSuspended
                    ? "bg-rose-50/50 border-rose-100"
                    : "bg-white border-slate-100 hover:border-primary/20 hover:shadow-xs"
            )}
        >
            <div className="flex items-center gap-3.5 min-w-0">
                <div
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                        isSuspended
                            ? "bg-rose-100 text-rose-600"
                            : p.status === "Admin"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-primary/10 text-primary"
                    )}
                >
                    {p.user.first_name?.[0] || ""}{p.user.last_name?.[0] || ""}
                </div>
                <div className="overflow-hidden">
                    <p className={cn("text-sm font-bold truncate", isSuspended ? "text-rose-900" : "text-slate-800")}>
                        {p.user.full_name} {isSelf && <span className="text-[10px] text-primary/70 font-bold">({t("you")})</span>}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span
                            className={cn(
                                "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border",
                                p.status === "Admin"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : isSuspended
                                    ? "bg-rose-50 text-rose-700 border-rose-200"
                                    : "bg-slate-50 text-slate-600 border-slate-200"
                            )}
                        >
                            {p.status}
                        </span>
                    </div>
                </div>
            </div>

            {canManage && !isSelf && (
                <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100 shrink-0 ms-2">
                    {!isSuspended && onSuspendPersonnel && (
                        <button
                            onClick={() => onSuspendPersonnel(p.user.id)}
                            disabled={actionLoading === p.user.id}
                            title={t("suspendUserTitle")}
                            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:bg-white hover:text-amber-600 rounded-lg transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                        >
                            {actionLoading === p.user.id ? <Loader2 size={13} className="animate-spin" /> : <Ban size={13} />}
                        </button>
                    )}
                    {onRemovePersonnel && (
                        <button
                            onClick={() => onRemovePersonnel(p.user.id)}
                            disabled={actionLoading === p.user.id}
                            title={t("removeUserTitle")}
                            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:bg-white hover:text-rose-600 rounded-lg transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                        >
                            {actionLoading === p.user.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
