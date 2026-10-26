"use client";

interface PilgrimGuidanceCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function PilgrimGuidanceCheckbox({ checked, onChange }: PilgrimGuidanceCheckboxProps) {
  return (
    <div className="md:col-span-2 pt-2">
      <label className="flex items-start gap-4 p-5 bg-primary/[0.02] hover:bg-primary/[0.05] rounded-2xl border border-primary/15 cursor-pointer group transition-all duration-200 select-none">
        <input
          type="checkbox"
          name="guidance_requested"
          className="w-5 h-5 mt-0.5 rounded-lg text-primary focus:ring-primary border-slate-300 cursor-pointer accent-primary"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="space-y-1">
          <span className="font-bold text-slate-800 group-hover:text-primary transition-colors text-sm">
            Request Official SUPKEM Educational & Logistical Guidance
          </span>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Receive pre-departure seminars, Hajj fiqh guidance booklets, and support contacts while in the Holy Land.
          </p>
        </div>
      </label>
    </div>
  );
}
