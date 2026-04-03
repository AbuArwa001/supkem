import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmploymentDetails } from "./types";

interface EmploymentDetailsFormProps {
  data: EmploymentDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EmploymentDetailsForm({ data, errors, onChange }: EmploymentDetailsFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="space-y-8">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-800">Employment Referral</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Candidate Information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
            <input
              type="text"
              readOnly
              placeholder="Full Name"
              className={cn(
                "w-full bg-slate-100 border rounded-2xl px-6 py-4 outline-none transition-all font-bold text-slate-500 shadow-sm opacity-70 cursor-not-allowed",
                errors.full_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.full_name}
              onChange={(e) => onChange('full_name', e.target.value)}
            />
            <p className="text-[10px] uppercase font-black text-slate-400 ml-1 mt-1 tracking-wider">To change your name, update your profile.</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">ID Number</label>
            <input
              type="text"
              placeholder="ID No."
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.id_number ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.id_number}
              onChange={(e) => onChange('id_number', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Position Applied For</label>
            <input
              type="text"
              placeholder="Position"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.position_applied_for ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.position_applied_for}
              onChange={(e) => onChange('position_applied_for', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Potential Employer Name</label>
            <input
              type="text"
              placeholder="Employer Name"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.employer_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.employer_name}
              onChange={(e) => onChange('employer_name', e.target.value)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
