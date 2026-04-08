import { Globe } from "lucide-react";
import type { TravelVisaDetails as TravelVisaDetailsType } from "@/app/(dashboard)/portal/applications/new/_types";

export default function TravelVisaDetails({ details }: { details?: TravelVisaDetailsType | null }) {
  if (!details) return null;

  return (
    <div className="space-y-12 pt-6 border-t border-border mt-8">
      <div className="space-y-6">
        <h4 className="text-xl font-bold text-primary flex items-center gap-2">
          <Globe className="text-indigo-500" size={20} /> Travel & Visa Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Traveler Name
            </p>
            <p className="font-bold text-slate-800">{details.full_name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Passport No.
            </p>
            <p className="font-bold text-slate-800">
              {details.passport_number}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Destination
            </p>
            <p className="font-bold text-slate-800">
              {details.destination_country}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Purpose
            </p>
            <p className="font-bold text-slate-800">{details.trip_purpose}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
