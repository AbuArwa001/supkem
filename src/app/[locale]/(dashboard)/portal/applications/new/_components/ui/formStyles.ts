/** Standard CSS classes for modern luxury form inputs */
export const inputBase =
  "w-full bg-slate-50/70 border rounded-2xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all duration-200 font-semibold text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-50 placeholder:text-slate-400 text-sm";

export const inputReadOnly =
  "w-full bg-slate-100/70 border border-slate-200/80 rounded-2xl px-5 py-4 outline-none font-semibold text-slate-500 shadow-xs cursor-not-allowed text-sm select-none";

export const inputError =
  "border-rose-400 bg-rose-50/20 text-rose-950 focus:ring-rose-500/10 focus:border-rose-500";

export const inputNormal = "border-slate-200/90";

/** Helper: derive border & focus classes from error state */
export const borderFor = (error?: string) => (error ? inputError : inputNormal);
