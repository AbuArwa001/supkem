"use client";

import { Phone, Mail, Globe, MapPin } from "lucide-react";

interface OrgContactSectionProps {
  formData: any;
  onChange: (field: string, val: string) => void;
}

export function OrgContactSection({ formData, onChange }: OrgContactSectionProps) {
  return (
    <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/80 shadow-xs">
          <Phone size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black font-outfit text-slate-900">4. Contact & Digital Presence</h3>
          <p className="text-xs text-slate-400 font-medium">Communication channels (Optional)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600">Phone Number</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={(e) => onChange("phone_number", e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
              placeholder="+254 700 000 000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600">Official Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
              placeholder="info@institution.org"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600">Website URL</label>
          <div className="relative group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={(e) => onChange("website", e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
              placeholder="https://www.institution.org"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600">GPS Coordinates</label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input
              name="gps_location"
              value={formData.gps_location}
              onChange={(e) => onChange("gps_location", e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
              placeholder="-1.286389, 36.817223"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
