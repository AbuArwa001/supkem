"use client";

// React/Next.js core

// External libraries
import { Award, Search } from "lucide-react";

// Internal components
import CertificateCard from "@/app/[locale]/(dashboard)/admin/certificates/_components/CertificateCard";
import IssueCertificateModal from "@/app/[locale]/(dashboard)/admin/certificates/_components/IssueCertificateModal";
import { useCertificatesLogic } from "@/app/[locale]/(dashboard)/admin/certificates/_hooks/useCertificatesLogic";

export default function AdminCertificates() {
  const {
    certificates,
    groupedCerts,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    eligibleApplications,
    isLoadingApplications,
    isIssuing,
    selectedAppId,
    setSelectedAppId,
    message,
    handleIssueCertificate,
  } = useCertificatesLogic();

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
            Certification Registry
          </h1>
          <p className="text-foreground/60 font-medium">
            Tracking all {certificates.length} active and archived digital
            certificates.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by organization..."
              className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2"
          >
            <Award size={18} /> Issue New
          </button>
        </div>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedCerts).map(([serviceName, serviceCerts]) => (
          <div key={serviceName} className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h3 className="text-lg font-black text-secondary uppercase tracking-[0.2em] px-4 whitespace-nowrap">
                {serviceName}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCerts.map((cert, index) => (
                <CertificateCard key={cert.id} cert={cert} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <IssueCertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eligibleApplications={eligibleApplications}
        isLoadingApplications={isLoadingApplications}
        isIssuing={isIssuing}
        selectedAppId={selectedAppId}
        setSelectedAppId={setSelectedAppId}
        message={message}
        handleIssueCertificate={handleIssueCertificate}
      />
    </div>
  );
}
