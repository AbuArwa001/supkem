import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { PilgrimDetails } from "./types";

interface PilgrimDetailsFormProps {
  data: PilgrimDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export function PilgrimDetailsForm({ data, errors, onChange }: PilgrimDetailsFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="space-y-8">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform">
            <Compass size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-800">Hajj & Umrah Support</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pilgrim Particulars</p>
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
                errors.full_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.full_name}
              onChange={(e) => onChange('full_name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Passport Number</label>
            <input
              type="text"
              placeholder="Passport No."
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.passport_number ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.passport_number}
              onChange={(e) => onChange('passport_number', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Nationality</label>
            <input
              type="text"
              placeholder="Nationality"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.nationality ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.nationality}
              onChange={(e) => onChange('nationality', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Date of Birth</label>
            <input
              type="date"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.date_of_birth ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.date_of_birth}
              onChange={(e) => onChange('date_of_birth', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Expected Travel Date</label>
            <input
              type="date"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.expected_travel_date ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.expected_travel_date}
              onChange={(e) => onChange('expected_travel_date', e.target.value)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
