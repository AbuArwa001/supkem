import { EligibleApplication } from "@/app/[locale]/(dashboard)/admin/certificates/_types";

export type DocumentType = "Certificate" | "Letter";
export type Language = "en" | "ar";

export interface DocumentIssuanceStudioProps {
  isOpen: boolean;
  onClose: () => void;
  eligibleApplications: EligibleApplication[];
  isLoadingApplications: boolean;
  isIssuing: boolean;
  selectedAppId: string;
  setSelectedAppId: (id: string) => void;
  message: { type: "success" | "error"; text: string } | null;
  handleIssueDocument: (payload: any) => void;
}

export const RECIPIENT_PRESETS = [
  "To Whom It May Concern",
  "The Embassy / Consular Section",
  "The Visa Processing Office",
  "The Admissions Board",
];

export const SIGNATORY_PRESETS_LETTER = [
  "Secretary General",
  "National Chairman",
  "Director General",
];

export const SIGNATORY_PRESETS_CERT = [
  "National Chairman",
  "Secretary General",
  "Registry Officer",
];
