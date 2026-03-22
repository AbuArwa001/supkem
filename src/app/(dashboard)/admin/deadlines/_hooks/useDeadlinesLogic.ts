import { useState, useEffect, useMemo } from "react";
import { DeadlineService, Deadline } from "@/services/deadline-service";

export function useDeadlinesLogic() {
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchDeadlines = async () => {
            try {
                const data = await DeadlineService.getStats();
                setDeadlines(data.upcoming_deadlines || []);
            } catch (err) {
                console.error("Failed to fetch deadlines", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeadlines();
    }, []);

    const filteredDeadlines = useMemo(() => {
        return deadlines.filter((d) => {
            const matchesFilter = filter === "all" || d.type === filter;
            const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [deadlines, filter, searchQuery]);

    const handleResetFilters = () => {
        setFilter("all");
        setSearchQuery("");
    };

    return {
        deadlines,
        filteredDeadlines,
        loading,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        handleResetFilters,
    };
}
