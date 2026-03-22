import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { NewsItem } from "@/services/news-service";
import { NewsCard } from "./NewsCard";
import { EmptyNews } from "./EmptyNews";

interface NewsGridProps {
  news: NewsItem[];
  loading: boolean;
  onEdit: (item: NewsItem) => void;
  onDelete: (slug: string) => void;
}

/**
 * Grid component to display news items.
 */
export function NewsGrid({ news, loading, onEdit, onDelete }: NewsGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (news.length === 0) {
    return <EmptyNews />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, i) => (
        <NewsCard
          key={item.id}
          item={item}
          index={i}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.slug)}
        />
      ))}
    </div>
  );
}
