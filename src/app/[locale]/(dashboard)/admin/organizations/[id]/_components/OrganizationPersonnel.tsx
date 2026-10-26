"use client";

import { Users, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Personnel } from "./types";
import { PersonnelItem } from "./PersonnelItem";

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
    const t = useTranslations("Dashboard.admin.organizations.detail");

    return (
        <div className="p-7 sm:p-8 rounded-[24px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-6 overflow-hidden relative">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <Users size={18} />
                    </div>
                    <div>
                        <h4 className="font-black text-primary font-outfit">{t("assignedPersonnel")}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {personnel.length} {personnel.length === 1 ? t("member") : t("members")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                {personnel.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm font-medium">
                        {t("noPersonnel")}
                    </div>
                ) : (
                    personnel.map((p) => (
                        <PersonnelItem
                            key={p.id}
                            personnel={p}
                            isSelf={Boolean(currentUserId && p.user.id === currentUserId)}
                            canManage={canManage}
                            actionLoading={actionLoading}
                            onSuspendPersonnel={onSuspendPersonnel}
                            onRemovePersonnel={onRemovePersonnel}
                        />
                    ))
                )}
            </div>

            {canManage && onOpenModal && (
                <button
                    onClick={onOpenModal}
                    className="w-full py-3.5 bg-primary/[0.04] hover:bg-primary text-primary hover:text-white border border-primary/15 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                    {t("addUserAccess")} <Plus size={15} className="group-hover:rotate-90 transition-transform" />
                </button>
            )}
        </div>
    );
}
