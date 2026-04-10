// External libraries
import { Heart } from "lucide-react";

// Types
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

/** Reusable read-only display row for the admin particulars view */
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <p className="text-sm font-bold text-slate-400">{label}</p>
    <p className="font-bold text-slate-800">{value}</p>
  </div>
);

const PartyColumn = ({ title, color, details }: {
  title: string;
  color: string;
  details: Record<string, unknown>;
}) => (
  <div className="space-y-4">
    <p className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{title}</p>
    <DetailRow label="Name" value={details.husband_name as string ?? details.wife_name as string} />
    <DetailRow label="ID / Passport" value={details.husband_id_passport as string ?? details.wife_id_passport as string} />
    <DetailRow label="Age & Status" value={`${details.husband_age ?? details.wife_age} | ${details.husband_marital_status ?? details.wife_marital_status}`} />
    <DetailRow label="Occupation" value={details.husband_occupation as string ?? details.wife_occupation as string} />
    <DetailRow label="Residence" value={`${details.husband_residence_sub_county ?? details.wife_residence_sub_county}, ${details.husband_residence_county ?? details.wife_residence_county}`} />
  </div>
);

export default function MarriageParticulars({ details }: { details?: MarriageDetails | null }) {
  if (!details) return null;

  return (
    <div className="space-y-12 pt-6 border-t border-border mt-8">
      <h4 className="text-xl font-bold text-primary flex items-center gap-2">
        <Heart className="text-rose-500" size={20} /> Marriage Particulars
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
        <PartyColumn title="Husband (Groom)" color="text-blue-600" details={details as unknown as Record<string, unknown>} />
        <PartyColumn title="Wife (Bride)" color="text-rose-600" details={{
          wife_name: details.wife_name, wife_id_passport: details.wife_id_passport,
          wife_age: details.wife_age, wife_marital_status: details.wife_marital_status,
          wife_occupation: details.wife_occupation, wife_residence_sub_county: details.wife_residence_sub_county,
          wife_residence_county: details.wife_residence_county,
        }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-amber-50/30 p-8 rounded-3xl border border-amber-100/50">
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Financials &amp; Waliyy</p>
          <p className="text-sm font-medium"><span className="text-slate-400">Waliyy:</span> <strong>{details.wife_waliyy_name}</strong> ({details.wife_waliyy_relationship})</p>
          <p className="text-sm font-medium"><span className="text-slate-400">Agreed Mahr:</span> <strong>{details.agreed_mahr}</strong></p>
          <p className="text-sm font-medium"><span className="text-slate-400">Status:</span> <strong className="uppercase text-amber-600">{details.paid_mahr_and_deferred}</strong></p>
          {details.particulars_of_gifts && <p className="text-sm font-medium"><span className="text-slate-400">Gifts:</span> <strong>{details.particulars_of_gifts}</strong></p>}
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Event &amp; Witnesses</p>
          <p className="text-sm font-medium"><span className="text-slate-400">Place:</span> <strong>{details.place_of_marriage}, {details.county_of_marriage}</strong></p>
          <p className="text-sm font-medium"><span className="text-slate-400">Date:</span> <strong>{new Date(details.date_of_marriage).toLocaleDateString(undefined, { dateStyle: "long" })}</strong></p>
          <p className="text-[10px] font-black uppercase text-slate-400 mt-2">Witnesses</p>
          <p className="text-xs font-bold text-slate-600">1. {details.witness_1_name} (ID: {details.witness_1_id})</p>
          <p className="text-xs font-bold text-slate-600">2. {details.witness_2_name} (ID: {details.witness_2_id})</p>
        </div>
      </div>
    </div>
  );
}
