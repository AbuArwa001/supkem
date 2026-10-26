import { EligibleApplication } from "../_types";
import { DocumentType } from "./studioTypes";

export function determineInitialDocType(app: EligibleApplication): DocumentType {
  if (app.service_document_type === "Letter") return "Letter";
  if (app.service_document_type === "Certificate") return "Certificate";
  if (!app.organization_name && app.user_name) return "Letter";
  return "Certificate";
}

export function buildIssuePayload(params: {
  selectedAppId: string;
  docType: DocumentType;
  language: "en" | "ar";
  customTextEn: string;
  customTextAr: string;
  signatureData: string;
  recipient: string;
  subject: string;
  signatoryTitle: string;
  startDateString: string;
  isIndefinite: boolean;
  expiryDateString: string;
}) {
  return {
    applicationId: params.selectedAppId,
    documentType: params.docType,
    language: params.language,
    customTextEn: params.customTextEn,
    customTextAr: params.customTextAr,
    digitalSignature: params.signatureData,
    recipient: params.docType === "Letter" ? params.recipient : undefined,
    subject: params.docType === "Letter" ? params.subject : undefined,
    signatoryTitle: params.signatoryTitle,
    issuedAt: params.startDateString ? new Date(params.startDateString).toISOString() : new Date().toISOString(),
    expiresAt: params.docType === "Certificate"
      ? (params.isIndefinite ? null : (params.expiryDateString ? new Date(params.expiryDateString).toISOString() : null))
      : undefined,
  };
}
