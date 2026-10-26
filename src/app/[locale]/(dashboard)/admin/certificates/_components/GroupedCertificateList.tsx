"use client";

import { useTranslations } from "next-intl";
import CertificateCard from "./CertificateCard";
import { Certificate } from "../_types";

interface GroupedCertificateListProps {
  groupedCerts: Record<string, Certificate[]>;
  type?: "certificate" | "letter";
}

export function GroupedCertificateList({ groupedCerts, type = "certificate" }: GroupedCertificateListProps) {
  const t = useTranslations("Dashboard.admin.certificates");
  const tSn = useTranslations("Dashboard.admin.serviceNames");

  return (
    <div className="space-y-12">
      {Object.entries(groupedCerts).map(([serviceName, serviceCerts]) => {
        const displayHeader =
          serviceName === "Other Certifications" ? t("otherCerts") : tSn.has(serviceName) ? tSn(serviceName) : serviceName;

        return (
          <div key={serviceName} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h3 className="text-lg font-black text-secondary uppercase tracking-[0.2em] px-4 whitespace-nowrap">
                {displayHeader}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCerts.map((cert, index) => (
                <CertificateCard key={cert.id} cert={cert} index={index} type={type} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
