import { GraduationCap } from "lucide-react";

export default function EducationDetails({ details }: { details: any }) {
  if (!details) return null;

  return (
    <div className="space-y-12 pt-6 border-t border-border mt-8">
      <div className="space-y-6">
        <h4 className="text-xl font-bold text-primary flex items-center gap-2">
          <GraduationCap className="text-emerald-500" size={20} /> Education
          Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Student Name
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
              Institution
            </p>
            <p className="font-bold text-slate-800">
              {details.institution_name}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Country
            </p>
            <p className="font-bold text-slate-800">{details.country}</p>
          </div>
          <div className="md:col-span-2 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Course of Study
            </p>
            <p className="font-bold text-slate-800">
              {details.course_of_study}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
