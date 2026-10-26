"use client";

import { BookOpen } from "lucide-react";

interface FeaturedNewsEmptyProps {
  noNewsText: string;
  noNewsDescText: string;
}

export function FeaturedNewsEmpty({ noNewsText, noNewsDescText }: FeaturedNewsEmptyProps) {
  return (
    <div className="col-span-1 lg:col-span-2 py-32 text-center space-y-6">
      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
        <BookOpen size={40} className="text-primary/40" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-outfit text-primary">{noNewsText}</h2>
        <p className="text-foreground/60">{noNewsDescText}</p>
      </div>
    </div>
  );
}

export function FeaturedNewsComingSoon({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 rounded-[20px] bg-secondary/10 border border-secondary/20 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[300px]">
      <BookOpen size={40} className="text-secondary" />
      <h4 className="text-xl font-bold font-outfit">{title}</h4>
      <p className="text-sm font-medium opacity-60">{desc}</p>
    </div>
  );
}
