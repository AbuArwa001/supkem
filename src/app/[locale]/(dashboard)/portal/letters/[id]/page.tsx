"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { domToPng } from "modern-screenshot";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Printer,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import api from "@/lib/api";
import { LetterCanvas } from "@/app/[locale]/(dashboard)/admin/certificates/_components/LetterCanvas";
import { DocumentScaleWrapper } from "@/components/DocumentScaleWrapper";
import { useTranslations } from "next-intl";

export default function LetterDetail() {
  const t = useTranslations("Dashboard.portal.lettersPage");
  const params = useParams();
  const router = useRouter();
  const [letter, setLetter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        if (params.id) {
          const res = await api.get(
            `/applications/letters/${params.id}/`,
          );
          setLetter(res.data);
        }
      } catch (err: any) {
        console.error("Failed to fetch letter", err);
        setError(
          err.response?.data?.detail ||
            "Letter not found or you do not have permission.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLetter();
  }, [params.id]);

  const handleDownloadPDF = async () => {
    if (!letterRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await domToPng(letterRef.current, { scale: 2 });
      const img = new (window as any).Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [img.width / 2, img.height / 2],
      });
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        img.width / 2,
        img.height / 2,
        undefined,
        "FAST",
      );
      pdf.save(
        `SUPKEM-Letter-${letter?.serial_number || "Official"}.pdf`,
      );
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-primary/60 font-medium">{t("loadingLetter")}</p>
      </div>
    );
  }

  if (error || !letter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <HelpCircle size={48} />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-black font-outfit text-slate-800">
            {t("letterNotFound")}
          </h2>
          <p className="text-slate-500 font-medium">
            {error || t("letterNotFound")}
          </p>
        </div>
        <button
          onClick={() => router.push("/portal/letters")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          {t("backToLetters")}
        </button>
      </div>
    );
  }

  const serviceName =
    letter.application_detail?.service_name?.toLowerCase() || "";

  const renderTemplate = () => {
    return (
      <DocumentScaleWrapper baseWidth={794} baseHeight={1123}>
        <LetterCanvas
          letter={letter}
          letterRef={letterRef}
          issueDate={new Date(letter.issued_at)}
          language={letter.language || "en"}
          customText={letter.language === "ar" ? letter.custom_text_ar : letter.custom_text_en}
          signatureBase64={letter.digital_signature}
        />
      </DocumentScaleWrapper>
    );
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto print:space-y-0 print:pb-0 print:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between no-print print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white border border-border/50 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all group no-print"
          >
            <ArrowLeft
              size={20}
              className="text-slate-600 group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-primary tracking-tight">
              {t("officialLetter")}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
              {letter.application_detail?.service_name || t("officialLetter")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 no-print print:hidden">
          <button
            onClick={handlePrint}
            className="p-3 sm:p-4 bg-white border border-border/50 rounded-2xl text-slate-600 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all active:scale-95 group"
          >
            <Printer
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="p-3 sm:p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 group flex items-center gap-3 font-bold border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download
                size={20}
                className="group-hover:-translate-y-1 transition-transform"
              />
            )}
            <span className="hidden sm:inline">
              {isDownloading ? t("generating") : t("downloadPdf")}
            </span>
          </button>
        </div>
      </div>

      <div className="w-full pb-8 print:pb-0">
          {renderTemplate()}
      </div>

      {/* Application Reference */}
      {letter.application && (
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 no-print print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                {t("refApp")}
              </p>
              <p className="text-sm font-bold text-slate-800">
                #{String(letter.application).substring(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
          <Link
            href={`/portal/applications/${letter.application}`}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:border-slate-300 hover:shadow-sm transition-all"
          >
            {t("refApp")}
          </Link>
        </div>
      )}
    </div>
  );
}
