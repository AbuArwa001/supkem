"use client";

import { useCertificateDetailLogic } from "./_hooks/useCertificateDetailLogic";
import { CertificateHeader } from "./_components/CertificateHeader";
import { CertificateCanvas } from "./_components/CertificateCanvas";
import { CertificateReference } from "./_components/CertificateReference";
import { CertificateLoading } from "./_components/CertificateLoading";
import { CertificateError } from "./_components/CertificateError";

import { DocumentScaleWrapper } from "@/components/DocumentScaleWrapper";
import { DownloadProgressModal } from "@/components/DownloadProgressModal";

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

  const isMarriage = (
    certificate?.service_name ||
    certificate?.application_detail?.service_name ||
    ""
  ).toLowerCase().includes("marriage");

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <CertificateHeader
        onBack={() => router.back()}
        onPrint={handlePrint}
        onDownload={handleDownloadPDF}
        isDownloading={isDownloading}
      />

      <DocumentScaleWrapper
        isLandscape={!isMarriage}
        baseWidth={isMarriage ? 820 : 1000}
        baseHeight={isMarriage ? 1160 : 700}
      >
        <CertificateCanvas
          ref={certificateRef}
          certificate={certificate}
          issueDate={issueDate}
          expiryDate={expiryDate}
          isValid={isValid}
        />
      </DocumentScaleWrapper>

      {certificate.application && (
        <CertificateReference applicationId={certificate.application} />
      )}

      <DownloadProgressModal
        isOpen={isDownloading}
        documentType="Certificate"
        title="Generating Official SUPKEM Certificate"
        serialNumber={certificate.serial_number}
      />
    </div>
  );
}
