import api from "@/lib/api";
import { toast } from "sonner";
import { Personnel } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/types";

export async function removePersonnelApi(orgId: string, userId: string, setPersonnel: React.Dispatch<React.SetStateAction<Personnel[]>>) {
  if (!window.confirm("Are you sure you want to remove this member?")) return false;
  try {
    await api.post(`/organizations/organizations/${orgId}/remove_personnel/`, { user_id: userId });
    setPersonnel((prev) => prev.filter((p) => p.user.id !== userId));
    toast.success("Member removed from organization.");
    return true;
  } catch (err: any) {
    toast.error(err.response?.data?.error || "Failed to remove member.");
    return false;
  }
}

export async function suspendPersonnelApi(orgId: string, userId: string, setPersonnel: React.Dispatch<React.SetStateAction<Personnel[]>>) {
  try {
    await api.post(`/organizations/organizations/${orgId}/suspend_personnel/`, { user_id: userId });
    const res = await api.get(`/organizations/organizations/${orgId}/personnel/`);
    setPersonnel(res.data);
    toast.success("Member status set to Suspended.");
    return true;
  } catch (err: any) {
    toast.error(err.response?.data?.error || "Failed to suspend member.");
    return false;
  }
}
