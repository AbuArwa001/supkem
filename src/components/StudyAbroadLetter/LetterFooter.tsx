import { GraduationCap, BookOpen } from "lucide-react";

/** Decorative footer: education icons, divider line, and SUPKEM EDU badge. */
export function LetterFooter() {
  return (
    <div className="mt-12 flex items-center justify-between gap-6 opacity-30 invert print:opacity-10">
      <div className="flex gap-4">
        <GraduationCap size={32} />
        <BookOpen size={32} />
      </div>
      <div className="h-px bg-slate-800 flex-1" />
      <div className="w-16 h-16 bg-slate-800 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs">
        SUPKEM EDU
      </div>
    </div>
  );
}
