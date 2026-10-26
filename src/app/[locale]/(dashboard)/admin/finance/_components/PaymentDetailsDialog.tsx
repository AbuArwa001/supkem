import React from "react";
import { Receipt, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { PaymentRecord } from "./financeTypes";
import { PaymentDetailsFields } from "./PaymentDetailsFields";

interface PaymentDetailsDialogProps {
  payment: PaymentRecord | null;
  onClose: () => void;
  isCheckingStatus: boolean;
  onCheckStatus: (id: string) => void;
}

export function PaymentDetailsDialog({
  payment,
  onClose,
  isCheckingStatus,
  onCheckStatus,
}: PaymentDetailsDialogProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
    <Dialog open={Boolean(payment)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-premium rounded-[2rem] bg-white">
        {payment && (
          <div>
            <div className="p-8 pb-6 border-b border-slate-100 bg-linear-to-r from-emerald-50/40 via-teal-50/20 to-white flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-primary/10 text-primary">
                  <Receipt size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">{t("paymentReceiptAudit")}</h2>
                  <p className="text-slate-400 font-mono text-xs mt-0.5">{payment.receipt_number || payment.checkout_request_id || payment.id}</p>
                </div>
              </div>
              <Badge className={`border font-black text-[10px] uppercase px-3 py-1 rounded-full ${
                payment.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                payment.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                "bg-rose-50 text-rose-700 border-rose-200"
              }`}>
                {payment.status}
              </Badge>
            </div>

            <PaymentDetailsFields payment={payment} />

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => onCheckStatus(payment.id)}
                disabled={isCheckingStatus}
                className="h-11 px-4 rounded-xl border-slate-200 font-bold text-xs flex items-center gap-2"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isCheckingStatus ? "animate-spin" : ""}`} />
                <span>Check M-Pesa Live Status</span>
              </Button>
              <Button onClick={onClose} className="h-11 px-6 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-wider">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
