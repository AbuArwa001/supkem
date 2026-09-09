import { useState, useEffect } from "react";
import { certificateService } from "@/app/[locale]/(dashboard)/admin/certificates/_services/certificateService";
import { Certificate, EligibleApplication } from "@/app/[locale]/(dashboard)/admin/certificates/_types";

export function useLettersLogic() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [eligibleApplications, setEligibleApplications] = useState<EligibleApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const loadCertificates = async () => {
    const data = await certificateService.fetchLetters();
    setCertificates(data);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const fetchEligible = async () => {
        setIsLoadingApplications(true);
        const data = await certificateService.fetchEligibleApplications();
        setEligibleApplications(data);
        setIsLoadingApplications(false);
      };

      fetchEligible();
      setMessage(null);
      setSelectedAppId("");
    }
  }, [isModalOpen]);

  const handleIssueDocument = async (payload: any) => {
    setIsIssuing(true);
    setMessage(null);
    try {
      await certificateService.issueDocument(payload);
      setMessage({ type: 'success', text: `${payload.documentType} issued successfully!` });
      loadCertificates();
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (err: any) {
      console.error("Failed to issue certificate", err);
      setMessage({ type: 'error', text: err.response?.data?.detail || "Failed to issue certificate. Please try again." });
    } finally {
      setIsIssuing(false);
    }
  };

  const filteredCerts = certificates.filter((cert) =>
    (cert.organization_name || cert.application_detail?.user_name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedCerts = filteredCerts.reduce((acc: Record<string, Certificate[]>, cert) => {
    const serviceName = cert.application_detail?.service_name || cert.service_name || "Other Certifications";
    if (!acc[serviceName]) {
      acc[serviceName] = [];
    }
    acc[serviceName].push(cert);
    return acc;
  }, {} as Record<string, Certificate[]>);

  return {
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
    handleIssueCertificate: handleIssueDocument
  };
}
