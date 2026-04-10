import React from "react";
import { notFound } from "next/navigation";
import { ChevronLeft, Download, Calendar, BookOpen } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { API_BASE_URL } from "@/lib/api";
import { getNewsPaperById } from "@/app/[locale]/(public)/news/_services/newsService";

export default async function NewsPaperViewPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "NewsPage.paperView" });
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
          {t("notAvailable")}
        </h1>
        <p className="text-foreground/60">
          {t("notAvailableDesc")}
        </p>
        <Link
          href="/news"
          className="text-primary hover:underline font-bold mt-4"
        >
          &larr; {t("backToNews")}
        </Link>
      </div>
    );
  }

  const coverImage = paper.cover_image
    ? paper.cover_image.startsWith("http")
      ? paper.cover_image
      : `${API_BASE_URL}${paper.cover_image.startsWith("/") ? "" : "/"}${paper.cover_image}`
    : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <header className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={coverImage}
            alt={paper.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24 w-full relative z-10">
          <div className="max-w-4xl space-y-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-black/20 px-4 py-2 rounded-full backdrop-blur-md"
            >
              <ChevronLeft size={14} /> {t("backToNews")}
            </Link>

            <h1 className="text-4xl lg:text-6xl font-black font-outfit text-white leading-tight tracking-tight">
              {paper.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/60 uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-amber-400" />
                {new Date(paper.published_date).toLocaleDateString(locale === "ar" ? "ar-KE" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {paper.issue_number && (
                <span className="text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  {t("issue")} {paper.issue_number}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="flex flex-col gap-8">
          {/* Actions Bar */}
          <div className="bg-white rounded-[16px] p-6 shadow-2xl shadow-black/5 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <BookOpen size={24} className="text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary">{t("officialPub")}</p>
                <p className="text-sm text-foreground/60">
                  {t("councilName")}
                </p>
              </div>
            </div>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 w-full md:w-auto"
            >
              <Download size={20} />
              {t("download")}
            </a>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white border border-border/50 rounded-[20px] p-2 md:p-6 shadow-2xl shadow-black/5 h-[80vh] min-h-[600px] flex overflow-hidden">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
              className="w-full h-full rounded-[16px]"
              title={paper.title}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
