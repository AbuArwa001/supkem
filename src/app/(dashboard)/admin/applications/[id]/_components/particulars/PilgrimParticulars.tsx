import { Plane, CalendarCheck, Briefcase, AlertCircle } from "lucide-react";

export default function PilgrimParticulars({ details }: { details: any }) {
  if (!details) return null;

  return (
    <div className="space-y-12 pt-6 border-t border-border mt-8">
      <div className="space-y-6">
        <h4 className="text-xl font-bold text-primary flex items-center gap-2">
          <Plane className="text-blue-500" size={20} /> Pilgrim Particulars
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Full Name
            </p>
            <p className="font-bold text-slate-800">{details.full_name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Passport Number
            </p>
            <p className="font-bold text-slate-800">
              {details.passport_number}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Nationality
            </p>
            <p className="font-bold text-slate-800">{details.nationality}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Date of Birth
            </p>
            <p className="font-bold text-slate-800">
              {new Date(details.date_of_birth).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Gender
            </p>
            <p className="font-bold text-slate-800">{details.gender}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Trip Type
            </p>
            <p className="font-bold text-primary uppercase">
              {details.trip_type}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-blue-50/30 p-8 rounded-3xl border border-blue-100/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
              <CalendarCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Expected Travel
              </p>
              <p className="font-bold text-slate-800">
                {new Date(details.expected_travel_date).toLocaleDateString(
                  undefined,
                  { dateStyle: "full" },
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Travel Agent
              </p>
              <p className="font-bold text-slate-800">
                {details.travel_agent_name || "Self Managed / None"}
              </p>
            </div>
          </div>
        </div>

        {details.guidance_requested && (
          <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 flex items-center gap-4">
            <AlertCircle className="text-amber-500" size={24} />
            <div>
              <p className="font-bold text-amber-900 leading-none">
                Guidance Requested
              </p>
              <p className="text-xs text-amber-700 font-medium mt-1">
                Applicant has requested educational and logistical guidance for
                this pilgrimage.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
