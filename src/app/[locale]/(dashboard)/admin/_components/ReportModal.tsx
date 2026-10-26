"use client";

import { motion, AnimatePresence } from "framer-motion";
import { pdfService } from "../_services/pdfService";
import { ReportModalHeader } from "./report/ReportModalHeader";
import { ReportModalBody } from "./report/ReportModalBody";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const ReportModal = ({ isOpen, onClose, data }: ReportModalProps) => {
  const handleDownload = () => {
    const filename = `SUPKEM_Analytical_Report_${new Date().toISOString().split("T")[0]}.pdf`;
    pdfService.downloadElementAsPdf("report-content", filename);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col"
          >
            <ReportModalHeader onDownload={handleDownload} onClose={onClose} />
            <ReportModalBody data={data} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
