import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialsGuardianshipProps {
  data: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function FinancialsGuardianship({ data, errors, onChange }: FinancialsGuardianshipProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
          <Gift size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-800">Financials & Guardianship</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Waliyy and Mahr Information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Waliyy Name</label>
          <input
            type="text"
            placeholder="Waliyy Name"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_waliyy_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_waliyy_name}
            onChange={(e) => onChange('wife_waliyy_name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Relationship to Wife</label>
          <input
            type="text"
            placeholder="Relationship"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_waliyy_relationship ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_waliyy_relationship}
            onChange={(e) => onChange('wife_waliyy_relationship', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Agreed Mahr</label>
          <input
            type="text"
            placeholder="Value of Mahr"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.agreed_mahr ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.agreed_mahr}
            onChange={(e) => onChange('agreed_mahr', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Paid / Deferred Status</label>
          <input
            type="text"
            placeholder="Status"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.paid_mahr_and_deferred ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.paid_mahr_and_deferred}
            onChange={(e) => onChange('paid_mahr_and_deferred', e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Particulars of Gifts (if any)</label>
          <textarea
            rows={2}
            placeholder="Gifts..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
            value={data.particulars_of_gifts}
            onChange={(e) => onChange('particulars_of_gifts', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
