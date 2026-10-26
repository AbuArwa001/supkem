"use client";

import { Lock, Info } from "lucide-react";

interface OrgBasicFieldsProps {
    orgName: string;
    type: string;
    onChange: (field: string, value: string) => void;
}

export function OrgBasicFields({ orgName, type, onChange }: OrgBasicFieldsProps) {
    return (
        <>
            <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Lock size={13} className="text-amber-600" />
                        Organization Name
                    </label>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 text-[10px] font-black uppercase tracking-wider">
                        Locked Field
                    </span>
                </div>
                <input
                    type="text"
                    disabled
                    value={orgName}
                    className="w-full bg-slate-100/80 border border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-700 text-sm cursor-not-allowed opacity-85 select-none"
                />
                <p className="text-[11px] text-amber-800/80 font-medium flex items-center gap-1.5 pt-0.5">
                    <Info size={13} className="shrink-0 text-amber-600" />
                    The registered legal name of the entity cannot be changed here. Formal name changes require SUPKEM Secretariat approval.
                </p>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                    Institutional Classification
                </label>
                <select
                    value={type}
                    onChange={(e) => onChange("type", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
                >
                    <option value="Mosque">Mosque</option>
                    <option value="School/College">School / College</option>
                    <option value="Hospital/Clinic">Hospital / Clinic</option>
                    <option value="NGO/CBO">NGO / CBO</option>
                    <option value="Community Group">Community Group</option>
                    <option value="Other">Other Community Service</option>
                </select>
            </div>
        </>
    );
}
