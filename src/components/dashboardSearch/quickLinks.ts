import { SearchResultItem } from "./dashboardSearchTypes";

export function getQuickLinks(isPortal: boolean): SearchResultItem[] {
  if (isPortal) {
    return [
      { id: "nav-portal-dash", title: "Portal Dashboard", subtitle: "My overview & quick actions", type: "navigation", url: "/portal" },
      { id: "nav-portal-apps", title: "My Applications", subtitle: "Track submitted & active applications", type: "navigation", url: "/portal/applications" },
      { id: "nav-portal-new", title: "Apply for a Service", subtitle: "Start new certificate, visa or letter request", type: "navigation", url: "/portal/applications/new" },
      { id: "nav-portal-certs", title: "My Certificates", subtitle: "View & download official certificates", type: "navigation", url: "/portal/certificates" },
      { id: "nav-portal-letters", title: "My Official Letters", subtitle: "View recommendation & support letters", type: "navigation", url: "/portal/letters" },
      { id: "nav-portal-inst", title: "Mosques & Institutions", subtitle: "Directory of registered bodies", type: "navigation", url: "/portal/institutions" },
    ];
  }
  return [
    { id: "nav-admin-dash", title: "Executive Overview", subtitle: "Command center & pipeline metrics", type: "navigation", url: "/admin" },
    { id: "nav-admin-apps", title: "Applications Registry", subtitle: "Review, approve & issue documents", type: "navigation", url: "/admin/applications" },
    { id: "nav-admin-certs", title: "Certificates Registry", subtitle: "Active, indefinite & expiring certificates", type: "navigation", url: "/admin/certificates" },
    { id: "nav-admin-letters", title: "Official Letters", subtitle: "Issued letters & recommendation registry", type: "navigation", url: "/admin/letters" },
    { id: "nav-admin-finance", title: "Finance & Payments", subtitle: "M-Pesa transaction ledger & revenue telemetry", type: "navigation", url: "/admin/finance" },
    { id: "nav-admin-users", title: "User Directory", subtitle: "Staff, normal users & RBAC control", type: "navigation", url: "/admin/users" },
    { id: "nav-admin-orgs", title: "Organizations & Mosques", subtitle: "Institutional database & approvals", type: "navigation", url: "/admin/organizations" },
    { id: "nav-admin-services", title: "Services Catalog", subtitle: "Configure fees, durations & requirements", type: "navigation", url: "/admin/services" },
  ];
}
