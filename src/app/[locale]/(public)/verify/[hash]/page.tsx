import React, { Suspense } from "react";
import { VerificationContent } from "../_components/VerificationContent";

export async function generateMetadata({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;
  return {
    title: `Verify ${hash} | SUPKEM Document Verification`,
    description: `Official authenticity verification record for SUPKEM document ${hash}.`,
  };
}

export default async function VerifyHashPage({
  params,
}: {
  params: Promise<{ hash: string; locale: string }>;
}) {
  const { hash } = await params;

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-emerald-700/20 border-t-emerald-700 rounded-full animate-spin" />
      </div>
    }>
      <VerificationContent initialIdentifier={hash} />
    </Suspense>
  );
}
