"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { domToPng } from "modern-screenshot";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    Search,
    Calendar,
    ShieldCheck,
    Download,
    Printer,
    HelpCircle,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminCertificateDetail() {
    const params = useParams();
    const router = useRouter();
    const [certificate, setCertificate] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                if (params.id) {
                    const res = await api.get(
                        `/applications/certifications/${params.id}/`,
                    );
                    setCertificate(res.data);
                }
            } catch (err: any) {
                console.error("Failed to fetch certificate", err);
                setError(
                    err.response?.data?.detail ||
                    "Certificate not found or you do not have permission.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [params.id]);

    const handleDownloadPDF = async () => {
        if (!certificateRef.current) return;

        setIsDownloading(true);
        try {
            const dataUrl = await domToPng(certificateRef.current, {
                scale: 2,
            });

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
                `SUPKEM-Certificate-${certificate?.serial_number || "Digital"}.pdf`,
            );
        } catch (err) {
            console.error("Failed to generate PDF", err);
        } finally {
            setIsDownloading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 rounded-lgborder-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-primary/60 font-medium">
                    Retrieving Certificate Registry Data...
                </p>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
                <div className="w-24 h-24 rounded-lgbg-red-50 text-red-500 flex items-center justify-center">
                    <HelpCircle size={48} />
                </div>
                <div className="space-y-2 max-w-md">
                    <h2 className="text-2xl font-black font-outfit text-slate-800">
                        Certificate Record Not Found
                    </h2>
                    <p className="text-slate-500 font-medium">
                        {error || "The requested certificate registry record could not be retrieved."}
                    </p>
                </div>
                <button
                    onClick={() => router.push("/admin/certificates")}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
                >
                    Return to Registry
                </button>
            </div>
        );
    }

    const issueDate = new Date(certificate.issued_at);
    const expiryDate = certificate.expires_at
        ? new Date(certificate.expires_at)
        : null;
    const isValid = expiryDate ? expiryDate > new Date() : true;

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
                            Registry Detail
                        </h1>
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
                            Administrative Record View
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
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-lganimate-spin" />
                        ) : (
                            <Download
                                size={20}
                                className="group-hover:-translate-y-1 transition-transform"
                            />
                        )}
                        <span className="hidden sm:inline">
                            {isDownloading ? "Generating..." : "Download Original"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Certificate Canvas */}
            <motion.div
                ref={certificateRef}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white border border-border/80 shadow-2xl rounded-[40px] overflow-hidden p-8 md:p-16 lg:p-24 flex flex-col items-center text-center max-w-4xl mx-auto print:shadow-none print:border-none print:rounded-none print:m-0 print:p-8 certificate-canvas"
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
            html,
            body {
              height: auto !important;
              overflow: visible !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .no-print,
            header,
            nav,
            aside,
            button {
              display: none !important;
              visibility: hidden !important;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
          .certificate-canvas {
            --primary-safe: #16543d;
            --secondary-safe: #e7b408;
            --slate-800-safe: #1e293b;
            --slate-500-safe: #64748b;
          }
          .certificate-canvas :global(.text-primary) {
            color: var(--primary-safe) !important;
          }
          .certificate-canvas :global(.text-secondary) {
            color: var(--secondary-safe) !important;
          }
          .certificate-canvas :global(.bg-primary\/5) {
            background-color: rgba(22, 84, 61, 0.05) !important;
          }
          .certificate-canvas :global(.bg-secondary\/10) {
            background-color: rgba(231, 180, 8, 0.1) !important;
          }
          .certificate-canvas :global(.border-primary\/10) {
            border-color: rgba(22, 84, 61, 0.1) !important;
          }
          .certificate-canvas :global(.border-primary\/5) {
            border-color: rgba(22, 84, 61, 0.05) !important;
          }
        `}</style>
                {/* Background Decor */}
                <div
                    className="absolute top-0 right-0 w-96 h-96 rounded-lgblur-[100px] -translate-y-1/2 translate-x-1/2"
                    style={{ backgroundColor: "rgba(22, 84, 61, 0.05)" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-96 h-96 rounded-lgblur-[100px] translate-y-1/2 -translate-x-1/2"
                    style={{ backgroundColor: "rgba(231, 180, 8, 0.1)" }}
                />
                <div
                    className="absolute inset-4 border rounded-[28px] pointer-events-none"
                    style={{ borderColor: "rgba(22, 84, 61, 0.1)" }}
                />
                <div
                    className="absolute inset-6 border-4 border-double rounded-[20px] pointer-events-none"
                    style={{ borderColor: "rgba(22, 84, 61, 0.05)" }}
                />

                <div className="relative z-10 w-full flex flex-col items-center">
                    <Image
                        src="/logo.svg"
                        alt="SUPKEM Logo"
                        width={80}
                        height={80}
                        className="mb-8 opacity-90 drop-shadow-sm"
                    />

                    <div
                        className="tracking-widest uppercase text-xs font-black mb-12 flex items-center gap-4 w-full"
                        style={{ color: "#16543d" }}
                    >
                        <div
                            className="h-px flex-1"
                            style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }}
                        />
                        <span>Supreme Council of Kenya Muslims</span>
                        <div
                            className="h-px flex-1"
                            style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }}
                        />
                    </div>

                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight mb-8"
                        style={{ color: "#1e293b" }}
                    >
                        {certificate.service_name || "Official Certification"}
                    </h2>

                    <p
                        className="text-lg md:text-xl font-medium max-w-2xl mb-12"
                        style={{ color: "#64748b" }}
                    >
                        This record confirms that{" "}
                        <strong
                            className="border-b pb-0.5"
                            style={{ color: "#16543d", borderColor: "rgba(22, 84, 61, 0.2)" }}
                        >
                            {certificate.organization_name ||
                                "The designated organization"}
                        </strong>{" "}
                        has been officially accredited by SUPKEM.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
                        <div
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: "rgba(248, 250, 252, 0.5)",
                                borderColor: "rgba(241, 245, 249, 0.5)",
                            }}
                        >
                            <p
                                className="text-[10px] uppercase tracking-widest font-bold mb-1"
                                style={{ color: "#94a3b8" }}
                            >
                                Serial Number
                            </p>
                            <p
                                className="font-mono font-bold text-sm truncate"
                                style={{ color: "#1e293b" }}
                            >
                                {certificate.serial_number}
                            </p>
                        </div>
                        <div
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: "rgba(248, 250, 252, 0.5)",
                                borderColor: "rgba(241, 245, 249, 0.5)",
                            }}
                        >
                            <p
                                className="text-[10px] uppercase tracking-widest font-bold mb-1"
                                style={{ color: "#94a3b8" }}
                            >
                                Date of Issue
                            </p>
                            <p
                                className="font-bold text-sm tracking-wide"
                                style={{ color: "#1e293b" }}
                            >
                                {issueDate.toLocaleDateString()}
                            </p>
                        </div>
                        <div
                            className="p-4 rounded-2xl border"
                            style={{
                                backgroundColor: "rgba(248, 250, 252, 0.5)",
                                borderColor: "rgba(241, 245, 249, 0.5)",
                            }}
                        >
                            <p
                                className="text-[10px] uppercase tracking-widest font-bold mb-1"
                                style={{ color: "#94a3b8" }}
                            >
                                Valid Until
                            </p>
                            <p
                                className="font-bold text-sm tracking-wide"
                                style={{ color: "#1e293b" }}
                            >
                                {expiryDate ? expiryDate.toLocaleDateString() : "Indefinite"}
                            </p>
                        </div>
                        <div
                            className="p-4 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden group"
                            style={{
                                backgroundColor: isValid ? "#f0fdf4" : "#fef2f2",
                                borderColor: "transparent",
                            }}
                        >
                            <p
                                className="text-[10px] uppercase tracking-widest font-bold mb-1 relative z-10"
                                style={{ color: "#94a3b8" }}
                            >
                                Status
                            </p>
                            <p
                                className="font-black tracking-widest uppercase text-sm relative z-10"
                                style={{ color: isValid ? "#059669" : "#dc2626" }}
                            >
                                {isValid ? "Active" : "Expired"}
                            </p>
                        </div>
                    </div>

                    <div
                        className="flex items-center justify-between w-full border-t pt-8 mt-auto"
                        style={{ borderColor: "rgba(226, 232, 240, 0.6)" }}
                    >
                        <div className="text-left">
                            <div
                                className="w-40 h-10 border-b flex items-end"
                                style={{ borderColor: "#1e293b" }}
                            >
                                <span
                                    className="font-serif text-2xl italic px-2 -mb-2"
                                    style={{ color: "#475569" }}
                                >
                                    Registry Officer
                                </span>
                            </div>
                            <p
                                className="text-[10px] font-bold uppercase tracking-widest mt-4"
                                style={{ color: "#94a3b8" }}
                            >
                                SUPKEM HQ Seal
                            </p>
                        </div>

                        <div
                            className="w-24 h-24 bg-white border rounded-xl p-2 shadow-sm flex flex-col items-center justify-center shrink-0"
                            style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}
                        >
                            <div
                                className="w-full h-full rounded flex items-center justify-center"
                                style={{ backgroundColor: "#f8fafc" }}
                            >
                                <ShieldCheck size={32} style={{ color: "#cbd5e1" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Application Reference Section */}
            {certificate.application && (
                <div className="max-w-4xl mx-auto flex items-center justify-between p-6 bg-primary/[0.02] rounded-3xl border border-primary/10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lgbg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-0.5">
                                Linked Application
                            </p>
                            <p className="text-sm font-bold text-primary">
                                Registry ID: {String(certificate.application).toUpperCase()}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={`/admin/applications/${certificate.application}`}
                        className="px-6 py-3 bg-white border border-primary/20 text-primary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                        Review Source App
                    </Link>
                </div>
            )}
        </div>
    );
}
