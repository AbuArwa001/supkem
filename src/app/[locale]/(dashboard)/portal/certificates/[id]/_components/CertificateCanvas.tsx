"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

import { CertificatePrintStyles } from "@/app/[locale]/(dashboard)/portal/certificates/[id]/_components/CertificatePrintStyles";
import { CertificateBackground } from "@/app/[locale]/(dashboard)/portal/certificates/[id]/_components/CertificateBackground";
import { CertificateTemplateRouter } from "@/app/[locale]/(dashboard)/portal/certificates/[id]/_components/CertificateTemplateRouter";
import type { Certificate } from "@/services/certificate-service";

interface CertificateCanvasProps {
  certificate: Certificate;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
}

export const CertificateCanvas = forwardRef<HTMLDivElement, CertificateCanvasProps>(
  ({ certificate, issueDate, expiryDate, isValid }, ref) => {
    const serviceName =
      certificate.application_detail?.service_name?.toLowerCase() || "";
    const isMarriage = serviceName.includes("marriage");

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white border border-border/80 shadow-2xl rounded-[20px] overflow-hidden p-8 md:p-16 lg:p-24 flex flex-col items-center text-center max-w-4xl mx-auto print:shadow-none print:border-none print:rounded-none print:m-0 print:p-8 certificate-canvas"
      >
        <CertificatePrintStyles />
        <CertificateBackground hidden={isMarriage} />

        <div className="relative z-10 w-full flex flex-col items-center">
          <CertificateTemplateRouter
            certificate={certificate}
            issueDate={issueDate}
            expiryDate={expiryDate}
            isValid={isValid}
          />
        </div>
      </motion.div>
    );
  },
);

CertificateCanvas.displayName = "CertificateCanvas";
