import { motion } from "framer-motion";
import { FileCheck } from "lucide-react";
import { FinancialsGuardianship } from "./marriage/FinancialsGuardianship";
import { EventWitnesses } from "./marriage/EventWitnesses";

interface MarriageDetailsStep2Props {
  data: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function MarriageDetailsStep2({ data, errors, onChange }: MarriageDetailsStep2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <FileCheck size={20} />
        </div>
        <div>
          <h2 className="text-xl font-black font-outfit text-slate-800 tracking-tight">Step 2: Legal & Witnesses</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Agreements & Verification</p>
        </div>
      </div>

      <FinancialsGuardianship data={data} errors={errors} onChange={onChange} />
      <EventWitnesses data={data} errors={errors} onChange={onChange} />
    </motion.div>
  );
}
