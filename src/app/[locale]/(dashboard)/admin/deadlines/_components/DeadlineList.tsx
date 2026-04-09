import React from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle, Info, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Deadline } from "@/services/deadline-service";

interface DeadlineListProps {
  deadlines: Deadline[];
}

/**
 * Component to render the list of deadlines.
 */
export function DeadlineList({ deadlines }: DeadlineListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {deadlines.map((item, i) => (
        <DeadlineItem key={i} item={item} index={i} />
      ))}
    </div>
  );
}

function DeadlineItem({ item, index }: { item: Deadline; index: number }) {
  const isUrgent = item.type === "danger";
  const isApproaching = item.type === "warning";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group p-6 bg-white border border-slate-100 rounded-[28px] hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div className="flex items-center gap-5">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform",
            isApproaching
              ? "bg-amber-100 text-amber-600"
              : isUrgent
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600",
          )}
        >
          {isUrgent ? (
            <AlertCircle size={24} />
          ) : isApproaching ? (
            <Clock size={24} />
          ) : (
            <Info size={24} />
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-black font-outfit text-slate-900 leading-tight">
            {item.title}
          </h3>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                isUrgent
                  ? "bg-red-50 text-red-600 border-red-100"
                  : isApproaching
                    ? "bg-amber-50 text-amber-600 border-amber-100"
                    : "bg-blue-50 text-blue-600 border-blue-100",
              )}
            >
              {isUrgent
                ? "Urgent"
                : isApproaching
                  ? "Approaching"
                  : "Scheduled"}
            </span>
            <p className="text-sm font-bold text-slate-400">{item.desc}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="px-6 py-3 bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
          Details
        </button>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all">
          <ChevronRight size={24} />
        </div>
      </div>
    </motion.div>
  );
}
