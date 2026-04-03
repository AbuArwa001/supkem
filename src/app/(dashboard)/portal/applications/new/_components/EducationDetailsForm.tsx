import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { EducationDetails } from "./types";

interface EducationDetailsFormProps {
  data: EducationDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EducationDetailsForm({ data, errors, onChange }: EducationDetailsFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="space-y-8">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-800">Educational Endorsement</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Student Information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
            <input
              type="text"
              readOnly
              placeholder="Student Name"
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
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Institution Name</label>
            <input
              type="text"
              placeholder="University / College Name"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.institution_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.institution_name}
              onChange={(e) => onChange('institution_name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Course of Study</label>
            <input
              type="text"
              placeholder="Course"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.course_of_study ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.course_of_study}
              onChange={(e) => onChange('course_of_study', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Country</label>
            <input
              type="text"
              placeholder="Destination Country"
              className={cn(
                "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                errors.country ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
              )}
              value={data.country}
              onChange={(e) => onChange('country', e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Scholarship Details (Optional)</label>
            <textarea
              rows={2}
              placeholder="Mention details..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
              value={data.scholarship_details}
              onChange={(e) => onChange('scholarship_details', e.target.value)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
