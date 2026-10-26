"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface ChartData {
  count: number;
  date?: string;
  type?: string;
  status?: string;
}

export const BarChart = ({ data }: { data: ChartData[] }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex items-end gap-2.5 h-44 w-full pt-8 pb-2">
      {data.map((d, i) => {
        const heightPct = Math.max((d.count / max) * 100, 8);
        const isHovered = hoveredIdx === i;

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
          >
            <div
              className={`absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-xl shadow-xl transition-all duration-200 pointer-events-none z-50 whitespace-nowrap ${
                isHovered ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-95"
              }`}
            >
              {d.count} {d.type || d.status}
            </div>

            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${heightPct}%` }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: "easeOut" }}
              className={`w-full rounded-t-xl transition-all duration-300 shadow-xs ${
                isHovered
                  ? "bg-linear-to-t from-emerald-700 to-teal-500 shadow-emerald-600/30 -translate-y-0.5"
                  : "bg-linear-to-t from-emerald-800 to-emerald-600 group-hover:from-emerald-700 group-hover:to-teal-500"
              }`}
            />
            <span className="text-[10px] font-bold text-slate-500 truncate w-full text-center">
              {d.type || d.status}
            </span>
          </div>
        );
      })}
    </div>
  );
};
