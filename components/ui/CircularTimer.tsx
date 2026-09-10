interface CircularTimerProps {
  seconds: number;
  maxSeconds: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularTimer({
  seconds,
  maxSeconds,
  size = 96,
  strokeWidth = 8,
  className = "",
}: CircularTimerProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = seconds / maxSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  const color =
    seconds > 10
      ? "var(--primary)"
      : seconds > 5
      ? "var(--warning)"
      : "var(--danger)";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.3s",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-3xl font-bold"
          style={{ color }}
        >
          {seconds}
        </span>
      </div>
    </div>
  );
}
