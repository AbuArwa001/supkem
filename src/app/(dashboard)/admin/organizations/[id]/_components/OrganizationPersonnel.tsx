"use client";

import { Users, Ban, Loader2, Trash2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Personnel } from "./types";

interface OrganizationPersonnelProps {
    personnel: Personnel[];
    actionLoading: string | null;
    onSuspendPersonnel: (userId: string) => void;
    onRemovePersonnel: (userId: string) => void;
    onOpenModal: () => void;
}

export function OrganizationPersonnel({
    personnel,
    actionLoading,
    onSuspendPersonnel,
    onRemovePersonnel,
    onOpenModal
}: OrganizationPersonnelProps) {
    return (
        <div className="p-8 rounded-[32px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-8 overflow-hidden relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <Users size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary font-outfit">Assigned Personnel</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{personnel.length} Members</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {personnel.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-sm font-medium">
                        No personnel assigned yet.
                    </div>
                ) : (
                    personnel.map((p) => (
                        <div
                            key={p.id}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-2xl border transition-all",
                                p.status === 'Suspended' ? "bg-red-50/50 border-red-100" : "bg-white border-slate-100 hover:border-primary/20 hover:shadow-md"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                                    p.status === 'Suspended' ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
                                )}>
                                    {p.user.first_name[0]}{p.user.last_name[0]}
                                </div>
                                <div className="overflow-hidden">
                                    <p className={cn(
                                        "text-sm font-bold truncate pr-4",
                                        p.status === 'Suspended' ? "text-red-900" : "text-slate-800"
                                    )}>
                                        {p.user.full_name}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                        {p.status === 'Suspended' && <Ban size={10} className="text-red-500" />}
                                        {p.status}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
                                {p.status !== 'Suspended' && (
                                    <button
                                        onClick={() => onSuspendPersonnel(p.user.id)}
                                        disabled={actionLoading === p.user.id}
                                        title="Suspend User Access"
                                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-white hover:text-amber-500 rounded-lg transition-all shadow-sm disabled:opacity-50"
                                    >
                                        {actionLoading === p.user.id ? <Loader2 size={14} className="animate-spin" /> : <Ban size={14} />}
                                    </button>
                                )}
                                <button
                                    onClick={() => onRemovePersonnel(p.user.id)}
                                    disabled={actionLoading === p.user.id}
                                    title="Remove User completely"
                                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-white hover:text-red-500 rounded-lg transition-all shadow-sm disabled:opacity-50"
                                >
                                    {actionLoading === p.user.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={onOpenModal}
                className="w-full py-4 bg-primary/[0.03] text-primary border border-primary/10 rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
                Add User Access <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            </button>
        </div>
    );
}
