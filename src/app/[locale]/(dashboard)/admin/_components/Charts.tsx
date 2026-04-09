"use client";

import { motion } from "framer-motion";

interface ChartData {
  count: number;
  type?: string;
  status?: string;
}

export const BarChart = ({ data }: { data: ChartData[] }) => {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-40 w-full pt-6">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 flex flex-col items-center gap-2 group relative"
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.count / max) * 100}%` }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all shadow-lg shadow-indigo-200"
          />
          <span className="text-[10px] font-bold text-slate-400 truncate w-full text-center">
            {d.type || d.status}
          </span>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {d.count} Units
          </div>
        </div>
      ))}
    </div>
  );
};

export const AreaChart = ({ data }: { data: ChartData[] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-slate-300 italic">
        No trend data
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.count), 1);
  const width = 800;
  const height = 200;

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - (d.count / max) * height,
  }));

  const pathData =
    `M ${points[0].x} ${points[0].y} ` +
    points
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(" ") +
    ` L ${width} ${height} L 0 ${height} Z`;

  const strokeData =
    `M ${points[0].x} ${points[0].y} ` +
    points
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(" ");

  return (
    <div className="w-full aspect-[4/1] relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={pathData}
          fill="url(#gradient)"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={strokeData}
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.05 }}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="white"
            stroke="#6366f1"
            strokeWidth="3"
            className="cursor-pointer hover:r-8 transition-all"
          />
        ))}
      </svg>
    </div>
  );
};
