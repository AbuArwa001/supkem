"use client";

import { EligibleApplication } from "@/app/[locale]/(dashboard)/admin/certificates/_types";

interface EligibleAppSelectProps {
  eligibleApplications: EligibleApplication[];
  isLoadingApplications: boolean;
  disabled: boolean;
  selectedAppId: string;
  onSelectAppId: (id: string) => void;
}

export function EligibleAppSelect({
  eligibleApplications,
  isLoadingApplications,
  disabled,
  selectedAppId,
  onSelectAppId,
}: EligibleAppSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">
        Application Reference
      </label>
      <div className="relative">
        <select
          required
          value={selectedAppId}
          onChange={(e) => onSelectAppId(e.target.value)}
          className="w-full p-4 bg-white border border-border rounded-[20px] text-sm appearance-none outline-none focus:border-primary/20 transition-all shadow-sm disabled:opacity-50"
          disabled={disabled}
        >
          <option value="">
            {isLoadingApplications ? "Loading approved applications..." : "Select approved application..."}
          </option>
          {eligibleApplications.map((app) => (
            <option key={app.id} value={app.id}>
              {app.organization_name} - {app.service_name} ({app.id.slice(0, 8)})
            </option>
          ))}
        </select>
        {!isLoadingApplications && eligibleApplications.length === 0 && (
          <p className="text-[10px] text-red-500 mt-2 ml-1">
            No approved applications pending certification.
          </p>
        )}
      </div>
    </div>
  );
}
