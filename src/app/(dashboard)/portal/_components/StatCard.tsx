"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}

export default function StatCard({ icon: Icon, label, value, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
    >
      <div className="flex items-center gap-5 relative z-10">
        <div className={cn("inline-flex p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform shadow-md", color)}>
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-1">
            {label}
          </p>
          <h3 className="text-3xl font-black font-outfit text-slate-900">
            {value}
          </h3>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-slate-100 transition-colors" />
    </motion.div>
  );
}
