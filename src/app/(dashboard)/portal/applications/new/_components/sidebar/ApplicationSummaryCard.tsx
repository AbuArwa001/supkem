import { motion } from "framer-motion";
import { Service } from "../types";

interface ApplicationSummaryCardProps {
  service: Service;
}

export function ApplicationSummaryCard({ service }: ApplicationSummaryCardProps) {
  const feeLabel =
    service.fee > 0 ? `KES ${Number(service.fee).toLocaleString()}` : "FREE";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-6 p-8 rounded-[20px] bg-slate-900 text-white shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <h4 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">
        Application Summary
      </h4>
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <p className="text-xs text-white/40 mb-1 font-bold">Service</p>
            <p className="font-black font-outfit text-lg">{service.name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40 mb-1 font-bold">Fee</p>
            <p className="font-black text-amber-400">{feeLabel}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
