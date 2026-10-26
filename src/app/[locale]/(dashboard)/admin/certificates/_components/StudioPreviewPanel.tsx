import React from "react";
import { Eye } from "lucide-react";
import { EligibleApplication } from "../_types";
import { DocumentType, Language } from "./studioTypes";
import { CertificateCanvas } from "../[id]/_components/CertificateCanvas";
import { LetterCanvas } from "./LetterCanvas";
import MarriageCertificateTemplate from "@/components/MarriageCertificateTemplate";

interface StudioPreviewPanelProps {
  selectedAppId: string;
  selectedApp?: EligibleApplication;
  docType: DocumentType;
  language: Language;
  startDateString: string;
  isIndefinite: boolean;
  expiryDateString: string;
  recipient: string;
  subject: string;
  signatoryTitle: string;
  isMarkdown: boolean;
  customTextEn: string;
  customTextAr: string;
  signatureBase64?: string;
}

export function StudioPreviewPanel(props: StudioPreviewPanelProps) {
  const { selectedAppId, selectedApp, docType, language, startDateString, isIndefinite, expiryDateString, recipient, subject, signatoryTitle, isMarkdown, customTextEn, customTextAr, signatureBase64 } = props;

  if (!selectedAppId) {
    return (
      <div className="flex-1 bg-slate-100 overflow-y-auto p-4 sm:p-8 lg:p-12 relative flex items-center justify-center">
        <div className="w-full max-w-4xl opacity-50 flex flex-col items-center justify-center py-20 text-slate-400">
          <Eye size={48} className="mb-4 text-slate-300" />
          <h3 className="text-xl font-bold">Live Preview Area</h3>
          <p className="text-sm font-medium mt-2">Select an application to see the real-time document preview.</p>
        </div>
      </div>
    );
  }

  const isCert = docType === "Certificate";
  const customText = language === "en" ? customTextEn : customTextAr;
  const issueDate = startDateString ? new Date(startDateString) : new Date();
  const orgOrUser = selectedApp?.organization_name || selectedApp?.user_name || "Organization Name";

  return (
    <div className="flex-1 bg-slate-100 overflow-y-auto p-4 sm:p-8 lg:p-12 relative flex items-center justify-center">
      <div className="scale-[0.4] xs:scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-90 xl:scale-100 origin-top transition-all">
        {isCert ? (
          selectedApp?.service_name?.toLowerCase().includes("marriage") ? (
            <div className="w-[820px] max-w-full origin-top">
              <MarriageCertificateTemplate certificate={{
                serial_number: "PREVIEW-0781",
                issued_at: startDateString || new Date().toISOString(),
                expires_at: isIndefinite ? null : expiryDateString,
                application_detail: { service_name: selectedApp?.service_name, user_name: selectedApp?.user_name } as any,
              }} />
            </div>
          ) : (
            <CertificateCanvas
              certificate={{ service_name: selectedApp?.service_name || "Official Certification", organization_name: orgOrUser, user_name: selectedApp?.user_name, serial_number: "PREVIEW-12345", signatory_title: signatoryTitle } as any}
              certificateRef={{ current: null }}
              issueDate={issueDate}
              expiryDate={isIndefinite ? null : (expiryDateString ? new Date(expiryDateString) : null)}
              isValid language={language} customText={customText} signatoryTitle={signatoryTitle} isMarkdown={isMarkdown} signatureBase64={signatureBase64}
            />
          )
        ) : (
          <LetterCanvas
            letter={{ service_name: selectedApp?.service_name || "Official Letter", organization_name: orgOrUser, user_name: selectedApp?.user_name, serial_number: "PREVIEW-LTR-123", recipient, subject, signatory_title: signatoryTitle } as any}
            letterRef={{ current: null }}
            issueDate={issueDate}
            language={language} customText={customText} recipient={recipient} subject={subject} signatoryTitle={signatoryTitle} isMarkdown={isMarkdown} signatureBase64={signatureBase64}
          />
        )}
      </div>
    </div>
  );
}
