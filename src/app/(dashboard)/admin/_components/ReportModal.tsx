"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileDown,
  BarChart3,
  TrendingUp,
  Layers,
  Building2,
  Users,
  FileText,
  Award,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { cn } from "@/lib/utils";
import { AreaChart, BarChart } from "./Charts";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const ReportModal = ({ isOpen, onClose, data }: ReportModalProps) => {
  const downloadReport = async () => {
    const reportElement = document.getElementById("report-content");
    if (!reportElement) return;

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(
      `SUPKEM_Analytical_Report_${new Date().toISOString().split("T")[0]}.pdf`,
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
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
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-600">
                  <BarChart3 size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Analytical Systems
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black font-outfit text-slate-900">
                  Data Insights Report
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={downloadReport}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  <FileDown size={18} /> Export PDF
                </button>
                <button
                  onClick={onClose}
                  className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div
              id="report-content"
              className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Section 1: Growth Trend */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
                      <TrendingUp className="text-indigo-600" size={20} />{" "}
                      Application Growth Trend
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                      Last 30 Days
                    </span>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                    <AreaChart data={data?.growth_trend || []} />
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Growth analysis shows consistent submission patterns with a{" "}
                    <span className="text-indigo-600 font-bold">
                      18% increase
                    </span>{" "}
                    compared to the previous cycle.
                  </p>
                </div>

                {/* Section 2: Distribution by Status */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
                      <Layers className="text-amber-500" size={20} /> Workflow
                      Distribution
                    </h3>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                    <BarChart data={data?.status_distribution || []} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {data?.status_distribution?.map((s: any, i: number) => (
                      <div
                        key={i}
                        className="p-4 bg-white border border-slate-100 rounded-2xl text-center"
                      >
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                          {s.status}
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                          {s.count}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Organization Types */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
                    <Building2 className="text-emerald-500" size={20} /> Impact
                    by Organization Sector
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data?.organization_types?.map((ot: any, i: number) => {
                    const icons = [Building2, Users, FileText, Award];
                    const colors = [
                      "bg-indigo-50 text-indigo-600",
                      "bg-emerald-50 text-emerald-600",
                      "bg-amber-50 text-amber-600",
                      "bg-blue-50 text-blue-600",
                    ];
                    const Icon = icons[i % icons.length];
                    const color = colors[i % colors.length];
                    return (
                      <div
                        key={i}
                        className="p-6 bg-white border border-slate-100 rounded-[14px] hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                      >
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                            color,
                          )}
                        >
                          <Icon size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                          {ot.type}
                        </p>
                        <div className="flex items-end justify-between">
                          <p className="text-2xl font-black text-slate-900">
                            {ot.count}
                          </p>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            +4%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
