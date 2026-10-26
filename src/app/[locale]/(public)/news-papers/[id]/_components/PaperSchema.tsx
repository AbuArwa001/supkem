interface PaperSchemaProps {
  title: string;
  publishedDate: string;
  issueNumber?: string | null;
  coverImage?: string;
  pdfUrl?: string | null;
}

export function PaperSchema({
  title,
  publishedDate,
  issueNumber,
  coverImage,
  pdfUrl,
}: PaperSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: title,
    datePublished: publishedDate,
    issueNumber: issueNumber || undefined,
    image: coverImage,
    url: pdfUrl || undefined,
    publisher: {
      "@type": "Organization",
      name: "Supreme Council of Kenya Muslims (SUPKEM)",
      logo: "https://supkem.org/images/supkem-logo.png",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
