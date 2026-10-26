"use client";

import { Phone, Mail, Globe, MapPin } from "lucide-react";

interface OrgContactFieldsProps {
    formData: {
        phone_number: string;
        email: string;
        website: string;
        gps_location: string;
    };
    onChange: (field: string, value: string) => void;
}

export function OrgContactFields({ formData, onChange }: OrgContactFieldsProps) {
    return (
        <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-2">
                <Phone size={14} className="text-secondary" />
                Contact & Digital Presence
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <Phone size={13} className="text-slate-400" />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) => onChange("phone_number", e.target.value)}
                        placeholder="+254 700 000 000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <Mail size={13} className="text-slate-400" />
                        Official Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        placeholder="info@institution.org"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <Globe size={13} className="text-slate-400" />
                        Website
                    </label>
                    <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => onChange("website", e.target.value)}
                        placeholder="https://www.institution.org"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" />
                        GPS Coordinates
                    </label>
                    <input
                        type="text"
                        value={formData.gps_location}
                        onChange={(e) => onChange("gps_location", e.target.value)}
                        placeholder="-1.286389, 36.817223"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-mono font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
