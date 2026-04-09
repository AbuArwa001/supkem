import { useMemo } from "react";
import useSWR from "swr";
import { Clock, CheckCircle2, ShieldAlert, HelpCircle } from "lucide-react";
import { fetchApplications } from "./services";
import { Application } from "./types";

export function useApplicationsLogic() {
  const { data, error, isLoading } = useSWR(
    "/applications/applications/",
    fetchApplications
  );

  const applications = useMemo(() => data || [], [data]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Rejected":
        return "bg-red-50 text-red-600 border-red-100";
      case "Under Review":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return CheckCircle2;
      case "Rejected":
        return ShieldAlert;
      case "Under Review":
        return HelpCircle;
      default:
        return Clock;
    }
  };

  return {
    applications,
    error,
    isLoading,
    getStatusStyles,
    getStatusIcon,
  };
}
