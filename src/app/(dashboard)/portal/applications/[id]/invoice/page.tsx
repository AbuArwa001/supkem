"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  Download,
  ShieldCheck,
  Calendar,
  Hash,
  User,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

const getApplication = (id: string): Promise<any> =>
  api.get(`/applications/applications/${id}/`).then((r) => r.data);

function InvoicePageContent() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);

  const appId = params.id as string;
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appId) {
      getApplication(appId)
        .then(setApp)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [appId]);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#0b4a2d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-4">
        <p className="text-lg font-bold">Invoice not found.</p>
        <button
          onClick={() => router.push("/portal/applications")}
          className="text-sm text-[#0b4a2d] font-black underline"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  const payment = app.payment;
  const fee = Number(payment?.amount ?? app.service?.fee ?? 0);
  const receiptNo = payment?.receipt_number ?? "—";
  const refCode = `APP-${appId.split("-").pop()?.toUpperCase()}`;
  const serviceName = app.service?.name ?? "Service";
  const paidAt = payment?.updated_at
    ? new Date(payment.updated_at)
    : new Date();
  const submittedAt = app.submitted_at
    ? new Date(app.submitted_at)
    : new Date();
  const isOrg = !!app.organization;

  const applicantName = user
    ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
    : "—";

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      {/* Action Bar - hidden on print */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <button
          onClick={() => router.push(`/portal/applications/${appId}`)}
          className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Application
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#0b4a2d] hover:bg-[#06331e] text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-[#0b4a2d]/20 hover:-translate-y-0.5 transition-all duration-200"
        >
          <Printer className="w-5 h-5" />
          Print / Save PDF
        </button>
      </div>

      {/* Invoice Card */}
      <div
        ref={printRef}
        className="max-w-4xl mx-auto bg-white rounded-[16px] shadow-2xl shadow-slate-200/60 overflow-hidden print:shadow-none print:rounded-none"
      >
        {/* Header banner */}
        <div
          className="relative px-12 py-10 bg-[#0b4a2d] text-white overflow-hidden"
          style={{
            backgroundImage: "url('/payment-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "soft-light",
          }}
        >
          <div className="absolute inset-0 bg-[#0b4a2d]/80 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Logo */}
              <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-lg flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="SUPKEM"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">SUPKEM</h1>
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-0.5">
                  Supreme Council of Kenya Muslims
                </p>
              </div>
            </div>

            {/* Paid badge */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 px-5 py-2 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                <span className="text-[#25D366] font-black text-sm uppercase tracking-widest">
                  PAID
                </span>
              </div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                Official Receipt
              </p>
            </div>
          </div>

          {/* Invoice title row */}
          <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex items-end justify-between">
            <div>
              <p className="text-white/50 text-xs font-black uppercase tracking-[0.2em] mb-1">
                Invoice / Receipt
              </p>
              <p className="text-5xl font-black tracking-tight text-white">
                {refCode}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-white/50 text-xs font-black uppercase tracking-widest">
                Date Issued
              </p>
              <p className="text-white font-bold text-lg">
                {paidAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-12 py-10 space-y-10">
          {/* Billed To + Payment ref row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Billed To */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Billed To
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-[#0b4a2d]" />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-lg leading-tight">
                      {applicantName}
                    </p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {isOrg ? app.organization?.name : "Individual Applicant"}
                    </p>
                  </div>
                </div>
                {user?.email && (
                  <div className="flex items-center gap-3 pl-1">
                    <Mail className="w-4 h-4 text-slate-400 ml-3" />
                    <p className="text-sm text-slate-600 font-semibold">
                      {user.email}
                    </p>
                  </div>
                )}
                {user?.phone_number && (
                  <div className="flex items-center gap-3 pl-1">
                    <Phone className="w-4 h-4 text-slate-400 ml-3" />
                    <p className="text-sm text-slate-600 font-semibold">
                      {user.phone_number}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Reference */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Payment Details
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Hash className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      M-Pesa Receipt No.
                    </p>
                    <p className="font-mono font-black text-slate-800 text-lg tracking-wider">
                      {receiptNo}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Payment Method
                    </p>
                    <p className="font-bold text-slate-800">M-Pesa STK Push</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Application Submitted
                    </p>
                    <p className="font-bold text-slate-800">
                      {submittedAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Line items table */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              Service Details
            </p>
            <div className="rounded-2xl overflow-hidden border border-slate-100">
              {/* Table header */}
              <div className="bg-slate-50 px-6 py-4 grid grid-cols-12 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
                <span className="col-span-7">Description</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-3 text-right">Amount</span>
              </div>
              {/* Service row */}
              <div className="px-6 py-5 grid grid-cols-12 items-center border-t border-slate-100">
                <div className="col-span-7">
                  <p className="font-black text-slate-800">{serviceName}</p>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">
                    SUPKEM Application — {refCode}
                  </p>
                </div>
                <div className="col-span-2 text-center font-bold text-slate-600">
                  1
                </div>
                <div className="col-span-3 text-right font-black text-slate-800">
                  KES {fee.toLocaleString()}
                </div>
              </div>
              {/* VAT row */}
              <div className="px-6 py-4 grid grid-cols-12 items-center border-t border-slate-100 bg-slate-50/50">
                <div className="col-span-7">
                  <p className="font-semibold text-slate-500 text-sm">
                    Service Charge
                  </p>
                </div>
                <div className="col-span-2 text-center font-semibold text-slate-400 text-sm">
                  —
                </div>
                <div className="col-span-3 text-right font-bold text-slate-500 text-sm">
                  KES 0
                </div>
              </div>
              <div className="px-6 py-4 grid grid-cols-12 items-center border-t border-slate-100 bg-slate-50/50">
                <div className="col-span-7">
                  <p className="font-semibold text-slate-500 text-sm">
                    VAT (Included)
                  </p>
                </div>
                <div className="col-span-2 text-center font-semibold text-slate-400 text-sm">
                  —
                </div>
                <div className="col-span-3 text-right font-bold text-slate-500 text-sm">
                  KES 0
                </div>
              </div>
              {/* Total */}
              <div className="px-6 py-6 grid grid-cols-12 items-center border-t-2 border-[#0b4a2d]/10 bg-gradient-to-r from-[#0b4a2d]/5 to-transparent">
                <div className="col-span-7">
                  <p className="font-black text-[#0b4a2d] text-lg uppercase tracking-wider">
                    Total Paid
                  </p>
                </div>
                <div className="col-span-2" />
                <div className="col-span-3 text-right">
                  <p className="font-black text-[#0b4a2d] text-3xl">
                    KES {fee.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification + security footer */}
          <div className="border-t border-dashed border-slate-200 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#0b4a2d]" />
              </div>
              <div>
                <p className="font-black text-slate-800 text-sm">
                  Verified Payment
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  This receipt was generated automatically upon successful
                  M-Pesa confirmation.
                </p>
              </div>
            </div>

            {/* M-Pesa logo */}
            <div className="flex items-center gap-3 shrink-0">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Processed via
              </p>
              <div className="w-24 h-10 bg-slate-50 border border-slate-200 rounded-xl p-2">
                <img
                  src="/M-PESA_LOGO-01.svg"
                  alt="M-Pesa"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Thank you for your payment. This is an official receipt from
              SUPKEM — Supreme Council of Kenya Muslims.
              <br />
              For any queries, contact us at{" "}
              <span className="text-[#0b4a2d] font-bold">
                applications@supkem.org
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-printable,
          #invoice-printable * {
            visibility: visible;
          }
          #invoice-printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#0b4a2d] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <InvoicePageContent />
    </Suspense>
  );
}
