"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { downloadElementAsPdf } from "@/lib/pdfDownloader";
import { CertificateService, Certificate } from "@/services/certificate-service";

export function useCertificateDetailLogic() {
  const params = useParams();
  const router = useRouter();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        if (params.id) {
          const data = await CertificateService.getCertificate(params.id as string);
          setCertificate(data);
        }
      } catch (err: any) {
        console.error("Failed to fetch certificate", err);
        setError(
          err.response?.data?.detail ||
          "Certificate not found or you do not have permission.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [params.id]);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);
    const startTime = Date.now();
    const serviceName = (
      certificate?.service_name ||
      certificate?.application_detail?.service_name ||
      ""
    ).toLowerCase();
    const isMarriage = serviceName.includes("marriage");

    try {
      await downloadElementAsPdf(
        certificateRef.current,
        `SUPKEM-Certificate-${certificate?.serial_number || "Digital"}.pdf`,
        { orientation: isMarriage ? "portrait" : "landscape" }
      );
      const elapsed = Date.now() - startTime;
      if (elapsed < 1200) {
        await new Promise((r) => setTimeout(r, 1200 - elapsed));
      }
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const issueDate = certificate ? new Date(certificate.issued_at) : null;
  const expiryDate = certificate?.expires_at
    ? new Date(certificate.expires_at)
    : null;
  const isValid = expiryDate ? expiryDate > new Date() : true;

  return {
    certificate,
    loading,
    error,
    isDownloading,
    certificateRef,
    issueDate,
    expiryDate,
    isValid,
    handleDownloadPDF,
    handlePrint,
    router,
  };
}
