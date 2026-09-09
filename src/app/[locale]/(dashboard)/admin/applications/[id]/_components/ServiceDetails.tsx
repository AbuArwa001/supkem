// External libraries
import { motion } from "framer-motion";

// Internal components & types
import ServiceHeader from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/ServiceHeader";
import MarriageParticulars from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/particulars/MarriageParticulars";
import PilgrimParticulars from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/particulars/PilgrimParticulars";
import EducationDetails from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/particulars/EducationDetails";
import TravelVisaDetails from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/particulars/TravelVisaDetails";
import EmploymentDetails from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/particulars/EmploymentDetails";
import type { ApplicationDetail } from "@/app/[locale]/(dashboard)/admin/applications/_types";

export default function ServiceDetails({ app }: { app: ApplicationDetail }) {
  if (!app) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8"
    >
      <ServiceHeader app={app} />

      <MarriageParticulars details={app.marriage_details} />
      <PilgrimParticulars details={app.pilgrim_details} />
      <EducationDetails details={app.education_details} />
      <TravelVisaDetails details={app.travel_visa_details} />
      <EmploymentDetails details={app.employment_details} />

      <div className="space-y-4 pt-6 border-t border-slate-100 mt-8">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Applicant Comments
        </p>
        <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed font-medium italic shadow-inner">
          "{app.comments || "No comments provided by the applicant."}"
        </div>
      </div>
    </motion.div>
  );
}
