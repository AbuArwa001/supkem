// React/Next.js core
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  colSpan?: boolean;
  readOnly?: boolean;
  hint?: string;
  children?: React.ReactNode;
}

/**
 * A shared input wrapper atom. Renders label, input slot, error, and optional hint.
 * Use `children` to pass the actual <input> or <select> element.
 */
export function FormField({ label, error, colSpan, readOnly, hint, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", colSpan && "md:col-span-2")}>
      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[10px] uppercase font-black text-slate-400 ml-1 mt-1 tracking-wider">
          {hint}
        </p>
      )}
    </div>
  );
}

/** Standard CSS classes for a text input — use via cn() for error state */
export const inputBase =
  "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm";

export const inputReadOnly =
  "w-full bg-slate-100 border rounded-2xl px-6 py-4 outline-none transition-all font-bold text-slate-500 shadow-sm opacity-70 cursor-not-allowed";

export const inputError = "border-rose-300 ring-rose-100 ring-4";
export const inputNormal = "border-slate-200";

/** Helper: derive border class from error state */
export const borderFor = (error?: string) => (error ? inputError : inputNormal);
