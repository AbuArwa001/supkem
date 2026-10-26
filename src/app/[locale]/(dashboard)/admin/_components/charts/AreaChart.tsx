"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChartData } from "./BarChart";

export const AreaChart = ({ data }: { data: ChartData[] }) => {
  const [activePoint, setActivePoint] = useState<ChartData | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-slate-400 italic text-xs font-semibold">
        No submission velocity records available
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.count), 1);
  const width = 800;
  const height = 220;
  const paddingY = 20;

  const points = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * width;
    const y = height - paddingY - (d.count / max) * (height - paddingY * 2);
    return { x, y, data: d };
  });

  const pathData = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ") + ` L ${width} ${height} L 0 ${height} Z`;
  const strokeData = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");

  return (
    <div className="w-full relative">
      {activePoint && (
        <div className="absolute top-0 right-2 flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-black tracking-wider shadow-lg z-20">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {activePoint.date ? new Date(activePoint.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Date"}:{" "}
            <span className="text-emerald-400">{activePoint.count}</span> submissions
          </span>
        </div>
      )}

      <div className="w-full aspect-[4/1.2] relative pt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="emeraldAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#059669" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </linearGradient>
            <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#047857" floodOpacity="0.3" />
            </filter>
          </defs>

          <motion.path initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} d={pathData} fill="url(#emeraldAreaGradient)" />
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} d={strokeData} fill="none" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#emeraldGlow)" />

          {points.map((p, i) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.02 }}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="#ffffff"
              stroke="#047857"
              strokeWidth="2.5"
              className="cursor-pointer hover:r-7 transition-all"
              onMouseEnter={() => setActivePoint(p.data)}
              onMouseLeave={() => setActivePoint(null)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};
