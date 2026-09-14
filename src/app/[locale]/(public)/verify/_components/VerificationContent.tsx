"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  Printer, 
  ArrowLeft,
  FileText,
  Building2,
  UserCheck,
  Calendar,
  Clock,
  Award
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

interface VerificationData {
  is_valid: boolean;
  status: "Active" | "Expired" | "NotFound" | string;
  document_type: "Certificate" | "Letter" | string;
  serial_number: string;
  qr_code_hash: string;
  service_name: string;
  service_category?: string;
  organization_name?: string | null;
  holder_name?: string | null;
  custom_text_en?: string | null;
  custom_text_ar?: string | null;
  recipient?: string;
  subject?: string;
  issued_at: string;
  expires_at?: string | null;
  signatory_title?: string;
  has_digital_signature: boolean;
  language?: string;
  application_id?: string | null;
  detail?: string;
}

export function VerificationContent({ initialIdentifier }: { initialIdentifier?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryIdentifier = searchParams.get("hash") || searchParams.get("serial") || initialIdentifier || "";
  
  const [identifier, setIdentifier] = useState(queryIdentifier);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const fetchVerification = async (val: string) => {
    const clean = val.trim();
    if (!clean) return;

    setLoading(true);
    setNotFound(false);
    setErrorMessage("");
    setResult(null);

    try {
      const baseUrl = API_BASE_URL ? `${API_BASE_URL}/api/v1` : "/api/v1";
      const response = await axios.get<VerificationData>(`${baseUrl}/verify/${encodeURIComponent(clean)}/`);
      setResult(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setNotFound(true);
        setErrorMessage(err.response.data?.detail || "No official document found matching this identifier.");
      } else {
        setErrorMessage(err.response?.data?.detail || "Verification network request failed. Please check connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryIdentifier) {
      setIdentifier(queryIdentifier);
      fetchVerification(queryIdentifier);
    }
  }, [queryIdentifier]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    fetchVerification(identifier);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <span className="text-xs font-mono uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200/60 font-semibold tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Registry Live
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-linear-to-r from-emerald-600 via-primary to-amber-500" />
          
          <div className="flex flex-col items-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center p-3 mb-6 shadow-xs">
              <Image
                src="/logo.svg"
                alt="SUPKEM Emblem"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              SUPKEM Credential Verification
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800 mt-1 mb-2 font-arabic">
              المجلس الأعلى لمسلمي كينيا - التحقق الرسمي من الوثائق
            </p>
            <p className="text-sm text-slate-600 max-w-lg leading-relaxed">
              Verify the official authenticity of certificates, marriage credentials, pilgrim authorizations, and letters issued by the Supreme Council of Kenya Muslims.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full mt-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter Verification Hash (SUP-VRF-...) or Serial No. (CERT-...)"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm font-mono uppercase tracking-wide transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !identifier.trim()}
                className="px-7 py-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Verify Record</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Search Result Display */}
        {result && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Status Header Banner */}
            <div
              className={`p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b ${
                result.is_valid
                  ? "bg-emerald-50/70 border-emerald-200/60"
                  : "bg-amber-50/70 border-amber-200/60"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                    result.is_valid
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                  }`}
                >
                  {result.is_valid ? <ShieldCheck size={32} /> : <AlertTriangle size={32} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full ${
                        result.is_valid
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {result.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Verified at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    {result.is_valid
                      ? "Official Authentic Document"
                      : "Document Expired / Inactive"}
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Recorded in the Supreme Council of Kenya Muslims National Credential Database.
                  </p>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="no-print inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition"
              >
                <Printer size={15} />
                Print Verification
              </button>
            </div>

            {/* Document Details Grid */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column: Core Identity */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                      <span>Serial Number</span>
                      <button
                        onClick={() => handleCopy(result.serial_number, "serial")}
                        className="hover:text-slate-800 flex items-center gap-1 transition"
                      >
                        {copied === "serial" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copied === "serial" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <p className="text-lg font-black text-slate-900 font-mono tracking-tight">
                      {result.serial_number}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                      <span>Verification Hash</span>
                      <button
                        onClick={() => handleCopy(result.qr_code_hash, "hash")}
                        className="hover:text-slate-800 flex items-center gap-1 transition"
                      >
                        {copied === "hash" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copied === "hash" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <p className="text-sm font-mono text-emerald-900 font-bold break-all">
                      {result.qr_code_hash}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                      Document Type
                    </p>
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-emerald-700" />
                      <p className="font-bold text-slate-900">
                        {result.document_type === "Certificate" ? "Official Certificate" : "Official Support / Recommendation Letter"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Issued Information */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                      Service / Purpose
                    </p>
                    <div className="flex items-center gap-2">
                      <Award size={18} className="text-amber-600" />
                      <p className="font-bold text-slate-900">{result.service_name}</p>
                    </div>
                    {result.service_category && (
                      <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-200/60 text-slate-700 rounded">
                        Category: {result.service_category}
                      </span>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                      Issued To / Designated Holder
                    </p>
                    <div className="flex items-center gap-2">
                      {result.organization_name ? (
                        <Building2 size={18} className="text-blue-600" />
                      ) : (
                        <UserCheck size={18} className="text-emerald-600" />
                      )}
                      <p className="font-bold text-slate-900 text-base">
                        {result.holder_name || result.organization_name || result.recipient || "Designated Entity"}
                      </p>
                    </div>
                    {result.organization_name && result.holder_name && result.holder_name !== result.organization_name && (
                      <p className="text-xs text-slate-500 mt-1">
                        Affiliation: {result.organization_name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                        Issue Date
                      </p>
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm">
                        <Calendar size={14} className="text-slate-400" />
                        <span>{formatDate(result.issued_at)}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                        Valid Until
                      </p>
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm">
                        <Clock size={14} className="text-slate-400" />
                        <span>{result.expires_at ? formatDate(result.expires_at) : "Indefinite"}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Remarks / Subject if present */}
              {(result.subject || result.custom_text_en) && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Official Endorsement Record
                  </p>
                  {result.subject && (
                    <p className="font-bold text-slate-900 mb-1 text-sm">
                      Subject: {result.subject}
                    </p>
                  )}
                  {result.custom_text_en && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {result.custom_text_en}
                    </p>
                  )}
                </div>
              )}

              {/* Authentication & Security Guarantee Footer */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Digitally Certified by SUPKEM
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Signatory: {result.signatory_title || "National Leadership"}
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Protected by Tamper-Proof Cryptographic Hash
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Not Found State */}
        {notFound && (
          <div className="bg-white rounded-3xl border border-red-200 shadow-md p-8 sm:p-10 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
              <ShieldAlert size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Document Not Found or Unverified
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              No authentic SUPKEM certificate or letter matches the provided identifier (
              <span className="font-mono font-bold text-slate-800">{identifier}</span>
              ). Please verify the serial number or scan the QR code directly from the document.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => {
                  setIdentifier("");
                  setNotFound(false);
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Try Another Search
              </button>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition shadow-xs"
              >
                Report Potential Fraud
              </Link>
            </div>
          </div>
        )}

        {/* Error message state */}
        {errorMessage && !notFound && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Information FAQ Section */}
        {!result && !notFound && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Scan QR Code</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Scan the secure dynamic QR code printed at the bottom right of any official SUPKEM document.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Verify Serial Number</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter the unique serial code (e.g. CERT-XXXX or LTR-XXXX) located on the official header.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Instant Authenticity</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                View real-time issuance status, holder identification, and authorizing leadership credentials.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
