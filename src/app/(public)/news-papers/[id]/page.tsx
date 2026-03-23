import React from "react";
import { notFound } from "next/navigation";
import { ChevronLeft, Download } from "lucide-react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { getNewsPaperById } from "@/app/(public)/news/_services/newsService";

export default async function NewsPaperViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paper = await getNewsPaperById(id);

  if (!paper || !paper.is_published) {
    notFound();
  }

  const pdfUrl = paper.file
    ? paper.file.startsWith("http")
      ? paper.file
      : `${API_BASE_URL}${paper.file.startsWith("/") ? "" : "/"}${paper.file}`
    : null;

  if (!pdfUrl) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-black font-outfit text-primary">
          PDF Not Available
        </h1>
        <p className="text-foreground/60">
          The document for this issue is currently unavailable.
        </p>
        <Link
          href="/news"
          className="text-primary hover:underline font-bold mt-4"
        >
          &larr; Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-primary transition-colors mb-4 uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back to News
          </Link>
          <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tight text-primary leading-tight">
            {paper.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm font-semibold text-foreground/60 uppercase tracking-widest">
            <span>{new Date(paper.published_date).toLocaleDateString()}</span>
            {paper.issue_number && (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Issue {paper.issue_number}
                </span>
              </>
            )}
          </div>
        </div>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-8 py-4 bg-primary text-white rounded-[20px] font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 w-full md:w-auto action-button-scale"
        >
          <Download size={20} />
          Download PDF
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-border/50 rounded-[32px] p-2 md:p-6 shadow-2xl shadow-primary/5 h-[80vh] min-h-[600px] flex overflow-hidden">
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-full rounded-[24px]"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p className="text-foreground/60 font-medium">
                Your browser does not support inline PDFs.
              </p>
              <a
                href={pdfUrl}
                className="text-primary font-bold hover:underline py-2 px-4 rounded-xl bg-primary/5"
              >
                Download the PDF
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
