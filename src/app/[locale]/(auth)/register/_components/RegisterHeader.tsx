"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function RegisterHeader() {
  const t = useTranslations("Auth.register");

  return (
    <div className="text-center space-y-10">
      <div className="flex flex-col items-center space-y-4">
        <Link href="/" className="group transition-transform hover:scale-110 duration-500">
          <div className="relative w-32 h-32 mb-2">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors animate-pulse" />
            <Image src="/logo.svg" alt="SUPKEM Logo" fill className="relative z-10 drop-shadow-2xl object-contain" />
          </div>
        </Link>
        <div className="space-y-1">
          <h2 className="text-3xl font-black font-outfit text-primary tracking-tighter uppercase">SUPKEM</h2>
          <div className="h-1 w-12 bg-secondary rounded-full mx-auto" />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-bold font-outfit text-primary tracking-tight">{t("joinCouncil")}</h1>
        <p className="text-foreground/60 text-lg font-medium max-w-lg mx-auto leading-relaxed">{t("joinDesc")}</p>
      </div>
    </div>
  );
}
