export function interpolateVariables(
  text: string,
  context: {
    userName?: string | null;
    organizationName?: string | null;
    serviceName?: string | null;
    serialNumber?: string | null;
    date?: string | null;
  }
) {
  if (!text) return "";
  return text
    .replace(/\{\{\s*user_name\s*\}\}/gi, context.userName || "Applicant")
    .replace(/\{\{\s*organization_name\s*\}\}/gi, context.organizationName || context.userName || "Organization")
    .replace(/\{\{\s*service_name\s*\}\}/gi, context.serviceName || "Service")
    .replace(/\{\{\s*serial_number\s*\}\}/gi, context.serialNumber || "PENDING")
    .replace(/\{\{\s*ref_number\s*\}\}/gi, context.serialNumber || "PENDING")
    .replace(/\{\{\s*date\s*\}\}/gi, context.date || new Date().toLocaleDateString());
}
