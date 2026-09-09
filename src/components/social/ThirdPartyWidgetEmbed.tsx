"use client";

import React, { useEffect, useRef, useState } from "react";
import { SocialWallConfig } from "./types";
import { AlertCircle, RefreshCw, ExternalLink } from "lucide-react";

interface ThirdPartyWidgetEmbedProps {
  config: SocialWallConfig;
  className?: string;
}

export function ThirdPartyWidgetEmbed({ config, className = "" }: ThirdPartyWidgetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { provider = "tagembed", feedId, iframeUrl, scriptUrl } = config;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // If using iframe directly (TagEmbed, Taggbox, Walls.io, or explicit iframe)
    if (
      iframeUrl ||
      provider === "tagembed" ||
      provider === "taggbox" ||
      provider === "wallsio" ||
      provider === "iframe"
    ) {
      setIsLoading(false);
      return;
    }

    if (!feedId && !scriptUrl) {
      setError("No widget Feed ID or embed URL configured.");
      setIsLoading(false);
      return;
    }

    let scriptElement: HTMLScriptElement | null = null;

    try {
      if (provider === "curator") {
        const id = feedId || "FEED_ID";
        scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.async = true;
        scriptElement.src = `https://cdn.curator.io/published/${id}.js`;
        scriptElement.onload = () => setIsLoading(false);
        scriptElement.onerror = () => {
          setError(`Unable to load Curator feed (${id}). Please verify the feed ID.`);
          setIsLoading(false);
        };
        document.body.appendChild(scriptElement);
      } else if (provider === "juicer") {
        const id = feedId || "FEED_ID";
        scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.async = true;
        scriptElement.src = "https://assets.juicer.io/embed.js";
        scriptElement.onload = () => setIsLoading(false);
        scriptElement.onerror = () => {
          setError(`Unable to load Juicer feed (${id}).`);
          setIsLoading(false);
        };
        document.body.appendChild(scriptElement);
      } else if (provider === "elfsight") {
        scriptElement = document.createElement("script");
        scriptElement.src = "https://static.elfsight.com/platform/platform.js";
        scriptElement.async = true;
        scriptElement.onload = () => setIsLoading(false);
        scriptElement.onerror = () => {
          setError("Unable to load Elfsight widget script.");
          setIsLoading(false);
        };
        document.body.appendChild(scriptElement);
      } else if (scriptUrl) {
        scriptElement = document.createElement("script");
        scriptElement.src = scriptUrl;
        scriptElement.async = true;
        scriptElement.onload = () => setIsLoading(false);
        scriptElement.onerror = () => {
          setError("Unable to load custom widget script.");
          setIsLoading(false);
        };
        document.body.appendChild(scriptElement);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to initialize aggregator widget");
      setIsLoading(false);
    }

    return () => {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [provider, feedId, iframeUrl, scriptUrl]);

  // Render TagEmbed / Taggbox / Walls.io or direct responsive iframe
  if (
    iframeUrl ||
    provider === "tagembed" ||
    provider === "taggbox" ||
    provider === "wallsio" ||
    provider === "iframe"
  ) {
    let src = iframeUrl;
    if (!src) {
      if (feedId?.startsWith("http://") || feedId?.startsWith("https://")) {
        src = feedId;
      } else if (provider === "tagembed") {
        src = `https://widget.tagembed.com/${feedId}`;
      } else if (provider === "taggbox") {
        src = `https://widget.taggbox.com/${feedId}`;
      } else if (provider === "wallsio") {
        src = `https://my.walls.io/${feedId}?show_header=0`;
      } else {
        src = `https://widget.tagembed.com/${feedId}`;
      }
    }

    // Tagembed widgets require their official script to authenticate with data-website="1"
    const tagembedSrcDoc =
      provider === "tagembed" && feedId && !iframeUrl
        ? `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; min-height: 100%; overflow: auto; font-family: sans-serif; }
  </style>
</head>
<body>
  <div class="tagembed-widget" style="width:100%;height:100%;min-height:750px;overflow:auto;" data-widget-id="${feedId}" data-website="1"></div>
  <script src="https://widget.tagembed.com/embed.min.js" type="text/javascript" async></script>
</body>
</html>`
        : undefined;

    return (
      <div className={`w-full rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
            <p className="text-sm font-bold text-slate-600">Loading Live Social Media Aggregator...</p>
          </div>
        )}
        <iframe
          src={tagembedSrcDoc ? undefined : src}
          srcDoc={tagembedSrcDoc}
          className="w-full min-h-[750px] lg:min-h-[850px] border-0"
          title="SUPKEM Live Social Media Feed"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div className={`w-full min-h-[500px] rounded-3xl border border-slate-200/80 bg-white/70 backdrop-blur-xl p-8 shadow-xl ${className}`}>
      {error && (
        <div className="flex flex-col items-center justify-center p-12 text-center text-slate-600 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-800">Aggregator Widget Notice</h4>
            <p className="text-sm text-slate-500 max-w-md mt-1">{error}</p>
          </div>
          <p className="text-xs text-slate-400 bg-slate-100 px-4 py-2 rounded-xl">
            Provider: <code className="font-semibold text-slate-700">{provider}</code> | ID:{" "}
            <code>{feedId || "None"}</code>
          </p>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Loading live aggregator feed...</p>
        </div>
      )}

      <div ref={containerRef} className="w-full">
        {provider === "curator" && feedId && (
          <div id={`curator-feed-${feedId}`}>
            <a href="https://curator.io" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-slate-600">
              Powered by Curator.io
            </a>
          </div>
        )}

        {provider === "juicer" && feedId && (
          <ul className="juicer-feed" data-feed-id={feedId}>
            <h1 className="sr-only">SUPKEM Social Media Feed</h1>
          </ul>
        )}

        {provider === "elfsight" && feedId && (
          <div className={`elfsight-app-${feedId}`} data-elfsight-app-lazy />
        )}
      </div>
    </div>
  );
}
