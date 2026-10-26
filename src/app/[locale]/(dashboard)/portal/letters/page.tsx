"use client";

import useSWR from "swr";
import { AlertCircle } from "lucide-react";
import api from "@/lib/api";
import { useTranslations } from "next-intl";
import { LetterCard } from "./_components/LetterCard";
import { LettersEmptyState, LettersSkeleton } from "./_components/LettersEmptyState";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function LettersPage() {
  const t = useTranslations("Dashboard.portal.lettersPage");
  const { data, error, isLoading } = useSWR("/applications/letters/", fetcher);
  const letters = Array.isArray(data) ? data : data?.results || [];

  const groupedLetters = letters.reduce((acc: any, letter: any) => {
    const serviceName = letter.application_detail?.service_name || t("otherLetters");
    if (!acc[serviceName]) acc[serviceName] = [];
    acc[serviceName].push(letter);
    return acc;
  }, {});

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
          {t("title")}
        </h2>
        <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">{t("subtitle")}</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">{t("loadFailed")}</span>
        </div>
      )}

      <div className="space-y-12">
        {isLoading ? (
          <LettersSkeleton />
        ) : letters.length === 0 ? (
          <LettersEmptyState />
        ) : (
          Object.entries(groupedLetters).map(([serviceName, serviceLetters]: [string, any]) => (
            <div key={serviceName} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <h3 className="text-lg font-black text-secondary uppercase tracking-[0.2em] px-4 whitespace-nowrap">
                  {serviceName}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceLetters.map((cert: any) => (
                  <LetterCard key={cert.id} cert={cert} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
