import { Award, Mail, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Application } from "./types";

export function getDocBadge(app: Application, t: any) {
  const svc = (app.service_name || "").toLowerCase();
  const isLetter = ["study", "hajj", "umrah", "travel", "visa", "employment", "marriage"].some((k) => svc.includes(k));
  return isLetter
    ? { label: t("letter"), icon: Mail, cls: "bg-blue-50 text-blue-600 border-blue-100" }
    : { label: t("certificate"), icon: Award, cls: "bg-emerald-50 text-emerald-600 border-emerald-100" };
}

export function PaymentBadge({ app, t }: { app: Application; t: any }) {
  const serviceFee = Number((app as any).service?.fee ?? (app as any).service_fee ?? 0);
  const isFree = !isNaN(serviceFee) && serviceFee <= 0;
  const paid = app.payment?.status === "Completed" || isFree;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
        paid ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-200"
      )}
    >
      <CreditCard size={10} />
      {isFree ? "Free Service" : paid ? t("paid") : t("pendingPayment")}
    </span>
  );
}
