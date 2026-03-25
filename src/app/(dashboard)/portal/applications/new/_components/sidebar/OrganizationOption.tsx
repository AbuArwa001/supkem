import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Organization } from "../types";

interface OrganizationOptionProps {
  org: Organization;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function OrganizationOption({
  org,
  isSelected,
  onSelect,
}: OrganizationOptionProps) {
  return (
    <label
      className={cn(
        "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group",
        isSelected
          ? "border-primary bg-primary/[0.03] shadow-lg shadow-primary/5"
          : "border-slate-50 hover:border-primary/20 bg-slate-50 border-transparent",
      )}
    >
      <input
        type="radio"
        name="organization"
        value={org.id}
        className="hidden"
        onChange={() => onSelect(org.id)}
      />
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white",
            isSelected ? "bg-primary text-white" : "text-slate-400",
          )}
        >
          <Building2 size={20} />
        </div>
        <span
          className={cn(
            "text-sm font-bold transition-colors",
            isSelected ? "text-primary" : "text-slate-600",
          )}
        >
          {org.name}
        </span>
      </div>
    </label>
  );
}
