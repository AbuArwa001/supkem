import React from "react";
import { Link } from "@/i18n/routing";

interface PaperEmptyStateProps {
  notAvailableText: string;
  notAvailableDesc: string;
  backToNewsText: string;
}

export function PaperEmptyState({
  notAvailableText,
  notAvailableDesc,
  backToNewsText,
}: PaperEmptyStateProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-black font-outfit text-primary">
        {notAvailableText}
      </h1>
      <p className="text-foreground/60">{notAvailableDesc}</p>
      <Link href="/news" className="text-primary hover:underline font-bold mt-4">
        &larr; {backToNewsText}
      </Link>
    </div>
  );
}
