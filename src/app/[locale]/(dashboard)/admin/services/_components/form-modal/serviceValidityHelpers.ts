import { ServiceFormData } from "../types";

export function getValidityMode(formData: ServiceFormData): "indefinite" | "duration" | "dates" {
  if (formData.is_indefinite !== false) return "indefinite";
  if (
    formData.start_date ||
    formData.validity_duration === "Date Range" ||
    formData.validity_duration === "Custom Date Range" ||
    (formData.end_date && !["6 Months", "1 Year", "2 Years", "3 Years", "5 Years"].includes(formData.validity_duration || ""))
  ) {
    return "dates";
  }
  return "duration";
}

export function calculateDateSpan(startStr: string | null | undefined, endStr: string | null | undefined) {
  if (!startStr || !endStr) return null;
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs < 0) return { error: true, days: 0, text: "" };
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.round(days / 30.4375);
  const years = (days / 365.25).toFixed(1);
  let text = `${days} days`;
  if (days >= 365) text = `${years.replace(/\.0$/, "")} yr${Number(years) > 1 ? "s" : ""}`;
  else if (days >= 30) text = `~${months} mo${months > 1 ? "s" : ""}`;
  return { error: false, days, text };
}
