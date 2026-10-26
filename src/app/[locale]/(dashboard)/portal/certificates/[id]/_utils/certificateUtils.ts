import type { Certificate } from "@/services/certificate-service";

export function getCertificateRecipient(certificate: Certificate, isArabic: boolean): string {
  return (
    certificate.holder_name ||
    certificate.application_detail?.holder_name ||
    certificate.organization_name ||
    certificate.application_detail?.organization_name ||
    certificate.user_name ||
    certificate.application_detail?.user_name ||
    certificate.recipient ||
    (isArabic ? "الجهة المعنية" : "The designated entity")
  );
}
