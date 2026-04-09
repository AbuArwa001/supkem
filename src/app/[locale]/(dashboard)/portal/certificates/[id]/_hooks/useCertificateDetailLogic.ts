"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { domToPng } from "modern-screenshot";
import jsPDF from "jspdf";
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
    try {
      const dataUrl = await domToPng(certificateRef.current, {
        scale: 2,
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [img.width / 2, img.height / 2],
      });

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        img.width / 2,
        img.height / 2,
        undefined,
        "FAST",
      );
      pdf.save(
        `SUPKEM-Certificate-${certificate?.serial_number || "Digital"}.pdf`,
      );
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
