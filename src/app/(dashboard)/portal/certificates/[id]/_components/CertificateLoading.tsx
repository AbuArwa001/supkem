"use client";

export function CertificateLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <p className="text-primary/60 font-medium">
        Authenticating Certificate Details...
      </p>
    </div>
  );
}
