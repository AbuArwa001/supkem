export interface PermissionItemMeta {
  label: string;
  action: "view" | "create" | "edit" | "delete" | "special";
  summary?: string;
}

export const CORE_PERMISSION_METADATA: Record<string, PermissionItemMeta> = {
  view_payment: { label: "View Payments & Transactions", action: "view", summary: "Inspect financial transaction logs, invoices, and payment receipts" },
  change_payment: { label: "Process & Update Payments", action: "edit", summary: "Update payment statuses, mark manual payments, and reconcile records" },
  add_payment: { label: "Record Manual Payment", action: "create", summary: "Create direct or offline payment entries on behalf of applicants" },
  delete_payment: { label: "Delete Payment Record", action: "delete", summary: "Remove erroneous or canceled payment records" },
  reconcile_payment: { label: "Reconcile & Verify M-Pesa", action: "special", summary: "Re-query Safaricom STK gateway to verify status of pending payments" },
  view_financial_analytics: { label: "View Financial Analytics", action: "view", summary: "Access revenue breakdowns, collection totals, and financial trend charts" },
  export_payment_reports: { label: "Export Payment Ledgers", action: "special", summary: "Download financial reports and payment audit CSVs" },

  view_application: { label: "View Applications", action: "view", summary: "Read citizen and organizational submitted applications" },
  add_application: { label: "Create Applications", action: "create", summary: "Draft and submit applications on behalf of citizens or institutions" },
  change_application: { label: "Review & Process Applications", action: "edit", summary: "Change application status (Approve, Reject, Under Review)" },
  delete_application: { label: "Delete Applications", action: "delete", summary: "Delete application submissions" },

  view_certification: { label: "View Certificates", action: "view", summary: "Inspect issued certificates and serialization records" },
  add_certification: { label: "Issue New Certificate", action: "create", summary: "Generate and sign official certificates with QR codes" },
  change_certification: { label: "Update Certificate", action: "edit", summary: "Modify certificate metadata or renewal parameters" },
  delete_certification: { label: "Revoke / Delete Certificate", action: "delete", summary: "Revoke or permanently delete issued certificates" },
  view_letter: { label: "View Official Letters", action: "view", summary: "Read generated recommendation and introduction letters" },
  add_letter: { label: "Draft Official Letter", action: "create", summary: "Create recommendation or introductory letters" },
  change_letter: { label: "Edit Official Letter", action: "edit", summary: "Update letter body, signatories, or dispatch status" },
  delete_letter: { label: "Delete Official Letter", action: "delete", summary: "Remove letters from the system archive" },

  view_service: { label: "View Services Catalog", action: "view", summary: "Browse service directories, tariffs, and requirements" },
  add_service: { label: "Create Service", action: "create", summary: "Define new institutional services and application workflows" },
  change_service: { label: "Edit Service & Fees", action: "edit", summary: "Update service pricing, requirements, and deadlines" },
  delete_service: { label: "Delete Service", action: "delete", summary: "Remove obsolete services from the catalog" },
  view_servicecategory: { label: "View Service Categories", action: "view", summary: "Browse service groupings (Religious, Educational, Legal)" },
  add_servicecategory: { label: "Create Service Category", action: "create", summary: "Create new categories to classify services" },
  change_servicecategory: { label: "Edit Service Category", action: "edit", summary: "Rename or reorder service categories" },
  delete_servicecategory: { label: "Delete Service Category", action: "delete", summary: "Delete service categories" },
};
