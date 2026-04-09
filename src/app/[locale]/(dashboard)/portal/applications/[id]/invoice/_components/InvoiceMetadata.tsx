// External libraries
import { User, Mail, Phone, Hash, CreditCard, Calendar } from "lucide-react";

interface InvoiceMetadataProps {
  applicantName: string;
  isOrg: boolean;
  orgName?: string;
  email?: string;
  phone?: string;
  receiptNo: string;
  submittedAt: Date;
}

export function InvoiceMetadata({
  applicantName,
  isOrg,
  orgName,
  email,
  phone,
  receiptNo,
  submittedAt,
}: InvoiceMetadataProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Billed To</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#0b4a2d]" />
            </div>
            <div>
              <p className="font-black text-slate-800 text-lg leading-tight">{applicantName}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                {isOrg ? orgName : "Individual Applicant"}
              </p>
            </div>
          </div>
          {email && (
            <div className="flex items-center gap-3 pl-1">
              <Mail className="w-4 h-4 text-slate-400 ml-3" />
              <p className="text-sm text-slate-600 font-semibold">{email}</p>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3 pl-1">
              <Phone className="w-4 h-4 text-slate-400 ml-3" />
              <p className="text-sm text-slate-600 font-semibold">{phone}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Payment Details</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Hash className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">M-Pesa Receipt No.</p>
              <p className="font-mono font-black text-slate-800 text-lg tracking-wider">{receiptNo}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Payment Method</p>
              <p className="font-bold text-slate-800">M-Pesa STK Push</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Application Submitted</p>
              <p className="font-bold text-slate-800">
                {submittedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
