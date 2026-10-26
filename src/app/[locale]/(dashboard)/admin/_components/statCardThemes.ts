export interface StatCardTheme {
  iconBg: string;
  glowBg: string;
  borderAccent: string;
}

export function getStatCardTheme(lbl: string, fallbackColor?: string): StatCardTheme {
  switch (lbl) {
    case "Organizations":
      return {
        iconBg: "bg-linear-to-br from-emerald-600 to-teal-800 text-white shadow-emerald-600/30",
        glowBg: "bg-emerald-500/5 group-hover:bg-emerald-500/10",
        borderAccent: "hover:border-emerald-500/40",
      };
    case "Total Users":
      return {
        iconBg: "bg-linear-to-br from-indigo-600 to-blue-800 text-white shadow-indigo-600/30",
        glowBg: "bg-indigo-500/5 group-hover:bg-indigo-500/10",
        borderAccent: "hover:border-indigo-500/40",
      };
    case "Applications":
      return {
        iconBg: "bg-linear-to-br from-amber-500 to-amber-700 text-white shadow-amber-500/30",
        glowBg: "bg-amber-500/5 group-hover:bg-amber-500/10",
        borderAccent: "hover:border-amber-500/40",
      };
    case "Certificates":
      return {
        iconBg: "bg-linear-to-br from-teal-600 to-emerald-700 text-white shadow-teal-600/30",
        glowBg: "bg-teal-500/5 group-hover:bg-teal-500/10",
        borderAccent: "hover:border-teal-500/40",
      };
    default:
      return {
        iconBg: fallbackColor || "bg-linear-to-br from-slate-700 to-slate-900 text-white shadow-slate-900/30",
        glowBg: "bg-slate-500/5 group-hover:bg-slate-500/10",
        borderAccent: "hover:border-slate-400/40",
      };
  }
}
