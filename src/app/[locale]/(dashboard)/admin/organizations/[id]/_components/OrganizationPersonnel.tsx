"use client";

import { Users, Ban, Loader2, Trash2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Personnel } from "./types";

interface OrganizationPersonnelProps {
    personnel: Personnel[];
    actionLoading: string | null;
    canManage?: boolean;
    currentUserId?: string;
    onSuspendPersonnel?: (userId: string) => void;
    onRemovePersonnel?: (userId: string) => void;
    onOpenModal?: () => void;
}

export function OrganizationPersonnel({
    personnel,
    actionLoading,
    canManage = true,
    currentUserId,
    onSuspendPersonnel,
    onRemovePersonnel,
    onOpenModal
}: OrganizationPersonnelProps) {
    return (
        <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-6 overflow-hidden relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <Users size={18} />
                    </div>
                    <div>
                        <h4 className="font-black text-primary font-outfit">Assigned Personnel</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {personnel.length} {personnel.length === 1 ? "Member" : "Members"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                {personnel.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm font-medium">
                        No personnel assigned yet.
                    </div>
                ) : (
                    personnel.map((p) => {
                        const isSelf = currentUserId && p.user.id === currentUserId;
                        return (
                            <div
                                key={p.id}
                                className={cn(
                                    "flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all",
                                    p.status === 'Suspended'
                                        ? "bg-rose-50/50 border-rose-100"
                                        : "bg-white border-slate-100 hover:border-primary/20 hover:shadow-xs"
                                )}
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                                        p.status === 'Suspended'
                                            ? "bg-rose-100 text-rose-600"
                                            : p.status === 'Admin'
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-primary/10 text-primary"
                                    )}>
                                        {p.user.first_name?.[0] || ""}{p.user.last_name?.[0] || ""}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className={cn(
                                            "text-sm font-bold truncate",
                                            p.status === 'Suspended' ? "text-rose-900" : "text-slate-800"
                                        )}>
                                            {p.user.full_name} {isSelf && <span className="text-[10px] text-primary/70 font-bold">(You)</span>}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border",
                                                p.status === 'Admin'
                                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                                    : p.status === 'Suspended'
                                                    ? "bg-rose-50 text-rose-700 border-rose-200"
                                                    : "bg-slate-50 text-slate-600 border-slate-200"
                                            )}>
                                                {p.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {canManage && !isSelf && (
                                    <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100 shrink-0 ml-2">
                                        {p.status !== 'Suspended' && onSuspendPersonnel && (
                                            <button
                                                onClick={() => onSuspendPersonnel(p.user.id)}
                                                disabled={actionLoading === p.user.id}
                                                title="Suspend User Access"
                                                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:bg-white hover:text-amber-600 rounded-lg transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                                            >
                                                {actionLoading === p.user.id ? <Loader2 size={13} className="animate-spin" /> : <Ban size={13} />}
                                            </button>
                                        )}
                                        {onRemovePersonnel && (
                                            <button
                                                onClick={() => onRemovePersonnel(p.user.id)}
                                                disabled={actionLoading === p.user.id}
                                                title="Remove User Access"
                                                className="w-7 h-7 flex items-center justify-center text-slate-400 hover:bg-white hover:text-rose-600 rounded-lg transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                                            >
                                                {actionLoading === p.user.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {canManage && onOpenModal && (
                <button
                    onClick={onOpenModal}
                    className="w-full py-3.5 bg-primary/[0.04] hover:bg-primary text-primary hover:text-white border border-primary/15 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                    Add User Access <Plus size={15} className="group-hover:rotate-90 transition-transform" />
                </button>
            )}
        </div>
    );
}
