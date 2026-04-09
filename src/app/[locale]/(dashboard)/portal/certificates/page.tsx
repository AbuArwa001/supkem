"use client";

// External libraries
import { AlertCircle } from "lucide-react";

// Internal modules
import { useCertificatesLogic } from "@/app/(dashboard)/portal/certificates/_hooks/useCertificatesLogic";
import CertificatesSkeleton from "@/app/(dashboard)/portal/certificates/_components/CertificatesSkeleton";
import EmptyCertificates from "@/app/(dashboard)/portal/certificates/_components/EmptyCertificates";
import CertificateCard from "@/app/(dashboard)/portal/certificates/_components/CertificateCard";

export default function CertificatesPage() {
  const { certificates, groupedCertificates, isLoading, error } =
    useCertificatesLogic();

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header section */}
      <div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
          My Certificates
        </h2>
        <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">
          Access and download your official SUPKEM certificates (e.g., Islamic
          Marriage Certificate).
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">
            Failed to load certificates. Please try refreshing the page.
          </span>
        </div>
      )}

      {/* Content Display */}
      <div className="space-y-12">
        {isLoading ? (
          <CertificatesSkeleton />
        ) : certificates.length === 0 ? (
          <EmptyCertificates />
        ) : (
          Object.entries(groupedCertificates).map(
            ([serviceName, serviceCerts]) => (
              <div key={serviceName} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <h3 className="text-lg font-black text-secondary uppercase tracking-[0.2em] px-4 whitespace-nowrap">
                    {serviceName}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceCerts.map((cert) => (
                    <CertificateCard key={cert.id} cert={cert} />
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
