"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, FileText, X, Loader2, CheckCircle2, AlertCircle, PenTool, Image as ImageIcon, Languages, Eye, Eraser } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

import { cn } from "@/lib/utils";
import { EligibleApplication } from "@/app/[locale]/(dashboard)/admin/certificates/_types";
import { CertificateCanvas } from "./CertificateCanvas";
import { LetterCanvas } from "./LetterCanvas";

export type DocumentType = "Certificate" | "Letter";
export type Language = "en" | "ar";

interface DocumentIssuanceStudioProps {
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

export default function DocumentIssuanceStudio({
  isOpen,
  onClose,
  eligibleApplications,
  isLoadingApplications,
  isIssuing,
  selectedAppId,
  setSelectedAppId,
  message,
  handleIssueDocument,
}: DocumentIssuanceStudioProps) {
  const [docType, setDocType] = useState<DocumentType>("Certificate");
  const [language, setLanguage] = useState<Language>("en");
  
  // Custom Text State
  const [customTextEn, setCustomTextEn] = useState("");
  const [customTextAr, setCustomTextAr] = useState("");

  // Signature State
  const [sigType, setSigType] = useState<"draw" | "upload">("draw");
  const sigCanvas = useRef<any>(null);
  const [uploadedSig, setUploadedSig] = useState<string | null>(null);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    setUploadedSig(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedSig(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;

    let signatureData = "";
    if (sigType === "draw" && sigCanvas.current && !sigCanvas.current.isEmpty()) {
      signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    } else if (sigType === "upload" && uploadedSig) {
      signatureData = uploadedSig;
    }

    const payload = {
      applicationId: selectedAppId,
      documentType: docType,
      language: language,
      customTextEn: customTextEn,
      customTextAr: customTextAr,
      digitalSignature: signatureData
    };

    handleIssueDocument(payload);
  };

  const selectedApp = eligibleApplications.find(app => app.id === selectedAppId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-6xl h-[90vh] rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-lg">
                  <Award size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-outfit text-slate-900 tracking-tight">
                    Document Issuance Studio
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    Draft, sign, and issue absolute premium documents
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Controls */}
              <div className="w-1/3 min-w-[350px] border-r border-slate-100 bg-white flex flex-col h-full overflow-y-auto">
                <form onSubmit={submitForm} className="p-8 space-y-8 flex-1">
                  
                  {message && (
                    <div className={cn("p-4 rounded-2xl flex items-center gap-3 font-medium text-sm shadow-sm", 
                      message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                    )}>
                      {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                      {message.text}
                    </div>
                  )}

                  {/* App Selection */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Select Approved Application
                    </label>
                    <select
                      required
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-[20px] text-sm font-semibold text-slate-800 appearance-none outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
                      disabled={isLoadingApplications || isIssuing || message?.type === "success"}
                    >
                      <option value="">{isLoadingApplications ? "Loading..." : "Choose an application..."}</option>
                      {eligibleApplications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.organization_name} - {app.service_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Doc Type & Language Toggle */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Type</label>
                      <div className="flex bg-slate-100 p-1.5 rounded-[16px]">
                        <button type="button" onClick={() => setDocType("Certificate")} className={cn("flex-1 py-2 text-xs font-bold rounded-[12px] flex items-center justify-center gap-2 transition-all", docType === "Certificate" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                          <Award size={14}/> Cert
                        </button>
                        <button type="button" onClick={() => setDocType("Letter")} className={cn("flex-1 py-2 text-xs font-bold rounded-[12px] flex items-center justify-center gap-2 transition-all", docType === "Letter" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                          <FileText size={14}/> Letter
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Language</label>
                      <div className="flex bg-slate-100 p-1.5 rounded-[16px]">
                        <button type="button" onClick={() => setLanguage("en")} className={cn("flex-1 py-2 text-xs font-bold rounded-[12px] flex items-center justify-center gap-2 transition-all", language === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                          EN
                        </button>
                        <button type="button" onClick={() => setLanguage("ar")} className={cn("flex-1 py-2 text-xs font-bold rounded-[12px] flex items-center justify-center gap-2 transition-all font-arabic", language === "ar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                          عربي
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Custom Content Editor */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {language === "en" ? "Custom Text (English)" : "Custom Text (Arabic)"}
                    </label>
                    <textarea
                      value={language === "en" ? customTextEn : customTextAr}
                      onChange={(e) => language === "en" ? setCustomTextEn(e.target.value) : setCustomTextAr(e.target.value)}
                      placeholder={language === "en" ? "Optional: Add personalized text to the document body..." : "أضف نصاً مخصصاً هنا..."}
                      className={cn(
                        "w-full p-4 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-[20px] text-sm text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all min-h-[120px] resize-none",
                        language === "ar" && "text-right font-arabic"
                      )}
                      dir={language === "ar" ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Signature Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Digital Signature
                      </label>
                      <button type="button" onClick={clearSignature} className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md">
                        <Eraser size={12}/> Clear
                      </button>
                    </div>
                    
                    <div className="flex bg-slate-100 p-1.5 rounded-[16px] mb-2">
                      <button type="button" onClick={() => setSigType("draw")} className={cn("flex-1 py-2 text-xs font-bold rounded-[12px] flex items-center justify-center gap-2 transition-all", sigType === "draw" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                        <PenTool size={14}/> Draw
                      </button>
                      <button type="button" onClick={() => setSigType("upload")} className={cn("flex-1 py-2 text-xs font-bold rounded-[12px] flex items-center justify-center gap-2 transition-all", sigType === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                        <ImageIcon size={14}/> Upload
                      </button>
                    </div>

                    <div className="w-full bg-slate-50 border border-slate-200 rounded-[20px] overflow-hidden relative group">
                      {sigType === "draw" ? (
                        <div className="h-[150px] w-full">
                          <SignatureCanvas 
                            ref={sigCanvas}
                            penColor="#1e293b"
                            canvasProps={{ className: "w-full h-full cursor-crosshair" }}
                          />
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                            <span className="font-serif italic text-4xl text-slate-300">Sign Here</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[150px] w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-[20px] bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                          {uploadedSig ? (
                            <img src={uploadedSig} alt="Signature" className="h-full object-contain mix-blend-multiply" />
                          ) : (
                            <>
                              <ImageIcon size={32} className="text-slate-400 mb-2" />
                              <p className="text-xs font-bold text-slate-500">Click to upload signature</p>
                              <p className="text-[10px] text-slate-400">PNG or JPG, clear background preferred</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </form>

                {/* Footer Actions */}
                <div className="p-8 border-t border-slate-100 bg-slate-50 mt-auto shrink-0 space-y-4">
                  <button
                    onClick={submitForm}
                    disabled={!selectedAppId || isIssuing || message?.type === "success"}
                    className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-emerald-600/20 disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:shadow-none hover:-translate-y-1"
                  >
                    {isIssuing ? <><Loader2 size={24} className="animate-spin" /> Issuing...</> : <><Award size={24} /> Issue {docType}</>}
                  </button>
                </div>
              </div>

              {/* Main Preview Pane */}
              <div className="flex-1 bg-slate-100 overflow-y-auto p-12 relative flex items-center justify-center">
                 {selectedAppId ? (
                   <div className="scale-[0.6] origin-top md:scale-[0.7] lg:scale-90 xl:scale-100 transition-all">
                     {docType === "Certificate" ? (
                       <CertificateCanvas
                         certificate={{
                           service_name: selectedApp?.service_name || "Official Certification",
                           organization_name: selectedApp?.organization_name || "Organization Name",
                           serial_number: "PREVIEW-12345",
                         } as any}
                         certificateRef={{ current: null }}
                         issueDate={new Date()}
                         expiryDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                         isValid={true}
                         language={language}
                         customText={language === "en" ? customTextEn : customTextAr}
                         signatureBase64={sigType === "upload" ? uploadedSig || undefined : (sigCanvas.current?.isEmpty() ? undefined : sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png"))}
                       />
                     ) : (
                       <LetterCanvas
                         letter={{
                           service_name: selectedApp?.service_name || "Official Letter",
                           organization_name: selectedApp?.organization_name || "Organization Name",
                           serial_number: "PREVIEW-LTR-123",
                         } as any}
                         letterRef={{ current: null }}
                         issueDate={new Date()}
                         language={language}
                         customText={language === "en" ? customTextEn : customTextAr}
                         signatureBase64={sigType === "upload" ? uploadedSig || undefined : (sigCanvas.current?.isEmpty() ? undefined : sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png"))}
                       />
                     )}
                   </div>
                 ) : (
                   <div className="w-full max-w-4xl opacity-50 flex flex-col items-center justify-center py-20 text-slate-400">
                      <Eye size={48} className="mb-4 text-slate-300" />
                      <h3 className="text-xl font-bold">Live Preview Area</h3>
                      <p className="text-sm font-medium mt-2">Select an application to see the document preview.</p>
                   </div>
                 )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
