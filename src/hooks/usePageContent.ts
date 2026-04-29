import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

/**
 * Subscribes to /pages/{pageId}/sections/{sectionId} in Firestore.
 * Returns the content map merged over any provided defaults.
 * Falls back gracefully if Firestore is unreachable or the doc doesn't exist yet.
 */
export function usePageContent(
  pageId: string,
  sectionId: string,
  defaults: Record<string, string> = {}
): { content: Record<string, string>; loading: boolean } {
  const [content, setContent] = useState<Record<string, string>>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, 'pages', pageId, 'sections', sectionId);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          // Merge defaults with Firestore values so any missing keys fall back
          setContent({ ...defaults, ...(data.content as Record<string, string>) });
        } else {
          // Document doesn't exist yet — use defaults
          setContent(defaults);
        }
        setLoading(false);
      },
      (_err) => {
        // On error (e.g. network issue), fall back to defaults silently
        setContent(defaults);
        setLoading(false);
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, sectionId]);

  return { content, loading };
}
