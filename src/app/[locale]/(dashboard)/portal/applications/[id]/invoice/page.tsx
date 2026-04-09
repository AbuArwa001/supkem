"use client";

// React/Next.js core
import { Suspense } from "react";
import { ArrowLeft, Printer } from "lucide-react";

// Internal — hooks, components
import { useInvoice } from "./_hooks/useInvoice";
import { InvoiceHeader } from "./_components/InvoiceHeader";
import { InvoiceMetadata } from "./_components/InvoiceMetadata";
import { InvoiceTable } from "./_components/InvoiceTable";
import { InvoiceFooter } from "./_components/InvoiceFooter";
import { useAuth } from "@/hooks/useAuth";

function InvoicePageContent() {
  const { user } = useAuth();
  const { app, loading, refCode, fee, receiptNo, serviceName, paidAt, submittedAt, isOrg, handleBack, handlePrint } = useInvoice();

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-[#0b4a2d] border-t-transparent rounded-full animate-spin" /></div>;
  if (!app) return <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 gap-4"><p className="text-lg font-bold">Invoice not found.</p><button onClick={handleBack} className="text-sm text-[#0b4a2d] font-black underline">Back to Applications</button></div>;

  const applicantName = user ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() : "—";

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <button onClick={handleBack} className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform"><ArrowLeft className="w-4 h-4" /></div>
          Back to Application
        </button>
        <button onClick={handlePrint} className="flex items-center gap-2 bg-[#0b4a2d] hover:bg-[#06331e] text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-[#0b4a2d]/20 hover:-translate-y-0.5 transition-all duration-200">
          <Printer className="w-5 h-5" /> Print / Save PDF
        </button>
      </div>

      <div id="invoice-printable" className="max-w-4xl mx-auto bg-white rounded-[16px] shadow-2xl shadow-slate-200/60 overflow-hidden print:shadow-none print:rounded-none">
        <InvoiceHeader refCode={refCode} paidAt={paidAt} />
        <div className="px-12 py-10 space-y-10">
          <InvoiceMetadata applicantName={applicantName} isOrg={isOrg} orgName={app.organization?.name} email={user?.email} phone={user?.phone_number} receiptNo={receiptNo} submittedAt={submittedAt} />
          <InvoiceTable serviceName={serviceName} refCode={refCode} fee={fee} />
          <InvoiceFooter />
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          body > :not(#invoice-printable), .print\:hidden { display: none !important; }
          #invoice-printable { position: static !important; width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
}

export default function InvoicePage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#0b4a2d] border-t-transparent rounded-full animate-spin" /></div>}><InvoicePageContent /></Suspense>;
}
