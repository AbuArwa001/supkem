import React from "react";
import { Loader2 } from "lucide-react";
import { NewsPaperItem } from "@/services/news-service";
import { NewsPaperCard } from "./NewsPaperCard";
import { EmptyNewsPaper } from "./EmptyNewsPaper";

interface NewsPaperGridProps {
  newsPapers: NewsPaperItem[];
  loading: boolean;
  onEdit: (item: NewsPaperItem) => void;
  onDelete: (id: string) => void;
}

export function NewsPaperGrid({ newsPapers, loading, onEdit, onDelete }: NewsPaperGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (newsPapers.length === 0) {
    return <EmptyNewsPaper />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsPapers.map((item, i) => (
        <NewsPaperCard
          key={item.id}
          item={item}
          index={i}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
}
