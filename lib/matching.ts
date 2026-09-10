/**
 * PROTOTYPE SIMULATION — not production matching logic.
 *
 * Production matching (CONFIRMED rules):
 * - max 5km radius, never expand (REQ-004, REQ-010)
 * - nearest 10 verified+available+matching-skill providers (REQ-005, REQ-006)
 * - server timestamp determines winner (REQ-008, D-004)
 * - one final retry if all reject (REQ-009)
 *
 * This simulation: 3-second deterministic delay, then "accepts" with demo provider p1.
 * This is NOT the production algorithm — it's a demo placeholder.
 */

import { DEMO_PROVIDERS } from "../data/demo";

export interface MatchingCallbacks {
  onProgress?: (sent: number, total: number) => void;
  onAccepted?: (providerId: string) => void;
  onFailed?: () => void;
}

export async function simulateMatching(
  _serviceId: string,
  _location: { lat: number; lng: number },
  callbacks: MatchingCallbacks = {}
): Promise<{ providerId: string }> {
  const total = 10;

  // Simulate sending offers to 10 providers
  for (let i = 1; i <= total; i++) {
    await delay(300);
    callbacks.onProgress?.(i, total);
  }

  // 3-second wait before acceptance
  await delay(1000);

  // Accept demo provider p1 (PROTOTYPE SIMULATION — not real matching)
  callbacks.onAccepted?.("p1");
  return { providerId: "p1" };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * CONFIRMED business rule: max 10 providers, 5km radius, verified+available+skill match.
 * This function demonstrates the rule exists — it is NOT the production algorithm.
 */
export function getEligibleProviders(serviceId: string) {
  return DEMO_PROVIDERS.filter(
    (p) => p.skills.includes(serviceId) && p.availabilityStatus === "available"
  ).slice(0, 10);
}
