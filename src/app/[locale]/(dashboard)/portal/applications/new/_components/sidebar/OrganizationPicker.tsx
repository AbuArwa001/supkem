import Link from "next/link";
import { FilePlus } from "lucide-react";
import { Organization } from "../types";
import { OrganizationOption } from "./OrganizationOption";

interface OrganizationPickerProps {
  organizations: Organization[];
  organizationValue: string;
  isIndividualService: boolean;
  errors: Record<string, string>;
  onOrganizationChange: (id: string) => void;
}

export function OrganizationPicker({
  organizations,
  organizationValue,
  isIndividualService,
  errors,
  onOrganizationChange,
}: OrganizationPickerProps) {
  if (organizations.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-xs text-slate-400 font-bold italic p-4 text-center border-2 border-dashed border-slate-100 rounded-2xl">
          {isIndividualService
            ? "Searching for accredited Mosques..."
            : "No organizations found."}
        </p>
        {!isIndividualService && (
          <Link
            href="/portal/organizations/new"
            className="p-8 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all font-bold bg-slate-50/30"
          >
            <FilePlus size={24} />
            <span className="text-xs">Register Organization</span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {isIndividualService && (
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
          Select a recognized Registrar
        </p>
      )}
      {organizations.map((org) => (
        <OrganizationOption
          key={org.id}
          org={org}
          isSelected={organizationValue === org.id}
          onSelect={onOrganizationChange}
        />
      ))}
      {errors.organization && (
        <p className="text-rose-500 text-[10px] font-bold mt-2 animate-pulse">
          {errors.organization}
        </p>
      )}
    </div>
  );
}
