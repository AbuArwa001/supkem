interface InfoBoxProps {
  label: string;
  value: string;
  mono?: boolean;
}

export function InfoBox({ label, value, mono = false }: InfoBoxProps) {
  return (
    <div
      className="p-4 rounded-2xl border"
      style={{
        backgroundColor: "rgba(248, 250, 252, 0.5)",
        borderColor: "rgba(241, 245, 249, 0.5)",
      }}
    >
      <p
        className="text-[10px] uppercase tracking-widest font-bold mb-1"
        style={{ color: "#94a3b8" }}
      >
        {label}
      </p>
      <p
        className={`${mono ? "font-mono" : "font-bold"} font-bold text-sm truncate`}
        style={{ color: "#1e293b" }}
      >
        {value}
      </p>
    </div>
  );
}
