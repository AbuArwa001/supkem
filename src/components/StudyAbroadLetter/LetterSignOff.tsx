import { GraduationCap } from "lucide-react";

/** Director of Education signatory line and graduation-cap endorsement seal. */
export function LetterSignOff() {
  return (
    <div className="pt-10">
      <p>Yours Faithfully,</p>
      <div className="mt-8 flex items-end justify-between">
        <div className="space-y-1 border-t-2 border-slate-800 pt-4 w-64">
          <p className="font-bold uppercase leading-none">Director of Education</p>
          <p className="text-xs font-medium text-slate-500">Supreme Council of Kenya Muslims</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center p-2">
            <GraduationCap size={48} className="text-primary opacity-20" />
            <div className="absolute text-[8px] font-black text-primary/30 uppercase text-center w-20 leading-tight">
              Official<br />Endorsement<br />SUPKEM EDU
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
            SUPKEM Seal
          </p>
        </div>
      </div>
    </div>
  );
}
