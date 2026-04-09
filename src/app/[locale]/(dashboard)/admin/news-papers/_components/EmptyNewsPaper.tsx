import React from "react";
import { BookOpen } from "lucide-react";

export function EmptyNewsPaper() {
  return (
    <div className="col-span-full py-20 text-center space-y-4">
      <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto">
        <BookOpen className="text-primary/20" size={40} />
      </div>
      <p className="text-foreground/40 font-bold">No news papers found.</p>
    </div>
  );
}
