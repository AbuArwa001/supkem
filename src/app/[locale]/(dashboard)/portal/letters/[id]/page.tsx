"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { downloadElementAsPdf } from "@/lib/pdfDownloader";
import api from "@/lib/api";
import { LetterCanvas } from "@/app/[locale]/(dashboard)/admin/certificates/_components/LetterCanvas";
import { DocumentScaleWrapper } from "@/components/DocumentScaleWrapper";
import { DownloadProgressModal } from "@/components/DownloadProgressModal";
import { LetterDetailHeader } from "./_components/LetterDetailHeader";
import { LetterApplicationRef } from "./_components/LetterApplicationRef";
import { LetterLoadingState, LetterErrorState } from "./_components/LetterDetailStates";

export default function LetterDetail() {
  const params = useParams();
  const [letter, setLetter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        if (params.id) {
          const res = await api.get(`/applications/letters/${params.id}/`);
          setLetter(res.data);
        }
      } catch (err: any) {
        console.error("Failed to fetch letter", err);
        setError(err.response?.data?.detail || "Letter not found or you do not have permission.");
      } finally {
        setLoading(false);
      }
    };
    fetchLetter();
  }, [params.id]);

  const handleDownloadPDF = async () => {
    if (!letterRef.current) return;
    setIsDownloading(true);
    const startTime = Date.now();
    try {
      await downloadElementAsPdf(letterRef.current, `SUPKEM-Letter-${letter?.serial_number || "Official"}.pdf`, {
        orientation: "portrait",
      });
      const elapsed = Date.now() - startTime;
      if (elapsed < 1200) await new Promise((r) => setTimeout(r, 1200 - elapsed));
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) return <LetterLoadingState />;
  if (error || !letter) return <LetterErrorState error={error} />;

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto print:space-y-0 print:pb-0 print:max-w-none">
      <LetterDetailHeader
        serviceName={letter.application_detail?.service_name}
        isDownloading={isDownloading}
        onPrint={() => window.print()}
        onDownload={handleDownloadPDF}
      />

      <div className="w-full pb-8 print:pb-0">
        <DocumentScaleWrapper baseWidth={794} baseHeight={1123}>
          <LetterCanvas
            letter={letter}
            letterRef={letterRef}
            issueDate={new Date(letter.issued_at)}
            language={letter.language || "en"}
            customText={letter.language === "ar" ? letter.custom_text_ar : letter.custom_text_en}
            signatureBase64={letter.digital_signature}
          />
        </DocumentScaleWrapper>
      </div>

      {letter.application && <LetterApplicationRef applicationId={letter.application} />}

      <DownloadProgressModal
        isOpen={isDownloading}
        documentType="Letter"
        title="Generating Official SUPKEM Letter"
        serialNumber={letter.serial_number}
      />
    </div>
  );
}
