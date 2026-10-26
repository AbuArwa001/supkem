import { motion, AnimatePresence } from "framer-motion";
import { Award, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EligibleApplication } from "@/app/[locale]/(dashboard)/admin/certificates/_types";
import { EligibleAppSelect } from "./EligibleAppSelect";

interface IssueCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  eligibleApplications: EligibleApplication[];
  isLoadingApplications: boolean;
  isIssuing: boolean;
  selectedAppId: string;
  setSelectedAppId: (id: string) => void;
  message: { type: "success" | "error"; text: string } | null;
  handleIssueCertificate: (e: React.FormEvent) => void;
}

export default function IssueCertificateModal({
  isOpen,
  onClose,
  eligibleApplications,
  isLoadingApplications,
  isIssuing,
  selectedAppId,
  setSelectedAppId,
  message,
  handleIssueCertificate,
}: IssueCertificateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-lg rounded-[16px] overflow-hidden shadow-2xl border border-border"
          >
            <div className="p-8 border-b border-border flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><Award size={24} /></div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-primary tracking-tight">Issue New Certificate</h3>
                  <p className="text-xs font-medium text-foreground/40">Select an approved application</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-colors">
                <X size={20} className="text-foreground/40" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="p-8 space-y-6">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-2xl flex items-center gap-3 font-medium text-sm",
                    message.type === "success" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
                  )}
                >
                  {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </motion.div>
              )}

              <EligibleAppSelect
                eligibleApplications={eligibleApplications}
                isLoadingApplications={isLoadingApplications}
                disabled={isLoadingApplications || isIssuing || message?.type === "success"}
                selectedAppId={selectedAppId}
                onSelectAppId={setSelectedAppId}
              />

              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={!selectedAppId || isIssuing || message?.type === "success"}
                  className="w-full py-4 bg-primary text-white rounded-[20px] font-bold text-sm hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:transform-none"
                >
                  {isIssuing ? <><Loader2 size={18} className="animate-spin" /> Issuing Digital Certificate...</> : <><Award size={18} /> Generate Certificate</>}
                </button>
                <button type="button" onClick={onClose} className="w-full py-4 text-foreground/40 font-bold text-sm hover:text-primary transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
