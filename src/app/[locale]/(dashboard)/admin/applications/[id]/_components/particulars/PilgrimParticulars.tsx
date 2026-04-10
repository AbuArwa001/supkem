// External libraries
import { Plane, CalendarCheck, Briefcase, AlertCircle } from "lucide-react";

// Types
import type { PilgrimDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    <p className="font-bold text-slate-800">{value}</p>
  </div>
);

const TravelInfoCard = ({ icon: Icon, iconColor, label, value }: {
  icon: React.ElementType; iconColor: string; label: string; value: string;
}) => (
  <div className="flex items-center gap-4">
    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${iconColor} shadow-sm`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default function PilgrimParticulars({ details }: { details?: PilgrimDetails | null }) {
  if (!details) return null;

  return (
    <div className="space-y-12 pt-6 border-t border-border mt-8">
      <h4 className="text-xl font-bold text-primary flex items-center gap-2">
        <Plane className="text-blue-500" size={20} /> Pilgrim Particulars
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
        <InfoItem label="Full Name" value={details.full_name} />
        <InfoItem label="Passport Number" value={details.passport_number} />
        <InfoItem label="Nationality" value={details.nationality} />
        <InfoItem label="Date of Birth" value={new Date(details.date_of_birth).toLocaleDateString()} />
        <InfoItem label="Gender" value={details.gender} />
        <InfoItem label="Trip Type" value={details.trip_type} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-blue-50/30 p-8 rounded-3xl border border-blue-100/50">
        <TravelInfoCard icon={CalendarCheck} iconColor="text-blue-500" label="Expected Travel"
          value={new Date(details.expected_travel_date).toLocaleDateString(undefined, { dateStyle: "full" })} />
        <TravelInfoCard icon={Briefcase} iconColor="text-indigo-500" label="Travel Agent"
          value={details.travel_agent_name || "Self Managed / None"} />
      </div>

      {details.guidance_requested && (
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 flex items-center gap-4">
          <AlertCircle className="text-amber-500" size={24} />
          <div>
            <p className="font-bold text-amber-900 leading-none">Guidance Requested</p>
            <p className="text-xs text-amber-700 font-medium mt-1">
              Applicant has requested educational and logistical guidance for this pilgrimage.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
