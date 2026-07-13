import { seed } from '../data/seed';
import type { Bootstrap } from '../types/models';

/**
 * Mock API client. Every function is async and Promise-wrapped with a small
 * simulated latency, mirroring how a real fetch layer would behave. Swap the
 * bodies for real network calls without changing any call sites.
 */

const LATENCY = 140;
const ANNOUNCEMENT_KEY = 'utpp:announcementDismissed';

function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Deep clone so callers can safely own their copy of the seed data. */
function clone<T>(value: T): T {
  return structuredClone(value);
}

export function fetchBootstrap(): Promise<Bootstrap> {
  return delay(clone(seed));
}

export function isAnnouncementDismissed(): boolean {
  try {
    return sessionStorage.getItem(ANNOUNCEMENT_KEY) === '1';
  } catch {
    return false;
  }
}

export function dismissAnnouncement(): Promise<void> {
  try {
    sessionStorage.setItem(ANNOUNCEMENT_KEY, '1');
  } catch {
    /* storage unavailable — dismissal simply won't persist */
  }
  return delay(undefined, 0);
}

export interface PlaceOrderResult {
  orderNo: string;
}

/**
 * Places an order for the selected option. Returns a generated order number.
 * Kept in-memory only (no domain persistence) per the build's fidelity scope.
 */
export function placeOrder(optionId: string): Promise<PlaceOrderResult> {
  const base = seed.permits[0]?.permitNo ?? '26B0A00000';
  const suffix = optionId.slice(0, 2).toUpperCase();
  return delay({ orderNo: `${base}-${suffix.length === 2 ? '02' : '01'}` });
}
