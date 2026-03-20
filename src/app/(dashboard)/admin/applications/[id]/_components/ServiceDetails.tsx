import { motion } from "framer-motion";

import ServiceHeader from "@/app/(dashboard)/admin/applications/[id]/_components/ServiceHeader";
import MarriageParticulars from "@/app/(dashboard)/admin/applications/[id]/_components/particulars/MarriageParticulars";
import PilgrimParticulars from "@/app/(dashboard)/admin/applications/[id]/_components/particulars/PilgrimParticulars";
import EducationDetails from "@/app/(dashboard)/admin/applications/[id]/_components/particulars/EducationDetails";
import TravelVisaDetails from "@/app/(dashboard)/admin/applications/[id]/_components/particulars/TravelVisaDetails";
import EmploymentDetails from "@/app/(dashboard)/admin/applications/[id]/_components/particulars/EmploymentDetails";

export default function ServiceDetails({ app }: { app: any }) {
  if (!app) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-10 rounded-[20px] bg-white border border-border shadow-sm space-y-8"
    >
      <ServiceHeader app={app} />

      <MarriageParticulars details={app.marriage_details} />
      <PilgrimParticulars details={app.pilgrim_details} />
      <EducationDetails details={app.education_details} />
      <TravelVisaDetails details={app.travel_visa_details} />
      <EmploymentDetails details={app.employment_details} />

      <div className="space-y-4 pt-6 border-t border-border mt-8">
        <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
          Applicant Comments
        </p>
        <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 text-foreground/80 leading-relaxed font-medium italic">
          "{app.comments || "No comments provided by the applicant."}"
        </div>
      </div>
    </motion.div>
  );
}
