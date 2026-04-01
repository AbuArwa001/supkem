import useSWR from "swr";
import api from "@/lib/api";

export interface ICertificate {
  id: number | string;
  application_detail?: {
    service_name?: string;
  };
  status?: string;
  serial_number?: string;
  issued_at?: string;
  expires_at?: string;
  expiry_date?: string;
}

export interface ICertificatesGroup {
  [serviceName: string]: ICertificate[];
}

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const CERT_KEYWORDS = ["marriage"];
const LETTER_KEYWORDS = ["hajj", "umrah", "study", "abroad", "visa", "travel"];

function isCertificate(cert: ICertificate): boolean {
  const serviceName = cert?.application_detail?.service_name?.toLowerCase() || "";
  const isLetter = LETTER_KEYWORDS.some((kw) => serviceName.includes(kw));
  return !isLetter;
}

export function useCertificatesLogic() {
  const { data, error, isLoading } = useSWR(
    "/applications/certifications/",
    fetcher
  );

  const allCerts = Array.isArray(data) ? data : data?.results || [];
  const certificates: ICertificate[] = allCerts.filter(isCertificate);

  const groupedCertificates = certificates.reduce(
    (acc: ICertificatesGroup, cert: ICertificate) => {
      const serviceName =
        cert.application_detail?.service_name || "Other Certificates";
      if (!acc[serviceName]) {
        acc[serviceName] = [];
      }
      acc[serviceName].push(cert);
      return acc;
    },
    {}
  );

  return {
    certificates,
    groupedCertificates,
    isLoading,
    error,
  };
}
