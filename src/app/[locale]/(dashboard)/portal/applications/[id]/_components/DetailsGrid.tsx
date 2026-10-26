"use client";

import { motion } from "framer-motion";
import { FileText, Building2 } from "lucide-react";
import { getDocumentType } from "../_utils/documentType";
import { DetailItem } from "./DetailItem";
import { DocumentTypeBanner } from "./DocumentTypeBanner";
import { SpecificDetailsCard } from "./SpecificDetailsCard";
import type { DetailsGridProps } from "../_types";

export const DetailsGrid = ({ application }: DetailsGridProps) => {
  const docType = getDocumentType(application);
  const serialNo = application.letter?.serial_number || application.certification?.serial_number;

  return (
    <div className="space-y-6">
      <DocumentTypeBanner docType={docType} category={application.service_category} serialNumber={serialNo} />

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 sm:p-8 md:p-10 bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group"
        >
          <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-100 pb-6 sm:pb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <FileText size={22} className="sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Requested Service</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 group-hover:text-primary transition-colors break-words">
                {application.service_name}
              </h3>
            </div>
          </div>

          <div className="space-y-1 pt-6">
            <DetailItem label="Submission Date" value={new Date(application.submitted_at).toLocaleDateString()} />
            <DetailItem label="Last Updated" value={new Date(application.updated_at).toLocaleDateString()} />
            <DetailItem label="Application ID" value={application.id} isMono />
            <DetailItem label="Payment Status" value={application.payment ? application.payment.status : "Pending/Unpaid"} />
            {application.payment?.amount && <DetailItem label="Amount" value={`KES ${application.payment.amount}`} />}
            {application.payment?.receipt_number && <DetailItem label="Receipt No." value={application.payment.receipt_number} isMono />}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 sm:p-8 md:p-10 bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group"
        >
          <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-100 pb-6 sm:pb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 group-hover:scale-110 transition-transform duration-500">
              <Building2 size={22} className="sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Entity Details</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 break-words">
                {application.organization_name || "Personal/Individual Application"}
              </h3>
            </div>
          </div>

          <div className="space-y-1 pt-6">
            <DetailItem label="Applicant Name" value={application.user_name} />
          </div>
        </motion.div>
      </div>

      <SpecificDetailsCard
        serviceName={application.service_name}
        marriageDetails={application.marriage_details}
        pilgrimDetails={application.pilgrim_details}
        educationDetails={application.education_details}
        travelVisaDetails={application.travel_visa_details}
        employmentDetails={application.employment_details}
      />
    </div>
  );
};
