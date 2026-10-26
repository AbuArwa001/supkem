import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { fetchOrgData, fetchDefaultUsers, updateOrgStatus } from "./services";
import { OrganizationDetail, Personnel } from "./types";
import { usePersonnelManagement } from "./usePersonnelManagement";

export function useOrganizationDetailLogic() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

    const [org, setOrg] = useState<OrganizationDetail | null>(null);
    const [personnel, setPersonnel] = useState<Personnel[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const personnelMgr = usePersonnelManagement(id, personnel, setPersonnel, actionLoading, setActionLoading);

    useEffect(() => {
        let isMounted = true;
        const initData = async () => {
            setLoading(true);
            try {
                const [data, users] = await Promise.all([fetchOrgData(id), fetchDefaultUsers()]);
                if (isMounted) {
                    setOrg(data.org);
                    setPersonnel(data.personnel);
                    personnelMgr.setDefaultUsers(users);
                }
            } catch (err) {
                console.error("Failed to fetch organization data", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        initData();
        return () => { isMounted = false; };
    }, [id]);

    const handleUpdateStatus = async (status: string) => {
        setActionLoading("status_update");
        try {
            await updateOrgStatus(id, status);
            if (org) setOrg({ ...org, accreditation_status: status });
        } catch (err) {
            console.error("Failed to update status", err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleOrganizationUpdated = (updatedOrg: OrganizationDetail) => {
        setOrg((prev) => (prev ? { ...prev, ...updatedOrg } : updatedOrg));
    };

    return {
        id,
        router,
        org,
        personnel,
        loading,
        isEditModalOpen,
        setIsEditModalOpen,
        actionLoading,
        handleUpdateStatus,
        handleOrganizationUpdated,
        ...personnelMgr
    };
}
