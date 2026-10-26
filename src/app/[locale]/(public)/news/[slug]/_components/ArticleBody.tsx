import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { SocialShareButtons } from "@/components/SocialShareButtons";

interface ArticleBodyProps {
    title: string;
    content: string;
}

export function ArticleBody({ title, content }: ArticleBodyProps) {
    return (
        <div className="bg-slate-900 rounded-[28px] p-8 lg:p-16 shadow-2xl border border-slate-800 space-y-8">
            <div className="pb-6 border-b border-slate-800">
                <SocialShareButtons title={title} />
            </div>

            <article className="
                prose prose-invert prose-lg max-w-none
                prose-headings:font-outfit prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:leading-tight
                prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-4 prose-h3:text-2xl
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:font-normal
                prose-strong:text-emerald-400 prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-500/10 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-slate-200 prose-blockquote:not-italic prose-blockquote:font-medium
                prose-a:text-emerald-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-ul:text-slate-300 prose-li:text-slate-300 prose-li:font-medium prose-li:leading-relaxed
                prose-ol:text-slate-300
                prose-img:rounded-3xl prose-img:shadow-xl prose-img:w-full
                prose-code:bg-slate-800 prose-code:text-emerald-300 prose-code:rounded-lg prose-code:px-2 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                prose-hr:border-slate-800 prose-hr:my-8
            ">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        img: ({ node, ...props }) => (
                            <span className="flex justify-center my-8">
                                <img {...props} className="max-w-full h-auto rounded-3xl shadow-xl border border-slate-800" alt={props.alt || "Article Image"} />
                            </span>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>

            <div className="pt-8 border-t border-slate-800">
                <SocialShareButtons title={title} />
            </div>
        </div>
    );
}
