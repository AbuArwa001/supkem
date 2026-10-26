import { Sparkles } from "lucide-react";
import { ROLE_PRESETS, RolePreset } from "../../RolePermissionsDialog/permissionsRegistry";

interface RoleTemplatesSectionProps {
  roleName: string;
  onApplyPreset: (preset: RolePreset) => void;
}

export function RoleTemplatesSection({ roleName, onApplyPreset }: RoleTemplatesSectionProps) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50/90 to-slate-100/40 border border-slate-200/70 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 font-outfit">
            Quick Role Templates
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">
          Click to auto-assign recommended operational actions
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {ROLE_PRESETS.map((preset) => {
          const isActive = roleName.toLowerCase().includes(preset.roleName.toLowerCase());
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className={`group px-3 py-1.5 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isActive
                  ? "bg-primary text-white border-primary shadow-xs shadow-primary/20"
                  : "bg-white border-slate-200 hover:border-primary/40 hover:bg-primary/5 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-tight font-outfit">
                  {preset.roleName}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md border ${
                    isActive ? "bg-white/20 text-white border-white/30" : preset.badgeColor
                  }`}
                >
                  {preset.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
