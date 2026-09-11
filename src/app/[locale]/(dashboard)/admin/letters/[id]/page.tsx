"use client";

import React from "react";
import { useCertificateLogic } from "./_hooks/useCertificateLogic";
import { CertificateHeader } from "./_components/CertificateHeader";
import { CertificateCanvas } from "./_components/CertificateCanvas";
import { LetterCanvas } from "@/app/[locale]/(dashboard)/admin/certificates/_components/LetterCanvas";
import { CertificateLoading } from "./_components/CertificateLoading";
import { CertificateError } from "./_components/CertificateError";
import { ApplicationReference } from "./_components/ApplicationReference";

import { DocumentScaleWrapper } from "@/components/DocumentScaleWrapper";

/**
 * Admin Certificate Detail Page
 * Refactored to follow strict readability constraints.
 */
export default function AdminCertificateDetail() {
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
    handleBack,
    handleReturnToRegistry,
  } = useCertificateLogic();

  if (loading) {
    return <CertificateLoading />;
  }

  if (error || !certificate) {
    return <CertificateError error={error} onReturn={handleReturnToRegistry} />;
  }

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <CertificateHeader
        isDownloading={isDownloading}
        onBack={handleBack}
        onPrint={handlePrint}
        onDownload={handleDownloadPDF}
      />

      <DocumentScaleWrapper baseWidth={794} baseHeight={1123}>
        <LetterCanvas
          letter={certificate}
          letterRef={certificateRef}
          issueDate={issueDate}
          language={certificate.language || "en"}
          customText={certificate.language === "ar" ? certificate.custom_text_ar : certificate.custom_text_en}
          signatureBase64={certificate.digital_signature}
        />
      </DocumentScaleWrapper>

      {certificate.application && (
        <ApplicationReference applicationId={certificate.application} />
      )}
    </div>
  );
}
