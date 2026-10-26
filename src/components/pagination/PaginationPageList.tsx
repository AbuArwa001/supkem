import React from "react";
import { cn } from "@/lib/utils";

interface PaginationPageListProps {
  pages: (number | string)[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationPageList({
  pages,
  currentPage,
  onPageChange,
}: PaginationPageListProps) {
  return (
    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
      {pages.map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 text-center text-xs font-bold text-slate-400"
            >
              ...
            </span>
          );
        }

        const isCurrent = currentPage === page;
        return (
          <button
            key={`page-${page}`}
            type="button"
            onClick={() => onPageChange(Number(page))}
            className={cn(
              "w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer",
              isCurrent
                ? "bg-primary text-white shadow-xs font-black"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
