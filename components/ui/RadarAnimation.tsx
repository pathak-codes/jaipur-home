interface RadarAnimationProps {
  className?: string;
}

export function RadarAnimation({ className = "" }: RadarAnimationProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: 128, height: 128 }}>
      <span
        className="absolute rounded-full border-4 border-[var(--primary)] opacity-20"
        style={{ width: 32, height: 32 }}
      />
      <span
        className="absolute rounded-full border-4 border-[var(--primary)] opacity-40 animate-ping"
        style={{ width: 64, height: 64, animationDuration: "1.5s" }}
      />
      <span
        className="absolute rounded-full border-4 border-[var(--primary)] opacity-30 animate-ping"
        style={{ width: 96, height: 96, animationDuration: "2s", animationDelay: "0.3s" }}
      />
      <span
        className="absolute rounded-full border-4 border-[var(--primary)] opacity-20 animate-ping"
        style={{ width: 128, height: 128, animationDuration: "2.5s", animationDelay: "0.6s" }}
      />
      <div className="w-4 h-4 rounded-full bg-[var(--primary)] z-10" />
    </div>
  );
}
