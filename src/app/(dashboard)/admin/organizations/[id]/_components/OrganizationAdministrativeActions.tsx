"use client";

import { LayoutDashboard, Award, Loader2 } from "lucide-react";

import { OrganizationDetail } from "./types";

interface OrganizationAdministrativeActionsProps {
    org: OrganizationDetail;
    actionLoading: string | null;
    onUpdateStatus: (status: string) => void;
}

export function OrganizationAdministrativeActions({
    org,
    actionLoading,
    onUpdateStatus
}: OrganizationAdministrativeActionsProps) {
    return (
        <div className="p-8 rounded-[16px] premium-gradient text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <h4 className="font-bold text-lg flex items-center gap-3 font-outfit relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <LayoutDashboard size={18} />
                </div>
                Administrative Actions
            </h4>
            <p className="text-sm text-white/70 font-medium relative z-10">
                Issue manual certification or suspend this entity's access to the
                SUPKEM portal.
            </p>
            <div className="space-y-4 pt-4 relative z-10">
                <button
                    onClick={() => onUpdateStatus('Accredited')}
                    disabled={actionLoading === 'status_update' || org.accreditation_status === 'Accredited'}
                    className="w-full py-4 bg-white text-primary rounded-2xl font-bold text-sm hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {actionLoading === 'status_update' ? <Loader2 size={18} className="animate-spin" /> : <>Issue Certificate <Award size={18} /></>}
                </button>
                <button
                    onClick={() => onUpdateStatus('Suspended')}
                    disabled={actionLoading === 'status_update' || org.accreditation_status === 'Suspended'}
                    className="w-full py-4 bg-red-600/30 text-white border border-white/20 rounded-2xl font-bold text-sm hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-center gap-2 backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {actionLoading === 'status_update' ? <Loader2 size={18} className="animate-spin" /> : "Suspend Account"}
                </button>
            </div>
        </div>
    );
}
