"use client";

// React/Next.js core

// External libraries
import { Award, Search } from "lucide-react";

// Internal components
import CertificateCard from "@/app/[locale]/(dashboard)/admin/certificates/_components/CertificateCard";
import DocumentIssuanceStudio from "@/app/[locale]/(dashboard)/admin/certificates/_components/DocumentIssuanceStudio";
import { useLettersLogic } from "@/app/[locale]/(dashboard)/admin/letters/_hooks/useLettersLogic";
import { useTranslations } from "next-intl";
import { RoleGuard } from "@/components/RoleGuard";

export default function AdminLetters() {
  return (
    <RoleGuard module="letters">
      <AdminLettersContent />
    </RoleGuard>
  );
}

function AdminLettersContent() {
  const t = useTranslations("Dashboard.admin.certificates");
  const tl = useTranslations("Dashboard.admin.letters");
<<<<<<< HEAD
  const tSn = useTranslations("Dashboard.admin.serviceNames");
=======
>>>>>>> d641572f8fa55aec97d7c0764ef67790b7be0ec7
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
  } = useLettersLogic();

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
            Issued Letters
          </h1>
          <p className="text-foreground/60 font-medium">
            {tl("subtitle", { count: certificates.length })}
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
              placeholder={tl("search")}
              className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2"
          >
            <Award size={18} /> {tl("issueNew")}
          </button>
        </div>
      </div>

      {Object.keys(groupedCerts).length > 0 ? (
        <div className="space-y-12">
<<<<<<< HEAD
          {Object.entries(groupedCerts).map(([serviceName, serviceCerts]) => {
            const displayHeader = serviceName === "Other Certifications" 
              ? tl("otherLetters") 
              : (tSn.has(serviceName) ? tSn(serviceName) : serviceName);
            return (
              <div key={serviceName} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <h3 className="text-lg font-black text-secondary uppercase tracking-[0.2em] px-4 whitespace-nowrap">
                    {displayHeader}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
=======
          {Object.entries(groupedCerts).map(([serviceName, serviceCerts]) => (
            <div key={serviceName} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h3 className="text-lg font-black text-secondary uppercase tracking-[0.2em] px-4 whitespace-nowrap">
                  {serviceName === "Other Certifications" ? tl("otherLetters") : serviceName}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
>>>>>>> d641572f8fa55aec97d7c0764ef67790b7be0ec7

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceCerts.map((cert, index) => (
                  <CertificateCard key={cert.id} cert={cert} index={index} type="letter" />
                ))}
              </div>
            </div>
          );
        })}
        </div>
      ) : (
        <div className="bg-white border border-border/80 rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-20 h-20 bg-blue-500/10 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Award size={40} />
          </div>
          <h3 className="text-2xl font-black font-outfit text-slate-800 tracking-tight mb-2">
            No Letters Issued Yet
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            {tl("noLettersDesc")}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg inline-flex items-center gap-2"
          >
            <Award size={18} /> {tl("issueNew")}
          </button>
        </div>
      )}

      <DocumentIssuanceStudio
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eligibleApplications={eligibleApplications}
        isLoadingApplications={isLoadingApplications}
        isIssuing={isIssuing}
        selectedAppId={selectedAppId}
        setSelectedAppId={setSelectedAppId}
        message={message}
        handleIssueDocument={handleIssueCertificate}
      />
    </div>
  );
}
