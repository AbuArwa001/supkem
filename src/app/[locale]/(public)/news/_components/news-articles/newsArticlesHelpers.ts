import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";

export const extractFirstImage = (content: string) => {
    if (!content) return null;
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
};

export const cleanContent = (content: string) => {
    if (!content) return "";
    return content
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/[#*`_~>\[\]\(\)]/g, "")
        .replace(/\n+/g, " ")
        .trim();
};

export const calculateReadTime = (content: string) => {
    const text = cleanContent(content);
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
};

export const getCategory = (item: NewsItem) => {
    const combined = (item.title + " " + item.content).toLowerCase();

    if (combined.includes("hajj") || combined.includes("umrah") || combined.includes("ramadan") || combined.includes("eid")) {
        return { label: "Hajj & Faith", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" };
    }
    if (combined.includes("health") || combined.includes("relief") || combined.includes("food") || combined.includes("community") || combined.includes("welfare")) {
        return { label: "Community & Welfare", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
    }
    if (combined.includes("education") || combined.includes("school") || combined.includes("scholarship") || combined.includes("youth")) {
        return { label: "Education", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
    }
    if (combined.includes("statement") || combined.includes("press") || combined.includes("council") || combined.includes("official")) {
        return { label: "Press Release", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };
    }
    return { label: "General News", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" };
};

export const tSafe = (tFunc: any, key: string, fallback: string, values?: any) => {
    if (!tFunc) return fallback;
    try {
        const res = tFunc(key, values);
        if (!res || res.includes("NewsPage.") || res === key) return fallback;
        return res;
    } catch {
        return fallback;
    }
};
