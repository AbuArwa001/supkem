"use client";

import NotFoundView from "@/components/NotFoundView";

export default function NotFound() {
  return (
    <html lang="en" className="dark">
      <head>
        <title>404 - Page Not Found | SUPKEM</title>
        <meta
          name="description"
          content="The requested page could not be found on the SUPKEM Digital Management Platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[#06140E] text-slate-100 antialiased font-sans m-0 p-0">
        <NotFoundView />
      </body>
    </html>
  );
}
