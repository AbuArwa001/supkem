/**
 * Injects the print-mode and canvas CSS variable overrides required by
 * CertificateCanvas. Extracted to keep the parent component under 100 lines.
 */
export function CertificatePrintStyles() {
  return (
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore — jsx attribute is valid for styled-jsx
    <style jsx global>{`
      @media print {
        @page {
          size: A4 landscape;
          margin: 0;
        }

        /* Hide all navigation, sidebars, headers, floating bars, and no-print elements */
        header,
        nav,
        aside,
        button,
        .no-print,
        .print\:hidden {
          display: none !important;
          visibility: hidden !important;
        }

        html,
        body {
          background: #ffffff !important;
          color: #000000 !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 297mm !important;
          height: 210mm !important;
          max-height: 210mm !important;
          overflow: hidden !important;
        }

        body * {
          visibility: hidden;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .certificate-canvas,
        .certificate-canvas * {
          visibility: visible !important;
        }

        .certificate-canvas {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          width: 297mm !important;
          height: 210mm !important;
          max-height: 210mm !important;
          box-sizing: border-box !important;
          margin: 0 !important;
          padding: 10mm 14mm !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          background-color: #ffffff !important;
          overflow: hidden !important;
          transform: none !important;
          page-break-after: avoid !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
      }
      .certificate-canvas {
        --primary-safe: #16543d;
        --secondary-safe: #e7b408;
        --slate-800-safe: #1e293b;
        --slate-500-safe: #64748b;
      }
      .certificate-canvas :global(.text-primary) {
        color: var(--primary-safe) !important;
      }
      .certificate-canvas :global(.text-secondary) {
        color: var(--secondary-safe) !important;
      }
      .certificate-canvas :global(.bg-primary\/5) {
        background-color: rgba(22, 84, 61, 0.05) !important;
      }
      .certificate-canvas :global(.bg-secondary\/10) {
        background-color: rgba(231, 180, 8, 0.1) !important;
      }
      .certificate-canvas :global(.border-primary\/10) {
        border-color: rgba(22, 84, 61, 0.1) !important;
      }
      .certificate-canvas :global(.border-primary\/5) {
        border-color: rgba(22, 84, 61, 0.05) !important;
      }
    `}</style>
  );
}
