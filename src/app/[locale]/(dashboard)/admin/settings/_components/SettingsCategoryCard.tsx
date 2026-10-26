import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { PermissionModule } from "@/lib/permissions";

export interface SettingsCategoryItem {
  title: string;
  description: string;
  icon: any;
  color: string;
  bg: string;
  link: string;
  module: PermissionModule;
}

export function SettingsCategoryCard({ category }: { category: SettingsCategoryItem }) {
  const content = (
    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[32px] overflow-hidden hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 group cursor-pointer border border-slate-100 hover:border-slate-300 h-full">
      <CardHeader className="p-8 md:p-10 pb-0 flex flex-row items-start justify-between">
        <div className={`${category.bg} p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-white`}>
          <category.icon className={`h-8 w-8 ${category.color}`} />
        </div>
        <ChevronRight className="h-6 w-6 text-slate-200 group-hover:translate-x-2 transition-transform duration-500 group-hover:text-slate-400" />
      </CardHeader>
      <CardContent className="p-8 md:p-10">
        <CardTitle className="text-2xl font-black font-outfit text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
          {category.title}
        </CardTitle>
        <CardDescription className="text-slate-500 font-medium text-base leading-relaxed">
          {category.description}
        </CardDescription>
      </CardContent>
    </Card>
  );

  return category.link ? <Link href={category.link}>{content}</Link> : content;
}
