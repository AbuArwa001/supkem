"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ChartData {
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
            {/* Tooltip */}
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
              className={`w-full rounded-t-xl transition-all duration-300 shadow-sm ${
                isHovered
                  ? "bg-gradient-to-t from-emerald-700 to-teal-500 shadow-emerald-600/30 -translate-y-0.5"
                  : "bg-gradient-to-t from-emerald-800 to-emerald-600 group-hover:from-emerald-700 group-hover:to-teal-500"
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

  const pathData =
    `M ${points[0].x} ${points[0].y} ` +
    points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${width} ${height} L 0 ${height} Z`;

  const strokeData =
    `M ${points[0].x} ${points[0].y} ` +
    points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ");

  return (
    <div className="w-full relative">
      {/* Active hover info readout */}
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
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
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

          {/* Area gradient fill */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            d={pathData}
            fill="url(#emeraldAreaGradient)"
          />

          {/* Line stroke */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            d={strokeData}
            fill="none"
            stroke="#047857"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#emeraldGlow)"
          />

          {/* Interactive data points */}
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
