/**
 * PROTOTYPE SIMULATION — simulated provider movement.
 * Production: real GPS coordinates from provider device (CONFIRMED REQ-015, REQ-016).
 * This simulation uses CSS transitions and time-based updates.
 */

export interface TrackingCallbacks {
  onUpdate?: (progress: number, etaMinutes: number) => void;
  onArrived?: () => void;
}

export async function simulateTracking(callbacks: TrackingCallbacks = {}): Promise<void> {
  let progress = 0;
  const steps = 20; // 20 updates over ~10 seconds

  for (let i = 1; i <= steps; i++) {
    await delay(500);
    progress = Math.round((i / steps) * 100);
    const etaMinutes = Math.round(((steps - i) / steps) * 8);
    callbacks.onUpdate?.(progress, etaMinutes);

    if (i === steps) {
      callbacks.onArrived?.();
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
