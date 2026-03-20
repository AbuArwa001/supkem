import { useState, useEffect } from "react";

import { applicationService } from "@/app/(dashboard)/admin/applications/_services/applicationService";
import { Application } from "@/app/(dashboard)/admin/applications/_types";

export function useApplicationsLogic() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadApplications = async () => {
            setIsLoading(true);
            const data = await applicationService.fetchApplications();
            setApplications(data);
            setIsLoading(false);
        }
        loadApplications();
    }, []);

    const filteredApps = applications.filter((app) => {
        const matchesFilter = filter === "all" || app.status?.toLowerCase() === filter.toLowerCase();

        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            (app.organization_name?.toLowerCase() || "").includes(searchLower) ||
            (app.display_id?.toLowerCase() || "").includes(searchLower) ||
            app.id?.toString().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    return {
        applications,
        filteredApps,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        isLoading
    };
}
