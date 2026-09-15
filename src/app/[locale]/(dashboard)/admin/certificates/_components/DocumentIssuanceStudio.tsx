"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, FileText, X, Loader2, CheckCircle2, AlertCircle, 
  PenTool, Image as ImageIcon, Eye, Eraser, Code2, AlignLeft, 
  User, Building, Calendar, Hash, Sparkles, Infinity
} from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

import { cn } from "@/lib/utils";

import { EligibleApplication } from "@/app/[locale]/(dashboard)/admin/certificates/_types";
import { CertificateCanvas } from "@/app/[locale]/(dashboard)/admin/certificates/[id]/_components/CertificateCanvas";
import { LetterCanvas } from "./LetterCanvas";
import MarriageCertificateTemplate from "@/components/MarriageCertificateTemplate";

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

const RECIPIENT_PRESETS = [
  "To Whom It May Concern",
  "The Embassy / Consular Section",
  "The Visa Processing Office",
  "The Admissions Board",
];

const SIGNATORY_PRESETS_LETTER = [
  "Secretary General",
  "National Chairman",
  "Director General",
];

const SIGNATORY_PRESETS_CERT = [
  "National Chairman",
  "Secretary General",
  "Registry Officer",
];

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
  
  // Custom Letter Metadata
  const [recipient, setRecipient] = useState("To Whom It May Concern");
  const [subject, setSubject] = useState("");
  const [signatoryTitle, setSignatoryTitle] = useState("Secretary General");

  // Certificate Validity Dates (Start Date & Expiration Date)
  const [startDateString, setStartDateString] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [isIndefinite, setIsIndefinite] = useState(true);
  const [expiryDateString, setExpiryDateString] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split("T")[0];
  });

  // Editor mode: Normal Text vs Markdown
  const [isMarkdown, setIsMarkdown] = useState(false);

  // Custom Text State
  const [customTextEn, setCustomTextEn] = useState("");
  const [customTextAr, setCustomTextAr] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Signature State
  const [sigType, setSigType] = useState<"draw" | "upload">("draw");
  const sigCanvas = useRef<any>(null);
  const [uploadedSig, setUploadedSig] = useState<string | null>(null);

  // Find currently selected application
  const selectedApp = eligibleApplications.find(a => a.id === selectedAppId);

  useEffect(() => {
    if (selectedApp) {
      // Auto-select document type based on service configuration
      if (selectedApp.service_document_type === "Letter") {
        setDocType("Letter");
      } else if (selectedApp.service_document_type === "Certificate") {
        setDocType("Certificate");
      } else if (!selectedApp.organization_name && selectedApp.user_name) {
        setDocType("Letter");
      } else {
        setDocType("Certificate");
      }

      // Default letter subject if empty
      if (!subject && selectedApp.service_name) {
        setSubject(`OFFICIAL RECOMMENDATION - ${selectedApp.service_name.toUpperCase()}`);
      }

      // Auto-populate certificate validity policy from service
      if (selectedApp.service_is_indefinite !== undefined) {
        setIsIndefinite(selectedApp.service_is_indefinite);
      } else {
        setIsIndefinite(true);
      }

      if (selectedApp.service_expiration_date) {
        setExpiryDateString(selectedApp.service_expiration_date);
        setIsIndefinite(false);
      } else if (selectedApp.service_validity_duration && selectedApp.service_validity_duration !== "Indefinite") {
        setIsIndefinite(false);
        const d = new Date();
        const dur = selectedApp.service_validity_duration;
        if (dur.includes("6 Month")) d.setMonth(d.getMonth() + 6);
        else if (dur.includes("2 Year")) d.setFullYear(d.getFullYear() + 2);
        else if (dur.includes("3 Year")) d.setFullYear(d.getFullYear() + 3);
        else if (dur.includes("5 Year")) d.setFullYear(d.getFullYear() + 5);
        else d.setFullYear(d.getFullYear() + 1);
        setExpiryDateString(d.toISOString().split("T")[0]);
      }
    }
  }, [selectedAppId, selectedApp]);

  // Adjust default signatory when document type switches
  useEffect(() => {
    if (docType === "Letter") {
      setSignatoryTitle("Secretary General");
    } else {
      setSignatoryTitle("National Chairman");
    }
  }, [docType]);

  const insertVariable = (variableKey: string) => {
    const textToInsert = `{{${variableKey}}}`;
    if (language === "en") {
      const el = textareaRef.current;
      if (el) {
        const start = el.selectionStart || 0;
        const end = el.selectionEnd || 0;
        const newText = customTextEn.substring(0, start) + textToInsert + customTextEn.substring(end);
        setCustomTextEn(newText);
        setTimeout(() => {
          el.focus();
          el.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
        }, 50);
      } else {
        setCustomTextEn(prev => prev + " " + textToInsert);
      }
    } else {
      setCustomTextAr(prev => prev + " " + textToInsert);
    }
  };

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
      digitalSignature: signatureData,
      recipient: docType === "Letter" ? recipient : undefined,
      subject: docType === "Letter" ? subject : undefined,
      signatoryTitle: signatoryTitle,
      issuedAt: startDateString ? new Date(startDateString).toISOString() : new Date().toISOString(),
      expiresAt: docType === "Certificate"
        ? (isIndefinite ? null : (expiryDateString ? new Date(expiryDateString).toISOString() : null))
        : undefined,
    };

    handleIssueDocument(payload);
  };

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
            {/* Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-[18px] flex items-center justify-center shadow-lg">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">
                    Document Issuance Studio
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    Configure document type, recipient, sender title, and markdown text
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
              {/* Sidebar Controls */}
              <div className="w-full lg:w-[420px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white flex flex-col h-auto lg:h-full overflow-y-auto custom-scrollbar">
                <form onSubmit={submitForm} className="p-6 space-y-6 flex-1">
                  
                  {message && (
                    <div className={cn("p-4 rounded-2xl flex items-center gap-3 font-medium text-sm shadow-sm", 
                      message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                    )}>
                      {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                      {message.text}
                    </div>
                  )}

                  {/* App Selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Select Approved Application
                    </label>
                    <select
                      required
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 appearance-none outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
                      disabled={isLoadingApplications || isIssuing || message?.type === "success"}
                    >
                      <option value="">
                        {isLoadingApplications 
                          ? "Loading applications..." 
                          : eligibleApplications.length === 0 
                            ? "No approved applications awaiting issuance" 
                            : "Choose an application..."}
                      </option>
                      {eligibleApplications.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.organization_name || app.user_name || "N/A"} - {app.service_name} ({app.service_document_type || "Standard"})
                        </option>
                      ))}
                    </select>
                    {!isLoadingApplications && eligibleApplications.length === 0 && (
                      <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-start gap-2 mt-2">
                        <AlertCircle size={15} className="shrink-0 mt-0.5 text-amber-600" />
                        <span>
                          No approved applications awaiting document issuance. Applications must be marked as <strong>Approved</strong> in the Applications manager before a certificate or letter can be issued.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Doc Type & Language Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Document Type</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button 
                          type="button" 
                          onClick={() => setDocType("Certificate")} 
                          className={cn("flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all", docType === "Certificate" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                          <Award size={14}/> Cert
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setDocType("Letter")} 
                          className={cn("flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all", docType === "Letter" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                          <FileText size={14}/> Letter
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Language</label>
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button 
                          type="button" 
                          onClick={() => setLanguage("en")} 
                          className={cn("flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all", language === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                          EN
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setLanguage("ar")} 
                          className={cn("flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all font-arabic", language === "ar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                          عربي
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Letter Customization Fields (Recipient & Subject) */}
                  {docType === "Letter" && (
                    <div className="space-y-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                      {/* Recipient */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
                            Recipient / Addressee
                          </label>
                        </div>
                        <input
                          type="text"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          placeholder="e.g. To Whom It May Concern"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        {/* Recipient Presets */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {RECIPIENT_PRESETS.map((preset) => (
                            <button
                              type="button"
                              key={preset}
                              onClick={() => setRecipient(preset)}
                              className={cn(
                                "text-[10px] font-bold px-2 py-1 rounded-lg border transition-all",
                                recipient === preset
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-primary/40"
                              )}
                            >
                              {preset}
                            </button>
                          ))}
                          {selectedApp?.user_name && (
                            <button
                              type="button"
                              onClick={() => setRecipient(selectedApp.user_name || "")}
                              className="text-[10px] font-bold px-2 py-1 rounded-lg border bg-white text-slate-600 border-slate-200 hover:border-primary/40"
                            >
                              Applicant: {selectedApp.user_name}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
                          Letter Subject
                        </label>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="e.g. RECOMMENDATION FOR STUDY ABROAD"
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Document Validity Dates (Start & Expiration) */}
                  <div className="space-y-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 flex items-center gap-1.5">
                        <Calendar size={13} className="text-primary" /> {docType === "Certificate" ? "Certificate Validity Period" : "Letter Issue Date"}
                      </label>
                      {docType === "Certificate" && (
                        <button
                          type="button"
                          onClick={() => setIsIndefinite(!isIndefinite)}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all",
                            isIndefinite
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs"
                              : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                          )}
                        >
                          <Infinity size={13} />
                          {isIndefinite ? "Indefinite (No Expiry)" : "Set Expiry Date"}
                        </button>
                      )}
                    </div>

                    <div className={cn("grid gap-3.5", docType === "Certificate" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
                      {/* Start Date */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            {docType === "Certificate" ? "Start / Issue Date" : "Issue Date"}
                          </label>
                          <button
                            type="button"
                            onClick={() => setStartDateString(new Date().toISOString().split("T")[0])}
                            className="text-[10px] font-bold text-primary hover:underline"
                          >
                            Today
                          </button>
                        </div>
                        <input
                          type="date"
                          value={startDateString}
                          onChange={(e) => setStartDateString(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {/* Expiration Date */}
                      {docType === "Certificate" && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            Expiration Date
                          </label>
                          {isIndefinite ? (
                            <div className="h-[42px] flex items-center gap-2 px-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
                              <Infinity size={14} className="text-emerald-600 shrink-0" />
                              <span className="truncate">Indefinite (Never Expires)</span>
                            </div>
                          ) : (
                            <input
                              type="date"
                              value={expiryDateString}
                              onChange={(e) => setExpiryDateString(e.target.value)}
                              min={startDateString}
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Expiration Presets */}
                    {docType === "Certificate" && !isIndefinite && (
                      <div className="pt-1">
                        <p className="text-[10px] font-bold text-slate-400 mb-1.5">
                          Quick Duration Presets (from start date):
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { label: "+6 Months", addMonths: 6 },
                            { label: "+1 Year", addMonths: 12 },
                            { label: "+2 Years", addMonths: 24 },
                            { label: "+3 Years", addMonths: 36 },
                            { label: "+5 Years", addMonths: 60 },
                          ].map((preset) => (
                            <button
                              type="button"
                              key={preset.label}
                              onClick={() => {
                                const base = startDateString ? new Date(startDateString) : new Date();
                                base.setMonth(base.getMonth() + preset.addMonths);
                                setExpiryDateString(base.toISOString().split("T")[0]);
                              }}
                              className="text-[10px] font-bold px-2 py-1 rounded-lg border bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Signatory / Sender Title */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                      Signatory / Sender Title
                    </label>
                    <input
                      type="text"
                      value={signatoryTitle}
                      onChange={(e) => setSignatoryTitle(e.target.value)}
                      placeholder={docType === "Letter" ? "Secretary General" : "National Chairman"}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(docType === "Letter" ? SIGNATORY_PRESETS_LETTER : SIGNATORY_PRESETS_CERT).map((preset) => (
                        <button
                          type="button"
                          key={preset}
                          onClick={() => setSignatoryTitle(preset)}
                          className={cn(
                            "text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all",
                            signatoryTitle === preset
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                          )}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Content Editor with Markdown Toggle & Quick Variables */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {language === "en" ? "Body Content (EN)" : "Body Content (AR)"}
                      </label>
                      {/* Markdown / Normal Switch */}
                      <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setIsMarkdown(false)}
                          className={cn(
                            "px-2 py-1 text-[10px] font-bold rounded-md flex items-center gap-1 transition-all",
                            !isMarkdown ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          <AlignLeft size={11} /> Text
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsMarkdown(true)}
                          className={cn(
                            "px-2 py-1 text-[10px] font-bold rounded-md flex items-center gap-1 transition-all",
                            isMarkdown ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          <Code2 size={11} /> Markdown
                        </button>
                      </div>
                    </div>

                    {/* Quick Variable Insertion Pills */}
                    <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Sparkles size={11} className="text-secondary" /> Insert Variable:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        <button
                          type="button"
                          onClick={() => insertVariable("user_name")}
                          className="text-[10px] font-bold bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <User size={10} /> Applicant Name
                        </button>
                        <button
                          type="button"
                          onClick={() => insertVariable("organization_name")}
                          className="text-[10px] font-bold bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <Building size={10} /> Organization
                        </button>
                        <button
                          type="button"
                          onClick={() => insertVariable("service_name")}
                          className="text-[10px] font-bold bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <Award size={10} /> Service Name
                        </button>
                        <button
                          type="button"
                          onClick={() => insertVariable("ref_number")}
                          className="text-[10px] font-bold bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <Hash size={10} /> Ref No
                        </button>
                        <button
                          type="button"
                          onClick={() => insertVariable("date")}
                          className="text-[10px] font-bold bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <Calendar size={10} /> Date
                        </button>
                      </div>
                    </div>

                    <textarea
                      ref={textareaRef}
                      value={language === "en" ? customTextEn : customTextAr}
                      onChange={(e) => language === "en" ? setCustomTextEn(e.target.value) : setCustomTextAr(e.target.value)}
                      placeholder={
                        isMarkdown
                          ? "Write using Markdown (e.g. **bold**, *italics*, - list items, or use {{user_name}} placeholders)..."
                          : language === "en"
                          ? "Enter custom body text (you can insert {{user_name}} tags)..."
                          : "أضف نصاً مخصصاً هنا..."
                      }
                      className={cn(
                        "w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all min-h-[140px] resize-y font-mono",
                        language === "ar" && "text-right font-arabic"
                      )}
                      dir={language === "ar" ? "rtl" : "ltr"}
                    />
                    {isMarkdown && (
                      <p className="text-[10px] text-slate-400 font-medium">
                        💡 Markdown enabled: supports <code className="bg-slate-100 px-1 py-0.5 rounded">**bold**</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">*italic*</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">- list</code>, and headers.
                      </p>
                    )}
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
                    
                    <div className="flex bg-slate-100 p-1 rounded-xl mb-2">
                      <button type="button" onClick={() => setSigType("draw")} className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all", sigType === "draw" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                        <PenTool size={13}/> Draw
                      </button>
                      <button type="button" onClick={() => setSigType("upload")} className={cn("flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all", sigType === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                        <ImageIcon size={13}/> Upload
                      </button>
                    </div>

                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative group">
                      {sigType === "draw" ? (
                        <div className="h-[130px] w-full">
                          <SignatureCanvas 
                            ref={sigCanvas}
                            penColor="#1e293b"
                            canvasProps={{ className: "w-full h-full cursor-crosshair" }}
                          />
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
                            <span className="font-serif italic text-3xl text-slate-300">Sign Here</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[130px] w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                          {uploadedSig ? (
                            <img src={uploadedSig} alt="Signature" className="h-full object-contain mix-blend-multiply" />
                          ) : (
                            <>
                              <ImageIcon size={28} className="text-slate-400 mb-1.5" />
                              <p className="text-xs font-bold text-slate-500">Click to upload signature</p>
                              <p className="text-[10px] text-slate-400">PNG or JPG, transparent preferred</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </form>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto shrink-0 space-y-3">
                  <button
                    onClick={submitForm}
                    disabled={!selectedAppId || isIssuing || message?.type === "success"}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-base hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-emerald-600/20 disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:shadow-none hover:-translate-y-0.5"
                  >
                    {isIssuing ? <><Loader2 size={20} className="animate-spin" /> Issuing...</> : <><Award size={20} /> Issue {docType}</>}
                  </button>
                </div>
              </div>

              {/* Main Preview Pane */}
              <div className="flex-1 bg-slate-100 overflow-y-auto p-4 sm:p-8 lg:p-12 relative flex items-center justify-center">
                 {selectedAppId ? (
                   <div className="scale-[0.4] xs:scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-90 xl:scale-100 origin-top transition-all">
                     {docType === "Certificate" ? (
                       selectedApp?.service_name?.toLowerCase().includes("marriage") ? (
                         <div className="w-[820px] max-w-full origin-top">
                           <MarriageCertificateTemplate
                             certificate={{
                               serial_number: "PREVIEW-0781",
                               issued_at: startDateString || new Date().toISOString(),
                               expires_at: isIndefinite ? null : expiryDateString,
                               application_detail: {
                                 service_name: selectedApp?.service_name,
                                 user_name: selectedApp?.user_name,
                                 marriage_details: selectedApp?.marriage_details || {
                                   husband_name: selectedApp?.user_name || "KHALFANI ATHMAN KHALFAN",
                                   husband_id_passport: "ID N.O: 31783475",
                                   husband_age: "27",
                                   husband_marital_status: "FIRST MARRIAGE",
                                   husband_occupation: "ICT OFFICER, MINISTRY OF AGRICULTURE",
                                   husband_residence_county: "MOMBASA",
                                   husband_residence_sub_county: "CHANGAMWE",
                                   wife_name: "RIZIKI MOHAMED GAMUMU",
                                   wife_id_passport: "ID NO: 32288080",
                                   wife_age: "29",
                                   wife_marital_status: "VIRGIN",
                                   wife_occupation: "A CAKE BAKER",
                                   wife_residence_county: "MOMBASA",
                                   wife_residence_sub_county: "KISAUNI",
                                   wife_waliyy_name: "HASSAN MOHAMED GAMUMU",
                                   wife_waliyy_relationship: "HER BROTHER",
                                   agreed_mahr: "A SET OF GOLD WORTH KSHS. 75,000/=",
                                   paid_mahr_and_deferred: "DEFERRED",
                                   particulars_of_gifts: "KSHS. 20,000/= PAID",
                                   place_of_marriage: "MASJID NOOR, KIDARAJANI, BAMBURI",
                                   county_of_marriage: "MOMBASA",
                                   date_of_marriage: startDateString || "2022-07-02",
                                   witness_1_name: "SEIF MOHAMED MAKUTA",
                                   witness_1_id: "29653490",
                                   witness_2_name: "HAMAD MOHAMMED",
                                   witness_2_id: "28869113",
                                   marriage_officer_name: "Hon. Khamis Ramadhani",
                                 },
                               } as any,
                             } as any}
                           />
                         </div>
                       ) : (
                         <CertificateCanvas
                           certificate={{
                             service_name: selectedApp?.service_name || "Official Certification",
                             organization_name: selectedApp?.organization_name || selectedApp?.user_name || "Organization Name",
                             user_name: selectedApp?.user_name,
                             serial_number: "PREVIEW-12345",
                             signatory_title: signatoryTitle,
                           } as any}
                           certificateRef={{ current: null }}
                           issueDate={startDateString ? new Date(startDateString) : new Date()}
                           expiryDate={isIndefinite ? null : (expiryDateString ? new Date(expiryDateString) : null)}
                           isValid={true}
                           language={language}
                           customText={language === "en" ? customTextEn : customTextAr}
                           signatoryTitle={signatoryTitle}
                           isMarkdown={isMarkdown}
                           signatureBase64={sigType === "upload" ? uploadedSig || undefined : (sigCanvas.current?.isEmpty() ? undefined : sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png"))}
                         />
                       )
                     ) : (
                       <LetterCanvas
                         letter={{
                           service_name: selectedApp?.service_name || "Official Letter",
                           organization_name: selectedApp?.organization_name || selectedApp?.user_name || "Organization Name",
                           user_name: selectedApp?.user_name,
                           serial_number: "PREVIEW-LTR-123",
                           recipient: recipient,
                           subject: subject,
                           signatory_title: signatoryTitle,
                         } as any}
                         letterRef={{ current: null }}
                         issueDate={startDateString ? new Date(startDateString) : new Date()}
                         language={language}
                         customText={language === "en" ? customTextEn : customTextAr}
                         recipient={recipient}
                         subject={subject}
                         signatoryTitle={signatoryTitle}
                         isMarkdown={isMarkdown}
                         signatureBase64={sigType === "upload" ? uploadedSig || undefined : (sigCanvas.current?.isEmpty() ? undefined : sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png"))}
                       />
                     )}
                   </div>
                 ) : (
                   <div className="w-full max-w-4xl opacity-50 flex flex-col items-center justify-center py-20 text-slate-400">
                      <Eye size={48} className="mb-4 text-slate-300" />
                      <h3 className="text-xl font-bold">Live Preview Area</h3>
                      <p className="text-sm font-medium mt-2">Select an application to see the real-time document preview.</p>
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
