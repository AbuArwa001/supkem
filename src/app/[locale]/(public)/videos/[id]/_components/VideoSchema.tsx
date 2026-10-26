interface VideoSchemaProps {
    title: string;
    description: string;
    uploadDate: string;
    thumbnailUrl?: string;
    contentUrl?: string;
}

export function VideoSchema({
    title,
    description,
    uploadDate,
    thumbnailUrl,
    contentUrl,
}: VideoSchemaProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: title,
        description: description,
        uploadDate: uploadDate,
        thumbnailUrl: thumbnailUrl || "https://supkem.org/images/supkem-logo.png",
        contentUrl: contentUrl,
        publisher: {
            "@type": "Organization",
            name: "SUPKEM - Supreme Council of Kenya Muslims",
            logo: {
                "@type": "ImageObject",
                url: "https://supkem.org/images/supkem-logo.png",
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
