import React from "react";

/**
 * Loading state component for the certificate detail page.
 */
export function CertificateLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 rounded-lgborder-4 border-primary/20 border-t-primary animate-spin" />
      <p className="text-primary/60 font-medium">
        Retrieving Certificate Registry Data...
      </p>
    </div>
  );
}
