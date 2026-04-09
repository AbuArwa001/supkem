"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface UserPaginationProps {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isLoading: boolean;
}

export const UserPagination = ({
  page,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isLoading,
}: UserPaginationProps) => {
  const t = useTranslations("Dashboard.admin.users.pagination");

  return (
    <div className="p-8 border-t border-slate-50 flex items-center justify-between">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        {t("page", { page })}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={!hasPrev || isLoading}
          className="rounded-xl font-black text-[10px] px-4 uppercase tracking-widest h-10"
        >
          {t("prev")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNext || isLoading}
          className="rounded-xl font-black text-[10px] px-4 uppercase tracking-widest h-10"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

