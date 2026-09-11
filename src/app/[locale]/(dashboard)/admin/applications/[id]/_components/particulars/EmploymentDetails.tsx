import { Briefcase } from "lucide-react";
import type { EmploymentDetails as EmploymentDetailsType } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

export default function EmploymentDetails({ details }: { details?: EmploymentDetailsType | null }) {
  if (!details) return null;

  return (
    <div className="space-y-12 pt-6 border-t border-border mt-8">
      <div className="space-y-6">
        <h4 className="text-xl font-bold text-primary flex items-center gap-2">
          <Briefcase className="text-slate-600" size={20} /> Employment Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50/50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-100">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Candidate Name
            </p>
            <p className="font-bold text-slate-800 break-words">{details.full_name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              ID Number
            </p>
            <p className="font-bold text-slate-800 break-words">{details.id_number}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Employer
            </p>
            <p className="font-bold text-slate-800 break-words">{details.employer_name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Position
            </p>
            <p className="font-bold text-slate-800 break-words">
              {details.position_applied_for}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
