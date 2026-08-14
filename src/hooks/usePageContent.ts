import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

// ─── Module-level subscription cache ────────────────────────────────────────
//
// Instead of each component creating its own Firestore listener for the same
// document, we maintain a single shared listener per (pageId, sectionId) pair.
// All components using usePageContent for the same doc share one snapshot stream.
// This prevents the race condition where duplicate listeners would trigger
// extra re-renders and cause content to flicker back to defaults.

type Listener = (data: Record<string, unknown> | null) => void;

interface CacheEntry {
  data: Record<string, unknown> | null; // null = loading, {} = not found
  loaded: boolean;
  listeners: Set<Listener>;
  unsubscribe: () => void;
}

const subscriptionCache = new Map<string, CacheEntry>();

function getCacheKey(pageId: string, sectionId: string): string {
  return `${pageId}::${sectionId}`;
}

function subscribe(
  pageId: string,
  sectionId: string,
  listener: Listener
): () => void {
  const key = getCacheKey(pageId, sectionId);

  if (!subscriptionCache.has(key)) {
    const entry: CacheEntry = {
      data: null,
      loaded: false,
      listeners: new Set(),
      unsubscribe: () => {},
    };

    const ref = doc(db, 'pages', pageId, 'sections', sectionId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const cached = subscriptionCache.get(key);
        if (!cached) return;
        cached.data = snap.exists() ? (snap.data().content as Record<string, unknown>) ?? {} : {};
        cached.loaded = true;
        cached.listeners.forEach((fn) => fn(cached.data));
      },
      (_err) => {
        const cached = subscriptionCache.get(key);
        if (!cached) return;
        cached.data = {};
        cached.loaded = true;
        cached.listeners.forEach((fn) => fn(cached.data));
      }
    );

    entry.unsubscribe = unsub;
    subscriptionCache.set(key, entry);
  }

  const entry = subscriptionCache.get(key)!;
  entry.listeners.add(listener);

  // If we already have data, deliver it immediately so the component doesn't
  // stay in a loading state waiting for the next snapshot event.
  if (entry.loaded) {
    listener(entry.data);
  }

  return () => {
    const cached = subscriptionCache.get(key);
    if (!cached) return;
    cached.listeners.delete(listener);
    // Keep the Firestore subscription alive as long as there are listeners.
    // If nobody is listening anymore, tear it down and remove from cache.
    if (cached.listeners.size === 0) {
      cached.unsubscribe();
      subscriptionCache.delete(key);
    }
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Subscribes to /pages/{pageId}/sections/{sectionId} in Firestore.
 * Returns the content map merged over any provided defaults.
 * Falls back gracefully if Firestore is unreachable or the doc doesn't exist yet.
 *
 * Multiple components subscribing to the same (pageId, sectionId) pair share
 * a single Firestore listener — no duplicate network calls or race conditions.
 */
export function usePageContent(
  pageId: string,
  sectionId: string,
  defaults: Record<string, unknown> = {}
): { content: Record<string, unknown>; loading: boolean } {
  const [firestoreData, setFirestoreData] = useState<Record<string, unknown> | null>(() => {
    // Synchronously seed from cache if already loaded — avoids an extra render cycle
    const key = getCacheKey(pageId, sectionId);
    const entry = subscriptionCache.get(key);
    return entry?.loaded ? entry.data : null;
  });

  useEffect(() => {
    return subscribe(pageId, sectionId, setFirestoreData);
    // pageId and sectionId are the only stable identifiers for the subscription
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, sectionId]);

  const loading = firestoreData === null;
  const content = firestoreData !== null
    ? { ...defaults, ...firestoreData }
    : defaults;

  return { content, loading };
}
