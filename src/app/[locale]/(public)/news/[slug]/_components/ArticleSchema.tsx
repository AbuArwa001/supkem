interface ArticleSchemaProps {
    title: string;
    description: string;
    datePublished: string;
    image: string;
    url?: string;
}

export function ArticleSchema({
    title,
    description,
    datePublished,
    image,
    url,
}: ArticleSchemaProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: title,
        description: description,
        datePublished: datePublished,
        image: [image],
        url: url,
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
