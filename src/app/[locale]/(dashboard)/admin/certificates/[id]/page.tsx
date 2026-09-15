"use client";

import React from "react";
import { useCertificateLogic } from "./_hooks/useCertificateLogic";
import { CertificateHeader } from "./_components/CertificateHeader";
import { CertificateCanvas } from "./_components/CertificateCanvas";
import { CertificateLoading } from "./_components/CertificateLoading";
import { CertificateError } from "./_components/CertificateError";
import { ApplicationReference } from "./_components/ApplicationReference";

import { DocumentScaleWrapper } from "@/components/DocumentScaleWrapper";
import { DownloadProgressModal } from "@/components/DownloadProgressModal";
import { RoleGuard } from "@/components/RoleGuard";

import MarriageCertificateTemplate from "@/components/MarriageCertificateTemplate";

export default function AdminCertificateDetail() {
  return (
    <RoleGuard module="certificates">
      <AdminCertificateDetailContent />
    </RoleGuard>
  );
}

function AdminCertificateDetailContent() {
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

  const serviceName = (
    certificate.service_name ||
    certificate.application_detail?.service_name ||
    ""
  ).toLowerCase();
  const isMarriage = serviceName.includes("marriage");

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <CertificateHeader
        isDownloading={isDownloading}
        onBack={handleBack}
        onPrint={handlePrint}
        onDownload={handleDownloadPDF}
      />

      <DocumentScaleWrapper
        isLandscape={!isMarriage}
        baseWidth={isMarriage ? 820 : 1000}
        baseHeight={isMarriage ? 1160 : 700}
      >
        {isMarriage ? (
          <div ref={certificateRef} className="w-full flex justify-center bg-transparent">
            <MarriageCertificateTemplate certificate={certificate} />
          </div>
        ) : (
          <CertificateCanvas
            certificate={certificate}
            certificateRef={certificateRef}
            issueDate={issueDate}
            expiryDate={expiryDate}
            isValid={isValid}
            language={certificate.language || "en"}
            customText={
              certificate.language === "ar"
                ? certificate.custom_text_ar
                : certificate.custom_text_en
            }
            signatureBase64={certificate.digital_signature}
            signatoryTitle={certificate.signatory_title}
          />
        )}
      </DocumentScaleWrapper>

      {certificate.application && (
        <ApplicationReference applicationId={certificate.application} />
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
