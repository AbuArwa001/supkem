import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { domToPng } from "modern-screenshot";
import jsPDF from "jspdf";
import { Certificate, CertificateService } from "@/services/certificate-service";

export function useCertificateLogic() {
    const params = useParams();
    const router = useRouter();
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                if (params?.id) {
                    const data = await CertificateService.getLetter(params.id as string);
                    setCertificate(data);
                }
            } catch (err: any) {
                console.error("Failed to fetch letter", err);
                setError(
                    err.response?.data?.detail ||
                    "Letter not found or you do not have permission.",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [params?.id]);

    const handleDownloadPDF = async () => {
        if (!certificateRef.current || !certificate) return;

        setIsDownloading(true);
        try {
            const dataUrl = await domToPng(certificateRef.current, {
                scale: 2,
            });

            const img = new (window as any).Image();
            img.src = dataUrl;
            await new Promise((resolve) => (img.onload = resolve));

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [img.width / 2, img.height / 2],
            });

            pdf.addImage(
                dataUrl,
                "PNG",
                0,
                0,
                img.width / 2,
                img.height / 2,
                undefined,
                "FAST",
            );
            pdf.save(
                `SUPKEM-Certificate-${certificate?.serial_number || "Digital"}.pdf`,
            );
        } catch (err) {
            console.error("Failed to generate PDF", err);
        } finally {
            setIsDownloading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleBack = () => {
        router.back();
    };

    const handleReturnToRegistry = () => {
        router.push("/admin/certificates");
    };

    const issueDate = certificate ? new Date(certificate.issued_at) : null;
    const expiryDate = certificate?.expires_at
        ? new Date(certificate.expires_at)
        : null;
    const isValid = expiryDate ? expiryDate > new Date() : true;

    return {
        certificate,
        loading,
        error,
        isDownloading,
        certificateRef,
        issueDate,
        expiryDate,
        isValid,
        handleDownloadPDF,
        handlePrint,
        handleBack,
        handleReturnToRegistry,
    };
}
