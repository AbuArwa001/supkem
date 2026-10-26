import { deleteServiceApi } from "../services";

export async function handleServiceDelete(id: string, onRefresh: () => Promise<void>) {
  if (!window.confirm("Are you sure you want to delete this service?")) return;

  try {
    await deleteServiceApi(id);
    await onRefresh();
  } catch (err: any) {
    console.error("Failed to delete service", err);
    const data = err.response?.data;
    if (data?.can_deactivate) {
      const shouldDeactivate = window.confirm(
        `${data.detail}\n\nWould you like to deactivate this service instead so it cannot receive new applications?`
      );
      if (shouldDeactivate) {
        try {
          await deleteServiceApi(id, { deactivate: true });
          await onRefresh();
        } catch (deactErr: any) {
          alert(deactErr.response?.data?.detail || "Failed to deactivate service.");
        }
      }
    } else {
      alert(data?.detail || "Failed to delete service.");
    }
  }
}
