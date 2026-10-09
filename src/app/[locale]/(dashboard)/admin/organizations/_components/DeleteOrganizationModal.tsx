"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { Organization } from "./types";
import { useTranslations } from "next-intl";

interface DeleteOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    organization: Organization | null;
    isDeleting: boolean;
}

export function DeleteOrganizationModal({
    isOpen,
    onClose,
    onConfirm,
    organization,
    isDeleting,
}: DeleteOrganizationModalProps) {
    const t = useTranslations("Dashboard.admin.organizations");

    if (!organization) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
            <DialogContent className="max-w-md p-6 rounded-3xl sm:rounded-3xl border border-slate-200 shadow-2xl bg-white space-y-4">
                <DialogHeader className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto sm:mx-0 shadow-2xs">
                        <Trash2 size={24} />
                    </div>
                    <div className="space-y-1">
                        <DialogTitle className="text-xl font-black font-outfit text-slate-800">
                            {t("deleteModal.title")}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-500 font-medium">
                            {t("deleteModal.desc", { name: organization.name })}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                {/* Organization Details Preview Box */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold">Entity:</span>
                        <span className="font-bold text-slate-800 truncate max-w-[220px]">{organization.name}</span>
                    </div>
                    {organization.reg_number && (
                        <div className="flex justify-between">
                            <span className="text-slate-400 font-semibold">Reg No:</span>
                            <span className="font-mono text-slate-700">{organization.reg_number}</span>
                        </div>
                    )}
                    {organization.type && (
                        <div className="flex justify-between">
                            <span className="text-slate-400 font-semibold">Type:</span>
                            <span className="font-medium text-slate-700">{organization.type}</span>
                        </div>
                    )}
                </div>

                {/* Warning note */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 font-medium">
                    <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>{t("deleteModal.warning")}</span>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {t("deleteModal.cancel")}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                <span>{t("deleteModal.deleting")}</span>
                            </>
                        ) : (
                            <>
                                <Trash2 size={14} />
                                <span>{t("deleteModal.confirm")}</span>
                            </>
                        )}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
