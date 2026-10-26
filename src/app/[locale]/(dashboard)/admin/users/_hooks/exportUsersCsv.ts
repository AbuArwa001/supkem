import { toast } from "sonner";
import { UserItem } from "./useUsersLogic";

export function exportUsersCsv(users: UserItem[]) {
  if (!users || users.length === 0) {
    toast.error("No user records available to export.");
    return;
  }

  const headers = [
    "User ID",
    "Full Name",
    "Email Address",
    "Phone Number",
    "System Role",
    "Operational Location",
    "Active Status",
    "Email Verified",
    "Date Registered",
  ];

  const rows = users.map((u) => [
    u.id,
    `"${(u.full_name || "").replace(/"/g, '""')}"`,
    u.email,
    u.phone_number || "N/A",
    u.role?.role_name || u.role_name || "Member",
    `"${(u.location || "").replace(/"/g, '""')}"`,
    u.is_active ? "Active" : "Disabled",
    u.is_email_verified ? "Verified" : "Unverified",
    u.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A",
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `supkem_team_directory_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast.success("Team directory exported successfully.");
}
