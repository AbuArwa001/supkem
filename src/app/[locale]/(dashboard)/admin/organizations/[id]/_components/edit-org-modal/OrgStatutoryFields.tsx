"use client";

import { FileText, AlertCircle, Compass, MapPin } from "lucide-react";

interface OrgStatutoryFieldsProps {
    formData: {
        reg_number: string;
        pin_number: string;
        region: string;
        county_council: string;
    };
    errors: Record<string, string>;
    regions: any[];
    councils: any[];
    onChange: (field: string, value: string) => void;
    onRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function OrgStatutoryFields(props: OrgStatutoryFieldsProps) {
    const { formData, errors, regions, councils, onChange, onRegionChange } = props;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <FileText size={13} className="text-slate-400" /> Registration No. <span className="text-rose-500">*</span>
                    </label>
                    <input type="text" value={formData.reg_number} onChange={(e) => onChange("reg_number", e.target.value)} placeholder="e.g. REG/12345/2020" className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all ${errors.reg_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200"}`} />
                    {errors.reg_number && <p className="text-xs text-rose-500 font-semibold flex items-center gap-1"><AlertCircle size={12} /> {errors.reg_number}</p>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <FileText size={13} className="text-slate-400" /> KRA PIN No. <span className="text-rose-500">*</span>
                    </label>
                    <input type="text" value={formData.pin_number} onChange={(e) => onChange("pin_number", e.target.value.toUpperCase())} placeholder="e.g. P051234567Z" className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 font-mono font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all ${errors.pin_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200"}`} />
                    {errors.pin_number && <p className="text-xs text-rose-500 font-semibold flex items-center gap-1"><AlertCircle size={12} /> {errors.pin_number}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <Compass size={13} className="text-slate-400" /> Region
                    </label>
                    <select value={formData.region} onChange={onRegionChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer">
                        <option value="">Select Region</option>
                        {regions.map((r: any) => (<option key={r.id} value={r.id}>{r.name}</option>))}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" /> County Council <span className="text-rose-500">*</span>
                    </label>
                    <select value={formData.county_council} onChange={(e) => onChange("county_council", e.target.value)} className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer ${errors.county_council ? "border-rose-400 bg-rose-50/20" : "border-slate-200"}`}>
                        <option value="">{councils.length > 0 ? "Select County Council" : "Select Region First"}</option>
                        {councils.map((c: any) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                    {errors.county_council && <p className="text-xs text-rose-500 font-semibold flex items-center gap-1"><AlertCircle size={12} /> {errors.county_council}</p>}
                </div>
            </div>
        </>
    );
}
