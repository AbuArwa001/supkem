"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import { VerificationData } from "./types";
import { VerificationHeader } from "./VerificationHeader";
import { VerificationResultBanner } from "./VerificationResultBanner";
import { VerificationDetailsGrid } from "./VerificationDetailsGrid";
import { VerificationNotFound, VerificationFaq } from "./VerificationStates";

export function VerificationContent({ initialIdentifier }: { initialIdentifier?: string }) {
  const searchParams = useSearchParams();
  const queryIdentifier = searchParams.get("hash") || searchParams.get("serial") || initialIdentifier || "";

  const [identifier, setIdentifier] = useState(queryIdentifier);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchVerification = async (val: string) => {
    const clean = val.trim();
    if (!clean) return;
    setLoading(true);
    setNotFound(false);
    setErrorMessage("");
    setResult(null);

    try {
      const baseUrl = API_BASE_URL ? `${API_BASE_URL}/api/v1` : "/api/v1";
      const response = await axios.get<VerificationData>(`${baseUrl}/verify/${encodeURIComponent(clean)}/`);
      setResult(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setNotFound(true);
        setErrorMessage(err.response.data?.detail || "No official document found matching this identifier.");
      } else {
        setErrorMessage(err.response?.data?.detail || "Verification network request failed. Please check connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryIdentifier) {
      setIdentifier(queryIdentifier);
      fetchVerification(queryIdentifier);
    }
  }, [queryIdentifier]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) fetchVerification(identifier);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <VerificationHeader
          identifier={identifier}
          onIdentifierChange={setIdentifier}
          onSearch={handleSearch}
          loading={loading}
        />

        {result && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <VerificationResultBanner result={result} />
            <VerificationDetailsGrid result={result} />
          </div>
        )}

        {notFound && (
          <VerificationNotFound
            identifier={identifier}
            onReset={() => { setIdentifier(""); setNotFound(false); }}
          />
        )}

        {errorMessage && !notFound && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {!result && !notFound && <VerificationFaq />}
      </div>
    </div>
  );
}
