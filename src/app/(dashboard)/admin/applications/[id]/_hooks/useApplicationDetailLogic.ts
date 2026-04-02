import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { applicationService } from "@/app/(dashboard)/admin/applications/_services/applicationService";

export function useApplicationDetailLogic(id: string | string[]) {
    const router = useRouter();
    const [app, setApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                const data = await applicationService.fetchApplicationById(id as string);
                setApp(data);
            } catch (err) {
                console.error("Failed to fetch application", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchApp();
        }
    }, [id]);

    const handleAction = async (status: string) => {
        setSubmitting(true);
        try {
            await applicationService.updateApplicationStatus(id as string, status);
            router.push("/admin/applications");
        } catch (err) {
            console.error("Action failed", err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to permanently delete this application?")) return;
        setSubmitting(true);
        try {
            await applicationService.deleteApplication(id as string);
            router.push("/admin/applications");
        } catch (err) {
            console.error("Delete failed", err);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        app,
        loading,
        submitting,
        handleAction,
        handleDelete,
        router
    };
}
