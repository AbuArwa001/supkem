"use client";

import { motion } from "framer-motion";
import { Building2, X, Loader2, Save } from "lucide-react";
import { OrganizationDetail } from "./types";
import { useEditOrganizationForm } from "./edit-org-modal/useEditOrganizationForm";
import { OrgBasicFields } from "./edit-org-modal/OrgBasicFields";
import { OrgStatutoryFields } from "./edit-org-modal/OrgStatutoryFields";
import { OrgContactFields } from "./edit-org-modal/OrgContactFields";

interface EditOrganizationModalProps {
    org: OrganizationDetail;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (updatedOrg: OrganizationDetail) => void;
}

export function EditOrganizationModal({ org, isOpen, onClose, onSuccess }: EditOrganizationModalProps) {
    const { loading, regions, councils, errors, formData, handleRegionChange, handleChange, handleSubmit } =
        useEditOrganizationForm(org, isOpen, onSuccess, onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="bg-white w-full max-w-2xl rounded-[24px] overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
                <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-slate-50/70 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/15 shadow-sm">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">Edit Organization Details</h3>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">Update official statutory and contact information for this entity</p>
                        </div>
                    </div>
                    <button onClick={onClose} disabled={loading} className="p-2.5 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar flex-1">
                        <OrgBasicFields orgName={org.name} type={formData.type} onChange={handleChange} />
                        <OrgStatutoryFields
                            formData={formData}
                            errors={errors}
                            regions={regions}
                            councils={councils}
                            onChange={handleChange}
                            onRegionChange={handleRegionChange}
                        />
                        <OrgContactFields formData={formData} onChange={handleChange} />
                    </div>

                    <div className="p-6 border-t border-border flex items-center justify-end gap-3 bg-slate-50/70 shrink-0">
                        <button type="button" onClick={onClose} disabled={loading} className="px-5 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all disabled:opacity-50">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer">
                            {loading ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
