import React from "react";
import { AlertCircle } from "lucide-react";
import { EligibleApplication } from "../_types";

interface StudioAppSelectProps {
  selectedAppId: string;
  setSelectedAppId: (id: string) => void;
  eligibleApplications: EligibleApplication[];
  isLoadingApplications: boolean;
  isIssuing: boolean;
  hasSuccessMessage: boolean;
}

export function StudioAppSelect({
  selectedAppId,
  setSelectedAppId,
  eligibleApplications,
  isLoadingApplications,
  isIssuing,
  hasSuccessMessage,
}: StudioAppSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
        Select Approved Application
      </label>
      <select
        required
        value={selectedAppId}
        onChange={(e) => setSelectedAppId(e.target.value)}
        className="w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 appearance-none outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
        disabled={isLoadingApplications || isIssuing || hasSuccessMessage}
      >
        <option value="">
          {isLoadingApplications
            ? "Loading applications..."
            : eligibleApplications.length === 0
              ? "No approved applications awaiting issuance"
              : "Choose an application..."}
        </option>
        {eligibleApplications.map((app) => (
          <option key={app.id} value={app.id}>
            {app.organization_name || app.user_name || "N/A"} - {app.service_name} ({app.service_document_type || "Standard"})
          </option>
        ))}
      </select>
      {!isLoadingApplications && eligibleApplications.length === 0 && (
        <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-start gap-2 mt-2">
          <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
          <span>
            No approved applications awaiting document issuance. Applications must be marked as <strong>Approved</strong> in the Applications manager before a certificate or letter can be issued.
          </span>
        </div>
      )}
    </div>
  );
}
