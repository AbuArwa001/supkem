import { useState, useRef, useEffect } from "react";
import { DocumentType, Language } from "./studioTypes";
import { EligibleApplication } from "../_types";
import { determineInitialDocType, buildIssuePayload } from "./studioUtils";

export function useDocumentIssuanceStudio(
  eligibleApplications: EligibleApplication[],
  selectedAppId: string,
  setSelectedAppId: (id: string) => void,
  handleIssueDocument: (payload: any) => void
) {
  const [docType, setDocType] = useState<DocumentType>("Certificate");
  const [language, setLanguage] = useState<Language>("en");
  const [recipient, setRecipient] = useState("To Whom It May Concern");
  const [subject, setSubject] = useState("");
  const [signatoryTitle, setSignatoryTitle] = useState("National Chairman");
  const [startDateString, setStartDateString] = useState(() => new Date().toISOString().split("T")[0]);
  const [isIndefinite, setIsIndefinite] = useState(true);
  const [expiryDateString, setExpiryDateString] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split("T")[0];
  });
  const [isMarkdown, setIsMarkdown] = useState(false);
  const [customTextEn, setCustomTextEn] = useState("");
  const [customTextAr, setCustomTextAr] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [sigType, setSigType] = useState<"draw" | "upload">("draw");
  const sigCanvas = useRef<any>(null);
  const [uploadedSig, setUploadedSig] = useState<string | null>(null);

  const selectedApp = eligibleApplications.find(a => a.id === selectedAppId);

  useEffect(() => {
    if (!selectedApp) return;
    setDocType(determineInitialDocType(selectedApp));
    if (!subject && selectedApp.service_name) {
      setSubject(`OFFICIAL RECOMMENDATION - ${selectedApp.service_name.toUpperCase()}`);
    }
    setIsIndefinite(selectedApp.service_is_indefinite !== false);
    if ((selectedApp as any).service_start_date) setStartDateString((selectedApp as any).service_start_date);
    if ((selectedApp as any).service_end_date || selectedApp.service_expiration_date) {
      setExpiryDateString((selectedApp as any).service_end_date || selectedApp.service_expiration_date);
      setIsIndefinite(false);
    }
  }, [selectedAppId, selectedApp, subject]);

  useEffect(() => {
    setSignatoryTitle(docType === "Letter" ? "Secretary General" : "National Chairman");
  }, [docType]);

  const insertVariable = (variableKey: string) => {
    const tag = `{{${variableKey}}}`;
    if (language === "en") {
      const el = textareaRef.current;
      const [start, end] = [el?.selectionStart || 0, el?.selectionEnd || 0];
      setCustomTextEn(prev => el ? prev.substring(0, start) + tag + prev.substring(end) : prev + " " + tag);
    } else {
      setCustomTextAr(prev => prev + " " + tag);
    }
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setUploadedSig(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUploadedSig(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;
    const signatureData = sigType === "draw" && sigCanvas.current && !sigCanvas.current.isEmpty()
      ? sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
      : sigType === "upload" && uploadedSig ? uploadedSig : "";

    handleIssueDocument(buildIssuePayload({
      selectedAppId, docType, language, customTextEn, customTextAr,
      signatureData, recipient, subject, signatoryTitle, startDateString,
      isIndefinite, expiryDateString
    }));
  };

  return {
    docType, setDocType, language, setLanguage, recipient, setRecipient,
    subject, setSubject, signatoryTitle, setSignatoryTitle, startDateString,
    setStartDateString, isIndefinite, setIsIndefinite, expiryDateString, setExpiryDateString,
    isMarkdown, setIsMarkdown, customTextEn, setCustomTextEn, customTextAr, setCustomTextAr,
    textareaRef, sigType, setSigType, sigCanvas, uploadedSig, selectedApp,
    insertVariable, clearSignature, handleFileUpload, submitForm,
  };
}
