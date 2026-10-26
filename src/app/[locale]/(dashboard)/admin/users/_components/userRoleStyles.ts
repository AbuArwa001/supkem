export function getRoleBadgeStyle(roleName: string = ""): string {
  const lower = roleName.toLowerCase();
  if (lower.includes("super")) return "border-rose-200 bg-rose-50 text-rose-700 shadow-sm";
  if (lower.includes("admin")) return "border-indigo-100 bg-indigo-50 text-indigo-700";
  if (lower.includes("officer")) return "border-purple-100 bg-purple-50 text-purple-700";
  if (lower.includes("agent")) return "border-emerald-100 bg-emerald-50 text-emerald-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}
