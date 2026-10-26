"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { DetailItem } from "./DetailItem";

interface SpecificDetailsCardProps {
  serviceName: string;
  marriageDetails?: any;
  pilgrimDetails?: any;
  educationDetails?: any;
  travelVisaDetails?: any;
  employmentDetails?: any;
}

export function SpecificDetailsCard({
  serviceName,
  marriageDetails,
  pilgrimDetails,
  educationDetails,
  travelVisaDetails,
  employmentDetails,
}: SpecificDetailsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-5 sm:p-8 md:p-10 bg-white border border-slate-100 rounded-2xl sm:rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group"
    >
      <div className="flex items-center gap-4 sm:gap-5 border-b border-slate-100 pb-6 sm:pb-8">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
          <FileText size={22} className="sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Application Content</p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 break-words">
            {serviceName} — Details
          </h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-1 pt-6">
        {marriageDetails && (
          <>
            <DetailItem label="Husband Name" value={marriageDetails.husband_name} />
            <DetailItem label="Wife Name" value={marriageDetails.wife_name} />
            <DetailItem label="Date of Marriage" value={marriageDetails.date_of_marriage} />
            <DetailItem label="Place of Marriage" value={marriageDetails.place_of_marriage} />
          </>
        )}
        {pilgrimDetails && (
          <>
            <DetailItem label="Pilgrim Name" value={pilgrimDetails.full_name} />
            <DetailItem label="Passport No." value={pilgrimDetails.passport_number} />
            <DetailItem label="Trip Type" value={pilgrimDetails.trip_type} />
            <DetailItem label="Expected Travel Date" value={pilgrimDetails.expected_travel_date} />
          </>
        )}
        {educationDetails && (
          <>
            <DetailItem label="Student Name" value={educationDetails.full_name} />
            <DetailItem label="Institution" value={educationDetails.institution_name} />
            <DetailItem label="Course" value={educationDetails.course_of_study} />
            <DetailItem label="Country" value={educationDetails.country} />
          </>
        )}
        {travelVisaDetails && (
          <>
            <DetailItem label="Traveler Name" value={travelVisaDetails.full_name} />
            <DetailItem label="Passport No." value={travelVisaDetails.passport_number} />
            <DetailItem label="Destination" value={travelVisaDetails.destination_country} />
            <DetailItem label="Trip Purpose" value={travelVisaDetails.trip_purpose} />
          </>
        )}
        {employmentDetails && (
          <>
            <DetailItem label="Applicant Name" value={employmentDetails.full_name} />
            <DetailItem label="ID Number" value={employmentDetails.id_number} />
            <DetailItem label="Position" value={employmentDetails.position_applied_for} />
            <DetailItem label="Employer" value={employmentDetails.employer_name} />
          </>
        )}
      </div>
    </motion.div>
  );
}
