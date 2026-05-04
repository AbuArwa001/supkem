import MarriageCertificateTemplate from "@/components/MarriageCertificateTemplate";
import SupportLetterTemplate from "@/components/SupportLetterTemplate";
import StudyAbroadLetterTemplate from "@/components/StudyAbroadLetterTemplate";
import TravelVisaAdvisoryTemplate from "@/components/TravelVisaAdvisoryTemplate";

import { Placeholder } from "@/app/[locale]/(dashboard)/portal/certificates/[id]/_components/Placeholder";
import { GenericCertificateContent } from "@/app/[locale]/(dashboard)/portal/certificates/[id]/_components/GenericCertificateContent";
import type { Certificate } from "@/services/certificate-service";

interface CertificateTemplateRouterProps {
  certificate: Certificate;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
}

/**
 * Selects the correct certificate template based on the service name.
 * Renders a fallback <Placeholder> if required sub-details are missing.
 */
export function CertificateTemplateRouter({
  certificate,
  issueDate,
  expiryDate,
  isValid,
}: CertificateTemplateRouterProps) {
  const serviceName =
    certificate.application_detail?.service_name?.toLowerCase() || "";

  if (serviceName.includes("marriage")) {
    return <MarriageCertificateTemplate certificate={certificate} />;
  }

  if (serviceName.includes("hajj") || serviceName.includes("umrah")) {
    return certificate.application_detail?.pilgrim_details ? (
      <SupportLetterTemplate certificate={certificate} />
    ) : (
      <Placeholder error="Pilgrim details missing. Please contact support." />
    );
  }

  if (serviceName.includes("study") || serviceName.includes("abroad")) {
    return certificate.application_detail?.education_details ? (
      <StudyAbroadLetterTemplate certificate={certificate} />
    ) : (
      <Placeholder error="Educational details missing. Please contact support." />
    );
  }

  if (serviceName.includes("visa") || serviceName.includes("travel")) {
    return certificate.application_detail?.travel_visa_details ? (
      <TravelVisaAdvisoryTemplate certificate={certificate} />
    ) : (
      <Placeholder error="Travel details missing. Please contact support." />
    );
  }

  return (
    <GenericCertificateContent
      certificate={certificate}
      issueDate={issueDate}
      expiryDate={expiryDate}
      isValid={isValid}
    />
  );
}
