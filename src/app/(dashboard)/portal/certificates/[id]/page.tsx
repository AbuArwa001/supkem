"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function CertificateDetail() {
  const params = useParams();
  const router = useRouter();
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        // Ensure ID exists before fetching
        if (params.id) {
          const res = await api.get(`/certifications/${params.id}/`);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-primary/60 font-medium">
          Authenticating Certificate Details...
        </p>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <HelpCircle size={48} />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-black font-outfit text-slate-800">
            Certificate Not Found
          </h2>
          <p className="text-slate-500 font-medium">
            {error || "The requested certificate could not be authenticated."}
          </p>
        </div>
        <button
          onClick={() => router.push("/portal")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Return to Dashboard
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
            className="p-3 bg-white border border-border/50 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all group"
          >
            <ArrowLeft
              size={20}
              className="text-slate-600 group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <div>
            <h1 className="text-3xl font-black font-outfit text-primary tracking-tight">
              Digital Certificate
            </h1>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">
              Official Document View
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-4 bg-white border border-border/50 rounded-2xl text-slate-600 hover:text-primary hover:border-primary/20 hover:shadow-lg transition-all active:scale-95 group">
            <Printer
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button className="p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 group flex items-center gap-3 font-bold border border-primary/20">
            <Download
              size={20}
              className="group-hover:-translate-y-1 transition-transform"
            />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Certificate Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white border border-border/80 shadow-2xl rounded-[40px] overflow-hidden p-8 md:p-16 lg:p-24 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-4 border border-primary/10 rounded-[28px] pointer-events-none" />
        <div className="absolute inset-6 border-4 border-double border-primary/5 rounded-[20px] pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="SUPKEM Logo"
            width={80}
            height={80}
            className="mb-8 opacity-90 drop-shadow-sm"
          />

          <div className="text-primary tracking-widest uppercase text-xs font-black mb-12 flex items-center gap-4 w-full">
            <div className="h-px bg-primary/10 flex-1" />
            <span>Supreme Council of Kenya Muslims</span>
            <div className="h-px bg-primary/10 flex-1" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit text-slate-800 tracking-tight leading-tight mb-8">
            {certificate.application?.service_name || "Official Certification"}
          </h2>

          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mb-12">
            This is to certify that{" "}
            <strong className="text-primary border-b border-primary/20 pb-0.5">
              {certificate.application?.organization_name ||
                "The designated organization"}
            </strong>{" "}
            has successfully met the standards and requirements for this
            certification.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                Serial Number
              </p>
              <p className="font-mono text-slate-800 font-bold text-sm truncate">
                {certificate.serial_number}
              </p>
            </div>
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                Date of Issue
              </p>
              <p className="text-slate-800 font-bold text-sm tracking-wide">
                {issueDate.toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                Valid Until
              </p>
              <p className="text-slate-800 font-bold text-sm tracking-wide">
                {expiryDate ? expiryDate.toLocaleDateString() : "Indefinite"}
              </p>
            </div>
            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center relative overflow-hidden group">
              <div
                className={cn(
                  "absolute inset-0 transition-opacity mix-blend-multiply",
                  isValid ? "bg-emerald-50" : "bg-red-50",
                )}
              />
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 relative z-10">
                Status
              </p>
              <p
                className={cn(
                  "font-black tracking-widest uppercase text-sm relative z-10",
                  isValid ? "text-emerald-600" : "text-red-600",
                )}
              >
                {isValid ? "Valid" : "Expired"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full border-t border-border/60 pt-8 mt-auto">
            <div className="text-left">
              <div className="w-40 h-10 border-b border-slate-800 flex items-end">
                {/* Placeholder for signature image or cursive font */}
                <span className="font-serif text-2xl text-slate-600 italic px-2 -mb-2">
                  Official Signatory
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-4">
                Authorized Signature
              </p>
            </div>

            {/* Placeholder for QR Code */}
            <div className="w-24 h-24 bg-white border border-border/80 rounded-xl p-2 shadow-sm flex flex-col items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-50 rounded bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWNlY2VjIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0wIDEwaDQwdk0wIDIwaDQvTTAgMzBoNDB2TTEwaDB2NDBNMjBoMHY0ME0zMGgwdjQwIi8+PC9zdmc+')] mix-blend-multiply opacity-50 flex items-center justify-center">
                {/* Simulating QR Code Hash visual representation */}
                <Search size={24} className="text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Application Reference Section */}
      {certificate.application && (
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
                #{certificate.application.id.substring(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
          <Link
            href={`/portal/applications/${certificate.application.id}`}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:border-slate-300 hover:shadow-sm transition-all"
          >
            View App Details
          </Link>
        </div>
      )}
    </div>
  );
}
