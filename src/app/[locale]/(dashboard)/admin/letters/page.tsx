"use client";

import { Award, Search } from "lucide-react";
import DocumentIssuanceStudio from "@/app/[locale]/(dashboard)/admin/certificates/_components/DocumentIssuanceStudio";
import { GroupedCertificateList } from "@/app/[locale]/(dashboard)/admin/certificates/_components/GroupedCertificateList";
import { useLettersLogic } from "@/app/[locale]/(dashboard)/admin/letters/_hooks/useLettersLogic";
import { useTranslations } from "next-intl";
import { RoleGuard } from "@/components/RoleGuard";
import { LetterEmptyState } from "./_components/LetterEmptyState";

export default function AdminLetters() {
  return (
    <RoleGuard module="letters">
      <AdminLettersContent />
    </RoleGuard>
  );
}

function AdminLettersContent() {
  const tl = useTranslations("Dashboard.admin.letters");
  const { certificates, groupedCerts, searchTerm, setSearchTerm, isModalOpen, setIsModalOpen, eligibleApplications, isLoadingApplications, isIssuing, selectedAppId, setSelectedAppId, message, handleIssueCertificate } = useLettersLogic();

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Issued Letters</h1>
          <p className="text-foreground/60 font-medium">{tl("subtitle", { count: certificates.length })}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={tl("search")} className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm" />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2">
            <Award size={18} /> {tl("issueNew")}
          </button>
        </div>
      </div>

      {Object.keys(groupedCerts).length > 0 ? (
        <GroupedCertificateList groupedCerts={groupedCerts} type="letter" />
      ) : (
        <LetterEmptyState onIssueNew={() => setIsModalOpen(true)} />
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
