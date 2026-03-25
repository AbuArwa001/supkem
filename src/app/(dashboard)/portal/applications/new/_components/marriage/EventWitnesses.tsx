import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventWitnessesProps {
  data: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EventWitnesses({ data, errors, onChange }: EventWitnessesProps) {
  return (
    <div className="space-y-8 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100">
          <Users size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-800">Event & Witnesses</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Marriage Event Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Place of Marriage</label>
          <input
            type="text"
            placeholder="Place"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.place_of_marriage ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.place_of_marriage}
            onChange={(e) => onChange('place_of_marriage', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Date of Marriage</label>
          <input
            type="date"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.date_of_marriage ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.date_of_marriage}
            onChange={(e) => onChange('date_of_marriage', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 1 Name</label>
          <input
            type="text"
            placeholder="Name"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.witness_1_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.witness_1_name}
            onChange={(e) => onChange('witness_1_name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 1 ID/Passport</label>
          <input
            type="text"
            placeholder="ID / Passport"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.witness_1_id_passport ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.witness_1_id_passport}
            onChange={(e) => onChange('witness_1_id_passport', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 2 Name</label>
          <input
            type="text"
            placeholder="Name"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.witness_2_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.witness_2_name}
            onChange={(e) => onChange('witness_2_name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 2 ID/Passport</label>
          <input
            type="text"
            placeholder="ID / Passport"
            className={cn(
              "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
              errors.witness_2_id_passport ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
            )}
            value={data.witness_2_id_passport}
            onChange={(e) => onChange('witness_2_id_passport', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
