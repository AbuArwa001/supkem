interface CertificateBackgroundProps {
  /** When true the decorations are not rendered (e.g. marriage certificate). */
  hidden: boolean;
}

/**
 * Renders the four absolutely-positioned decorative layers:
 * two blurred colour blobs and two nested border rings.
 */
export function CertificateBackground({ hidden }: CertificateBackgroundProps) {
  if (hidden) return null;

  return (
    <>
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
        style={{ backgroundColor: "rgba(22, 84, 61, 0.05)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"
        style={{ backgroundColor: "rgba(231, 180, 8, 0.1)" }}
      />
      <div
        className="absolute inset-4 border rounded-[14px] pointer-events-none"
        style={{ borderColor: "rgba(22, 84, 61, 0.1)" }}
      />
      <div
        className="absolute inset-6 border-4 border-double rounded-[20px] pointer-events-none"
        style={{ borderColor: "rgba(22, 84, 61, 0.05)" }}
      />
    </>
  );
}
