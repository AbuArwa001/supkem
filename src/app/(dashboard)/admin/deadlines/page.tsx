"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useDeadlinesLogic } from "./_hooks/useDeadlinesLogic";
import { DeadlineHeader } from "./_components/DeadlineHeader";
import { DeadlineToolbar } from "./_components/DeadlineToolbar";
import { DeadlineList } from "./_components/DeadlineList";
import { EmptyDeadlines } from "./_components/EmptyDeadlines";

/**
 * Admin Deadlines Page
 * Refactored to follow strict readability constraints.
 */
export default function DeadlinesPage() {
  const {
    filteredDeadlines,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    handleResetFilters,
  } = useDeadlinesLogic();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={40} className="text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <DeadlineHeader />

      <DeadlineToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      {filteredDeadlines.length > 0 ? (
        <DeadlineList deadlines={filteredDeadlines} />
      ) : (
        <EmptyDeadlines onReset={handleResetFilters} />
      )}
    </div>
  );
}
