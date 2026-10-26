import { format } from "date-fns";
import { toast } from "sonner";
import { PaymentRecord } from "./financeTypes";

export function exportFinanceCsv(payments: PaymentRecord[]) {
  if (!payments.length) {
    toast.error("No transactions to export");
    return;
  }

  const headers = [
    "Receipt / Ref", "Applicant Name", "Applicant Email", "Organization",
    "Service", "Amount (KES)", "Phone", "Status", "Date",
  ];

  const rows = payments.map((p) => [
    `"${p.receipt_number || p.checkout_request_id || p.id}"`,
    `"${p.applicant_name || "N/A"}"`,
    `"${p.applicant_email || "N/A"}"`,
    `"${p.organization_name || "Individual"}"`,
    `"${p.service_name || "N/A"}"`,
    Number(p.amount || 0).toFixed(2),
    `"${p.phone_number || "N/A"}"`,
    `"${p.status}"`,
    `"${p.created_at ? format(new Date(p.created_at), "yyyy-MM-dd HH:mm") : ""}"`,
  ]);

  const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encoded = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encoded);
  link.setAttribute("download", `SUPKEM_Finance_Ledger_${format(new Date(), "yyyyMMdd_HHmm")}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("Finance report exported as CSV");
}
