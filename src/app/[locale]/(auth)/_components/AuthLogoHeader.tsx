import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface AuthLogoHeaderProps {
  size?: "md" | "lg";
}

export function AuthLogoHeader({ size = "lg" }: AuthLogoHeaderProps) {
  const isLarge = size === "lg";

  return (
    <div className="flex flex-col items-center space-y-4 mb-14">
      <Link href="/" className="group transition-transform hover:scale-110 duration-500">
        <div className={`relative ${isLarge ? "w-32 h-32" : "w-24 h-24"} mb-2`}>
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors animate-pulse" />
          <Image src="/logo.svg" alt="SUPKEM Logo" fill className="relative z-10 drop-shadow-2xl object-contain" />
        </div>
      </Link>
      <div className="space-y-1 text-center">
        <h2 className={`${isLarge ? "text-3xl" : "text-2xl"} font-black font-outfit text-primary tracking-tighter uppercase`}>
          SUPKEM
        </h2>
        <div className="h-1 w-12 bg-secondary rounded-full mx-auto" />
      </div>
    </div>
  );
}
