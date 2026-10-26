import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { API_BASE_URL } from "@/lib/api";
import { getNewsPaperById } from "@/app/[locale]/(public)/news/_services/newsService";
import { PaperHero } from "./_components/PaperHero";
import { PaperActionBar } from "./_components/PaperActionBar";
import { PaperViewer } from "./_components/PaperViewer";
import { PaperEmptyState } from "./_components/PaperEmptyState";
import { PaperSchema } from "./_components/PaperSchema";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const paper = await getNewsPaperById(id, locale);
  if (!paper || !paper.is_published) return {};

  const title = `${paper.title} | SUPKEM Publications`;
  const description = `Read official publication ${paper.title} issued by SUPKEM.`;
  const coverImage = paper.cover_image?.startsWith("http")
    ? paper.cover_image
    : `${API_BASE_URL}${paper.cover_image?.startsWith("/") ? "" : "/"}${paper.cover_image}`;

  return {
    title,
    description,
    openGraph: { title, description, images: coverImage ? [coverImage] : [] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function NewsPaperViewPage({ params }: PageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "NewsPage.paperView" });
  const paper = await getNewsPaperById(id, locale);

  if (!paper || !paper.is_published) notFound();

  const pdfUrl = paper.file ? (paper.file.startsWith("http") ? paper.file : `${API_BASE_URL}${paper.file.startsWith("/") ? "" : "/"}${paper.file}`) : null;
  if (!pdfUrl) {
    return <PaperEmptyState notAvailableText={t("notAvailable")} notAvailableDesc={t("notAvailableDesc")} backToNewsText={t("backToNews")} />;
  }

  const coverImage = paper.cover_image ? (paper.cover_image.startsWith("http") ? paper.cover_image : `${API_BASE_URL}${paper.cover_image.startsWith("/") ? "" : "/"}${paper.cover_image}`) : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <PaperSchema title={paper.title} publishedDate={paper.published_date} issueNumber={paper.issue_number} coverImage={coverImage} pdfUrl={pdfUrl} />
      <PaperHero title={paper.title} coverImage={coverImage} publishedDate={paper.published_date} issueNumber={paper.issue_number} locale={locale} backText={t("backToNews")} issueLabel={t("issue")} />
      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="flex flex-col gap-8">
          <PaperActionBar pdfUrl={pdfUrl} officialPubText={t("officialPub")} councilNameText={t("councilName")} downloadText={t("download")} />
          <PaperViewer pdfUrl={pdfUrl} title={paper.title} />
        </div>
      </main>
    </div>
  );
}
