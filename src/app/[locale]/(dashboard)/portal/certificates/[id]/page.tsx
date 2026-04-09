"use client";

import { useCertificateDetailLogic } from "./_hooks/useCertificateDetailLogic";
import { CertificateHeader } from "./_components/CertificateHeader";
import { CertificateCanvas } from "./_components/CertificateCanvas";
import { CertificateReference } from "./_components/CertificateReference";
import { CertificateLoading } from "./_components/CertificateLoading";
import { CertificateError } from "./_components/CertificateError";

/**
 * Portal Certificate Detail Page
 * Authenticates and displays official digital certificates.
 */
export default function CertificateDetail() {
  const {
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
  } = useCertificateDetailLogic();

  if (loading) return <CertificateLoading />;

  if (error || !certificate) {
    return (
      <CertificateError error={error} onBack={() => router.push("/portal")} />
    );
  }

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <CertificateHeader
        onBack={() => router.back()}
        onPrint={handlePrint}
        onDownload={handleDownloadPDF}
        isDownloading={isDownloading}
      />

      <CertificateCanvas
        ref={certificateRef}
        certificate={certificate}
        issueDate={issueDate}
        expiryDate={expiryDate}
        isValid={isValid}
      />

      {certificate.application && (
        <CertificateReference applicationId={certificate.application} />
      )}
    </div>
  );
}
