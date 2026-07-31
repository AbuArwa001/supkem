import { Plane, Map } from "lucide-react";

/** Decorative footer: travel icons, divider line, and QR placeholder. */
export function LetterFooter() {
  return (
    <div className="mt-12 flex items-center justify-between gap-6 opacity-30 invert print:opacity-10">
      <div className="flex gap-4">
        <Plane size={32} />
        <Map size={32} />
      </div>
      <div className="h-px bg-slate-800 flex-1" />
      <div className="w-16 h-16 bg-slate-800 rounded-lg shrink-0 flex items-center justify-center text-white font-black text-xs">
        QR SECURE
      </div>
    </div>
  );
}
