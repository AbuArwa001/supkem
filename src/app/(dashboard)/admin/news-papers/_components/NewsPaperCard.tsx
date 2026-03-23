import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Edit2, Trash2, Download } from "lucide-react";
import Image from "next/image";
import { NewsPaperItem } from "@/services/news-service";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

interface NewsPaperCardProps {
  item: NewsPaperItem;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function NewsPaperCard({ item, index, onEdit, onDelete }: NewsPaperCardProps) {
  const imageUrl = item.cover_image
    ? item.cover_image.startsWith("http")
      ? item.cover_image
      : `${API_BASE_URL}${item.cover_image.startsWith("/") ? "" : "/"}${item.cover_image}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-border rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col h-full"
    >
      <div className="aspect-[3/4] relative bg-primary/5 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <BookOpen className="text-primary/20" size={48} />
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
              item.is_published
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700",
            )}
          >
            {item.is_published ? "Published" : "Draft"}
          </span>
          {item.issue_number && (
             <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white">
                Issue {item.issue_number}
             </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-outfit text-primary line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">
            {new Date(item.published_date).toLocaleDateString()}
          </p>
        </div>

        <div className="pt-6 mt-auto border-t border-border/50 flex items-center justify-between">
            {item.file && (
               <a 
                 href={item.file.startsWith("http") ? item.file : `${API_BASE_URL}${item.file}`}
                 target="_blank"
                 rel="noreferrer"
                 className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 px-3 py-2 rounded-xl hover:bg-primary hover:text-white transition-all"
               >
                 <Download size={14} /> Download PDF
               </a>
            )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onEdit}
              className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
