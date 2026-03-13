"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
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
import Link from "next/link";
import api from "@/lib/api";
import SupportLetterTemplate from "@/components/SupportLetterTemplate";
import StudyAbroadLetterTemplate from "@/components/StudyAbroadLetterTemplate";
import TravelVisaAdvisoryTemplate from "@/components/TravelVisaAdvisoryTemplate";

export default function LetterDetail() {
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
            `/applications/certifications/${params.id}/`,
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
        <p className="text-primary/60 font-medium">Loading Official Letter...</p>
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
            Letter Not Found
          </h2>
          <p className="text-slate-500 font-medium">
            {error || "The requested letter could not be found."}
          </p>
        </div>
        <button
          onClick={() => router.push("/portal/letters")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Back to My Letters
        </button>
      </div>
    );
  }

  const serviceName =
    letter.application_detail?.service_name?.toLowerCase() || "";

  const renderTemplate = () => {
    if (
      serviceName.includes("hajj") ||
      serviceName.includes("umrah")
    ) {
      return letter.application_detail?.pilgrim_details ? (
        <SupportLetterTemplate certificate={letter} />
      ) : (
        <div className="py-20 text-slate-400 font-medium text-center">
          <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
          <p>Pilgrim details missing. Please contact support.</p>
        </div>
      );
    }

    if (
      serviceName.includes("study") ||
      serviceName.includes("abroad")
    ) {
      return letter.application_detail?.education_details ? (
        <StudyAbroadLetterTemplate certificate={letter} />
      ) : (
        <div className="py-20 text-slate-400 font-medium text-center">
          <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
          <p>Educational details missing. Please contact support.</p>
        </div>
      );
    }

    if (
      serviceName.includes("visa") ||
      serviceName.includes("travel")
    ) {
      return letter.application_detail?.travel_visa_details ? (
        <TravelVisaAdvisoryTemplate certificate={letter} />
      ) : (
        <div className="py-20 text-slate-400 font-medium text-center">
          <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
          <p>Travel details missing. Please contact support.</p>
        </div>
      );
    }

    return (
      <div className="py-20 text-slate-400 font-medium text-center">
        <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
        <p>Unknown letter type. Please contact support.</p>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <h1 className="text-3xl font-black font-outfit text-primary tracking-tight">
              Official Letter
            </h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
              {letter.application_detail?.service_name || "Document View"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 no-print">
          <button
            onClick={handlePrint}
            className="p-4 bg-white border border-border/50 rounded-2xl text-slate-600 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all active:scale-95 group"
          >
            <Printer
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 group flex items-center gap-3 font-bold border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {isDownloading ? "Generating..." : "Download PDF"}
            </span>
          </button>
        </div>
      </div>

      {/* Letter Canvas */}
      <motion.div
        ref={letterRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white border border-border/80 shadow-2xl rounded-[20px] overflow-hidden p-8 md:p-16 lg:p-24 flex flex-col items-center text-center max-w-4xl mx-auto print:shadow-none print:border-none print:rounded-none print:m-0 print:p-8 certificate-canvas"
      >
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .certificate-canvas,
            .certificate-canvas * {
              visibility: visible !important;
            }
            .certificate-canvas {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 2rem !important;
              border: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              background-color: white !important;
            }
            html, body {
              height: auto !important;
              overflow: visible !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .no-print, header, nav, aside, button {
              display: none !important;
              visibility: hidden !important;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}</style>
        <div className="relative z-10 w-full flex flex-col items-center">
          {renderTemplate()}
        </div>
      </motion.div>

      {/* Application Reference */}
      {letter.application && (
        <div className="max-w-4xl mx-auto flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                Reference Application
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
            View App Details
          </Link>
        </div>
      )}
    </div>
  );
}
