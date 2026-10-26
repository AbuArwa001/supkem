"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentIssuanceStudioProps } from "./studioTypes";
import { useDocumentIssuanceStudio } from "./useDocumentIssuanceStudio";
import { StudioHeader } from "./StudioHeader";
import { StudioAppSelect } from "./StudioAppSelect";
import { StudioDocTypeAndLang } from "./StudioDocTypeAndLang";
import { StudioLetterMeta } from "./StudioLetterMeta";
import { StudioValidityDates } from "./StudioValidityDates";
import { StudioSignatoryField } from "./StudioSignatoryField";
import { StudioContentEditor } from "./StudioContentEditor";
import { StudioSignaturePad } from "./StudioSignaturePad";
import { StudioFooterActions } from "./StudioFooterActions";
import { StudioPreviewPanel } from "./StudioPreviewPanel";

export default function DocumentIssuanceStudio(props: DocumentIssuanceStudioProps) {
  const { isOpen, onClose, eligibleApplications, isLoadingApplications, isIssuing, selectedAppId, setSelectedAppId, message, handleIssueDocument } = props;
  const s = useDocumentIssuanceStudio(eligibleApplications, selectedAppId, setSelectedAppId, handleIssueDocument);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-7xl h-[92vh] rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col"
          >
            <StudioHeader onClose={onClose} />

            <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
              <div className="w-full lg:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white flex flex-col h-auto lg:h-full overflow-y-auto custom-scrollbar">
                <form onSubmit={s.submitForm} className="p-6 space-y-6 flex-1">
                  {message && (
                    <div className={cn("p-4 rounded-2xl flex items-center gap-3 font-medium text-sm shadow-sm", message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100")}>
                      {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                      {message.text}
                    </div>
                  )}

                  <StudioAppSelect selectedAppId={selectedAppId} setSelectedAppId={setSelectedAppId} eligibleApplications={eligibleApplications} isLoadingApplications={isLoadingApplications} isIssuing={isIssuing} hasSuccessMessage={message?.type === "success"} />
                  <StudioDocTypeAndLang docType={s.docType} setDocType={s.setDocType} language={s.language} setLanguage={s.setLanguage} />
                  {s.docType === "Letter" && <StudioLetterMeta recipient={s.recipient} setRecipient={s.setRecipient} subject={s.subject} setSubject={s.setSubject} selectedApp={s.selectedApp} />}
                  <StudioValidityDates docType={s.docType} startDateString={s.startDateString} setStartDateString={s.setStartDateString} isIndefinite={s.isIndefinite} setIsIndefinite={s.setIsIndefinite} expiryDateString={s.expiryDateString} setExpiryDateString={s.setExpiryDateString} />
                  <StudioSignatoryField docType={s.docType} signatoryTitle={s.signatoryTitle} setSignatoryTitle={s.setSignatoryTitle} />
                  <StudioContentEditor language={s.language} isMarkdown={s.isMarkdown} setIsMarkdown={s.setIsMarkdown} insertVariable={s.insertVariable} textareaRef={s.textareaRef} customTextEn={s.customTextEn} setCustomTextEn={s.setCustomTextEn} customTextAr={s.customTextAr} setCustomTextAr={s.setCustomTextAr} />
                  <StudioSignaturePad sigType={s.sigType} setSigType={s.setSigType} sigCanvas={s.sigCanvas} uploadedSig={s.uploadedSig} clearSignature={s.clearSignature} handleFileUpload={s.handleFileUpload} />
                </form>

                <StudioFooterActions submitForm={s.submitForm} selectedAppId={selectedAppId} isIssuing={isIssuing} hasSuccessMessage={message?.type === "success"} docType={s.docType} />
              </div>

              <StudioPreviewPanel
                selectedAppId={selectedAppId} selectedApp={s.selectedApp} docType={s.docType} language={s.language}
                startDateString={s.startDateString} isIndefinite={s.isIndefinite} expiryDateString={s.expiryDateString}
                recipient={s.recipient} subject={s.subject} signatoryTitle={s.signatoryTitle} isMarkdown={s.isMarkdown}
                customTextEn={s.customTextEn} customTextAr={s.customTextAr}
                signatureBase64={s.sigType === "upload" ? s.uploadedSig || undefined : (s.sigCanvas.current?.isEmpty() ? undefined : s.sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png"))}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
