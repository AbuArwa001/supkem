import { Clock, CheckCircle2, ShieldAlert, HelpCircle, Ban } from "lucide-react";

export const getApplicationStatusStyles = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "Rejected":
      return "bg-red-50 text-red-600 border-red-100";
    case "Withdrawn":
      return "bg-slate-100 text-slate-600 border-slate-200";
    case "Under Review":
      return "bg-amber-50 text-amber-600 border-amber-100";
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

export const getApplicationStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return CheckCircle2;
    case "Rejected":
      return ShieldAlert;
    case "Withdrawn":
      return Ban;
    case "Under Review":
      return HelpCircle;
    default:
      return Clock;
  }
};
