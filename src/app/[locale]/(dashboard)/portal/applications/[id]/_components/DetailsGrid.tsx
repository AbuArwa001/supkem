"use client";

import { motion } from "framer-motion";
import { FileText, Building2 } from "lucide-react";

interface DetailsGridProps {
  application: {
    id: string;
    service_name: string;
    organization_name?: string;
    user_name: string;
    submitted_at: string;
    updated_at: string;
    payment?: {
      status: string;
      amount: string;
      receipt_number?: string;
    };
    marriage_details?: any;
    pilgrim_details?: any;
    education_details?: any;
    travel_visa_details?: any;
    employment_details?: any;
  };
}

export const DetailsGrid = ({ application }: DetailsGridProps) => {
  const hasSpecificDetails = application.marriage_details || application.pilgrim_details || application.education_details || application.travel_visa_details || application.employment_details;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Service Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 md:p-10 bg-white border border-slate-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group"
      >
        <div className="flex items-center gap-5 border-b border-slate-100 pb-8">
          <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Requested Service
            </p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1 group-hover:text-primary transition-colors">
              {application.service_name}
            </h3>
          </div>
        </div>

        <div className="space-y-1 pt-6">
          <DetailItem label="Submission Date" value={new Date(application.submitted_at).toLocaleDateString()} />
          <DetailItem label="Last Updated" value={new Date(application.updated_at).toLocaleDateString()} />
          <DetailItem label="Application ID" value={application.id} isMono />
          <DetailItem 
            label="Payment Status" 
            value={application.payment ? application.payment.status : "Pending/Unpaid"} 
          />
          {application.payment?.amount && (
            <DetailItem label="Amount" value={`KES ${application.payment.amount}`} />
          )}
          {application.payment?.receipt_number && (
            <DetailItem label="Receipt No." value={application.payment.receipt_number} isMono />
          )}
        </div>
      </motion.div>

      {/* Entity Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 md:p-10 bg-white border border-slate-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group"
      >
        <div className="flex items-center gap-5 border-b border-slate-100 pb-8">
          <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 group-hover:scale-110 transition-transform duration-500">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Entity Details
            </p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              {application.organization_name || "Personal/Individual Application"}
            </h3>
          </div>
        </div>

        <div className="space-y-1 pt-6">
          <DetailItem label="Applicant Name" value={application.user_name} />
        </div>
      </motion.div>

      {/* Specific Details */}
      {hasSpecificDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 p-8 md:p-10 bg-white border border-slate-100 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group"
        >
          <div className="flex items-center gap-5 border-b border-slate-100 pb-8">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Application Content
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Specific Details
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-1 pt-6">
            {application.marriage_details && (
              <>
                <DetailItem label="Husband Name" value={application.marriage_details.husband_name} />
                <DetailItem label="Wife Name" value={application.marriage_details.wife_name} />
                <DetailItem label="Date of Marriage" value={application.marriage_details.date_of_marriage} />
                <DetailItem label="Place of Marriage" value={application.marriage_details.place_of_marriage} />
              </>
            )}
            {application.pilgrim_details && (
              <>
                <DetailItem label="Pilgrim Name" value={application.pilgrim_details.full_name} />
                <DetailItem label="Passport No." value={application.pilgrim_details.passport_number} />
                <DetailItem label="Trip Type" value={application.pilgrim_details.trip_type} />
                <DetailItem label="Expected Travel Date" value={application.pilgrim_details.expected_travel_date} />
              </>
            )}
            {application.education_details && (
              <>
                <DetailItem label="Student Name" value={application.education_details.full_name} />
                <DetailItem label="Institution" value={application.education_details.institution_name} />
                <DetailItem label="Course" value={application.education_details.course_of_study} />
                <DetailItem label="Country" value={application.education_details.country} />
              </>
            )}
            {application.travel_visa_details && (
              <>
                <DetailItem label="Traveler Name" value={application.travel_visa_details.full_name} />
                <DetailItem label="Passport No." value={application.travel_visa_details.passport_number} />
                <DetailItem label="Destination" value={application.travel_visa_details.destination_country} />
                <DetailItem label="Trip Purpose" value={application.travel_visa_details.trip_purpose} />
              </>
            )}
            {application.employment_details && (
              <>
                <DetailItem label="Applicant Name" value={application.employment_details.full_name} />
                <DetailItem label="ID Number" value={application.employment_details.id_number} />
                <DetailItem label="Position" value={application.employment_details.position_applied_for} />
                <DetailItem label="Employer" value={application.employment_details.employer_name} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value, isMono = false }: { label: string; value: string; isMono?: boolean }) => (
  <div className="flex justify-between items-center py-4 border-b border-slate-50 last:border-0">
    <span className="text-slate-500 font-medium text-sm">{label}</span>
    <span className={isMono ? "text-slate-900 font-mono text-xs font-semibold bg-slate-100 px-2 py-1 rounded" : "text-slate-900 font-bold text-sm"}>
      {value}
    </span>
  </div>
);
