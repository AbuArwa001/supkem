import { useState } from "react";
import { Trash2 } from "lucide-react";
import TimelineStatus from "@/app/[locale]/(dashboard)/admin/applications/[id]/_components/TimelineStatus";
import type { ApplicationDetail } from "@/app/[locale]/(dashboard)/admin/applications/_types";
import DocumentIssuanceStudio from "@/app/[locale]/(dashboard)/admin/certificates/_components/DocumentIssuanceStudio";
import { certificateService } from "@/app/[locale]/(dashboard)/admin/certificates/_services/certificateService";
import { ActionStatusCard } from "./ActionStatusCard";

interface ActionSidebarProps {
  app: ApplicationDetail;
  submitting: boolean;
  handleAction: (status: string) => void;
  handleDelete: () => void;
}

export default function ActionSidebar({
  app,
  submitting,
  handleAction,
  handleDelete,
}: ActionSidebarProps) {
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueMessage, setIssueMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string>(app.id.toString());

  const handleIssueDocument = async (payload: any) => {
    setIsIssuing(true);
    setIssueMessage(null);
    try {
      await certificateService.issueDocument(payload);
      setIssueMessage({ type: "success", text: `${payload.documentType} issued successfully!` });
      setTimeout(() => {
        setIsStudioOpen(false);
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error("Failed to issue document", err);
      setIssueMessage({ type: "error", text: err.response?.data?.detail || "Failed to issue document. Please try again." });
    } finally {
      setIsIssuing(false);
    }
  };

  return (
    <div className="space-y-8">
      <ActionStatusCard
        status={app.status}
        payment={app.payment}
        submitting={submitting}
        handleAction={handleAction}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      <DocumentIssuanceStudio
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        eligibleApplications={[{
          id: app.id.toString(),
          organization_name: app.organization_name,
          user_name: (app as any).user_name,
          service_name: app.service_name,
          service_document_type: (app as any).service_document_type,
        }]}
        isLoadingApplications={false}
        isIssuing={isIssuing}
        selectedAppId={selectedAppId}
        setSelectedAppId={setSelectedAppId}
        message={issueMessage}
        handleIssueDocument={handleIssueDocument}
      />

      <TimelineStatus app={app} />

      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={handleDelete}
          disabled={submitting}
          className="w-full py-4 sm:py-5 bg-white border border-rose-100 text-rose-500 rounded-2xl sm:rounded-[24px] font-bold text-sm sm:text-base hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 size={20} /> Delete Application
        </button>
      </div>
    </div>
  );
}
