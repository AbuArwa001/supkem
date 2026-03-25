import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WifeParticularsProps {
  data: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function WifeParticulars({ data, errors, onChange }: WifeParticularsProps) {
  return (
    <div className="space-y-8 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-110 transition-transform">
          <Heart size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-800">Wife's Particulars</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Details of the Bride</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_name}
            onChange={(e) => onChange('wife_name', e.target.value)}
          />
          {errors.wife_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_name}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">ID / Passport No.</label>
          <input
            type="text"
            placeholder="ID / Passport"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_id_passport ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_id_passport}
            onChange={(e) => onChange('wife_id_passport', e.target.value)}
          />
          {errors.wife_id_passport && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_id_passport}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Age</label>
          <input
            type="text"
            placeholder="Age"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_age ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_age}
            onChange={(e) => onChange('wife_age', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Marital Status</label>
          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
            value={data.wife_marital_status}
            onChange={(e) => onChange('wife_marital_status', e.target.value)}
          >
            <option>Virgin</option>
            <option>Divorced</option>
            <option>Widow</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Occupation</label>
          <input
            type="text"
            placeholder="Occupation"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_occupation ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_occupation}
            onChange={(e) => onChange('wife_occupation', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (County)</label>
          <input
            type="text"
            placeholder="County"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_residence_county ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_residence_county}
            onChange={(e) => onChange('wife_residence_county', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (Sub-County)</label>
          <input
            type="text"
            placeholder="Sub-County"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.wife_residence_sub_county ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.wife_residence_sub_county}
            onChange={(e) => onChange('wife_residence_sub_county', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
