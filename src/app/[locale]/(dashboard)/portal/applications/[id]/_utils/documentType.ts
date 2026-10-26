import { FileText, Award, Mail, ShieldCheck } from "lucide-react";

export function getDocumentType(application: {
  service_name?: string;
  service_document_type?: string;
  certification?: { id: string; serial_number: string } | null;
  letter?: { id: string; serial_number: string } | null;
}) {
  if (application.letter) return { label: "Letter Issued", icon: Mail, color: "bg-blue-500" };
  if (application.certification) return { label: "Certificate Issued", icon: Award, color: "bg-emerald-500" };

  if (application.service_document_type === "Letter") {
    return { label: "Will Produce an Official Letter", icon: Mail, color: "bg-blue-400" };
  }
  if (application.service_document_type === "Certificate") {
    return { label: "Will Produce an Official Certificate", icon: ShieldCheck, color: "bg-emerald-400" };
  }
  if (application.service_document_type === "None") {
    return { label: "No Document Required", icon: FileText, color: "bg-slate-400" };
  }

  const svc = application.service_name?.toLowerCase() || "";
  const letterServices = ["study", "hajj", "umrah", "travel", "visa", "employment", "marriage"];
  const isLetter = letterServices.some((k) => svc.includes(k));
  return isLetter
    ? { label: "Will Produce a Letter", icon: Mail, color: "bg-blue-400" }
    : { label: "Will Produce a Certificate", icon: ShieldCheck, color: "bg-emerald-400" };
}
