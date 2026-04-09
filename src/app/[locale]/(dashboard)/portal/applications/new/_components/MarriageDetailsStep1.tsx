import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { HusbandParticulars } from "./marriage/HusbandParticulars";
import { WifeParticulars } from "./marriage/WifeParticulars";

interface MarriageDetailsStep1Props {
  data: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function MarriageDetailsStep1({ data, errors, onChange }: MarriageDetailsStep1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <BookOpen size={20} />
        </div>
        <div>
          <h2 className="text-xl font-black font-outfit text-slate-800 tracking-tight">Step 1: Spousal Details</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Personal Identification</p>
        </div>
      </div>

      <HusbandParticulars data={data} errors={errors} onChange={onChange} />
      <WifeParticulars data={data} errors={errors} onChange={onChange} />
    </motion.div>
  );
}
