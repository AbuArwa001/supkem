import { CheckCircle2, ShieldAlert, Clock, HelpCircle, Ban } from "lucide-react";

export function getStatusConfig(status: string, isPaymentPending?: boolean) {
  if (isPaymentPending) {
    return {
      glow: "bg-amber-500/20",
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/20 border-amber-500/30",
      icon: ShieldAlert,
      textColor: "text-amber-400",
    };
  }

  switch (status) {
    case "Approved":
      return {
        glow: "bg-emerald-500/20",
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/20 border-emerald-500/30",
        icon: CheckCircle2,
        textColor: "text-emerald-400",
      };
    case "Rejected":
      return {
        glow: "bg-rose-500/20",
        iconColor: "text-rose-400",
        iconBg: "bg-rose-500/20 border-rose-500/30",
        icon: ShieldAlert,
        textColor: "text-rose-400",
      };
    case "Withdrawn":
      return {
        glow: "bg-rose-500/10",
        iconColor: "text-rose-400",
        iconBg: "bg-rose-500/10 border-rose-500/20",
        icon: Ban,
        textColor: "text-rose-400",
      };
    case "Under Review":
      return {
        glow: "bg-amber-500/20",
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/20 border-amber-500/30",
        icon: HelpCircle,
        textColor: "text-amber-400",
      };
    default:
      return {
        glow: "bg-amber-500/20",
        iconColor: "text-amber-400",
        iconBg: "bg-amber-500/20 border-amber-500/30",
        icon: Clock,
        textColor: "text-amber-400",
      };
  }
}
