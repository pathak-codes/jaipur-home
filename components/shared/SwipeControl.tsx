"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRightIcon } from "../ui/icons";

interface SwipeControlProps {
  onComplete: () => void;
  label?: string;
  disabled?: boolean;
}

export function SwipeControl({ onComplete, label = "Swipe to Complete", disabled = false }: SwipeControlProps) {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const [maxOffset, setMaxOffset] = useState(240);

  function updateMaxOffset() {
    if (trackRef.current) {
      setMaxOffset(Math.max(120, trackRef.current.offsetWidth - 56));
    }
  }

  useEffect(() => {
    updateMaxOffset();
    window.addEventListener("resize", updateMaxOffset);
    return () => window.removeEventListener("resize", updateMaxOffset);
  }, []);

  function handlePointerDown(e: React.PointerEvent) {
    if (disabled) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging || disabled) return;
    const delta = e.clientX - startXRef.current;
    setOffset(Math.max(0, Math.min(delta, maxOffset)));
  }

  function handlePointerUp() {
    setIsDragging(false);
    if (offset >= maxOffset * 0.9) {
      setOffset(maxOffset);
      setTimeout(onComplete, 200);
    } else {
      setOffset(0);
    }
  }

  return (
    <div
      ref={trackRef}
      className={`relative w-full h-14 rounded-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden ${disabled ? "opacity-50" : ""}`}
    >
      <div
        className="absolute inset-y-0 left-0 bg-[var(--success)]/20 rounded-full transition-all"
        style={{ width: `${(offset / maxOffset) * 100}%` }}
      />
      <div
        className="absolute top-1 bottom-1 left-1 w-12 rounded-full bg-[var(--success)] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md transition-all"
        style={{ transform: `translateX(${offset}px)`, touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <ArrowRightIcon className="w-5 h-5 text-white" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-[var(--muted)]">{label}</span>
      </div>
    </div>
  );
}
