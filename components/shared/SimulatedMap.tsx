interface SimulatedMapProps {
  progress?: number;
  eta?: number;
  distance?: number;
}

export function SimulatedMap({ progress = 0, eta = 8, distance = 2.3 }: SimulatedMapProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
      <svg viewBox="0 0 320 192" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="192" fill="#f0ebe3" />

        <path d="M20 160 Q80 140 140 130 Q200 120 260 110 Q290 105 310 100" stroke="#e5d9c3" strokeWidth="20" fill="none" strokeLinecap="round" />
        <path d="M20 160 Q80 140 140 130 Q200 120 260 110 Q290 105 310 100" stroke="#d4c4a8" strokeWidth="3" fill="none" strokeDasharray="8 4" strokeLinecap="round" />

        <circle cx="30" cy="158" r="6" fill="#2563eb" stroke="white" strokeWidth="2" />
        <text x="30" y="148" textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="bold">YOU</text>

        <circle cx="290" cy="100" r="6" fill="#16a34a" stroke="white" strokeWidth="2" />
        <text x="290" y="90" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold">PROVIDER</text>

        <circle
          cx={30 + (260 * clampedProgress) / 100}
          cy={158 - (58 * clampedProgress) / 100}
          r="8"
          fill="#2563eb"
          stroke="white"
          strokeWidth="2"
          opacity="0.9"
        />

        <circle
          cx={30 + (260 * clampedProgress) / 100}
          cy={158 - (58 * clampedProgress) / 100}
          r="12"
          fill="#2563eb"
          opacity="0.2"
        >
          <animate attributeName="r" values="8;16;8" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border)] shadow-sm">
        <span className="text-xs font-semibold text-[var(--foreground)]">
          {eta} min · {distance} km
        </span>
      </div>

      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
        <span className="text-[10px] font-semibold text-[var(--primary)]">LIVE</span>
      </div>
    </div>
  );
}
