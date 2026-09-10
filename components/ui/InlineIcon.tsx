interface InlineIconProps {
  svgPath: string;
  size?: number;
  className?: string;
}

export function InlineIcon({ svgPath, size = 24, className = "" }: InlineIconProps) {
  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{
        __html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-full h-full">${svgPath}</svg>`,
      }}
    />
  );
}
