import { Heart } from "lucide-react";

export default function MarriageParticulars({ details }: { details: any }) {
  if (!details) return null;

  return (
    <div className="space-y-12 pt-6 border-t border-border mt-8">
      <div className="space-y-6">
        <h4 className="text-xl font-bold text-primary flex items-center gap-2">
          <Heart className="text-rose-500" size={20} /> Marriage Particulars
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
              Husband (Groom)
            </p>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Name</p>
              <p className="font-bold text-slate-800">{details.husband_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">ID / Passport</p>
              <p className="font-bold text-slate-800">
                {details.husband_id_passport}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Age & Status</p>
              <p className="font-bold text-slate-800">
                {details.husband_age} | {details.husband_marital_status}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Occupation</p>
              <p className="font-bold text-slate-800">
                {details.husband_occupation}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Residence</p>
              <p className="font-bold text-slate-800">
                {details.husband_residence_sub_county},{" "}
                {details.husband_residence_county}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">
              Wife (Bride)
            </p>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Name</p>
              <p className="font-bold text-slate-800">{details.wife_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">ID / Passport</p>
              <p className="font-bold text-slate-800">
                {details.wife_id_passport}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Age & Status</p>
              <p className="font-bold text-slate-800">
                {details.wife_age} | {details.wife_marital_status}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Occupation</p>
              <p className="font-bold text-slate-800">
                {details.wife_occupation}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Residence</p>
              <p className="font-bold text-slate-800">
                {details.wife_residence_sub_county},{" "}
                {details.wife_residence_county}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-amber-50/30 p-8 rounded-3xl border border-amber-100/50">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">
              Financials & Waliyy
            </p>
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium">
                <span className="text-slate-400">Waliyy:</span>{" "}
                <span className="font-bold">{details.wife_waliyy_name}</span> (
                {details.wife_waliyy_relationship})
              </p>
              <p className="text-sm font-medium">
                <span className="text-slate-400">Agreed Mahr:</span>{" "}
                <span className="font-bold">{details.agreed_mahr}</span>
              </p>
              <p className="text-sm font-medium">
                <span className="text-slate-400">Payment status:</span>{" "}
                <span className="font-bold uppercase text-amber-600">
                  {details.paid_mahr_and_deferred}
                </span>
              </p>
              {details.particulars_of_gifts && (
                <p className="text-sm font-medium">
                  <span className="text-slate-400">Gifts:</span>{" "}
                  <span className="font-bold">
                    {details.particulars_of_gifts}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
              Event & Witnesses
            </p>
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium">
                <span className="text-slate-400">Place:</span>{" "}
                <span className="font-bold">
                  {details.place_of_marriage}, {details.county_of_marriage}
                </span>
              </p>
              <p className="text-sm font-medium">
                <span className="text-slate-400">Date:</span>{" "}
                <span className="font-bold">
                  {new Date(details.date_of_marriage).toLocaleDateString(
                    undefined,
                    { dateStyle: "long" },
                  )}
                </span>
              </p>
              <p className="text-[10px] font-black uppercase text-slate-400 mt-2">
                Witnesses
              </p>
              <p className="text-xs font-bold text-slate-600">
                1. {details.witness_1_name} (ID: {details.witness_1_id})
              </p>
              <p className="text-xs font-bold text-slate-600">
                2. {details.witness_2_name} (ID: {details.witness_2_id})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
