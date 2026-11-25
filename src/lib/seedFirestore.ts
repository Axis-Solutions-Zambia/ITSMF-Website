import { db } from './firebase';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import patches from './auditContent.json';

/** Initialise missing sections only; existing editorial content is never overwritten. */
export async function seedFirestore(): Promise<void> {
  await runTransaction(db, async transaction => {
    const pages = [...new Set(patches.map(patch => patch.page))];
    const pageRefs = pages.map(page => doc(db, 'pages', page));
    const sectionRefs = patches.map(patch => doc(db, 'pages', patch.page, 'sections', patch.section));
    const pageSnapshots = await Promise.all(pageRefs.map(ref => transaction.get(ref)));
    const sectionSnapshots = await Promise.all(sectionRefs.map(ref => transaction.get(ref)));
    pages.forEach((page, index) => {
      if (!pageSnapshots[index].exists()) transaction.set(pageRefs[index], { title: page[0].toUpperCase() + page.slice(1), path: page === 'home' ? '/' : `/${page}`, status: 'Published', lastEdited: serverTimestamp() });
    });
    patches.forEach((patch, index) => {
      if (!sectionSnapshots[index].exists()) transaction.set(sectionRefs[index], { content: patch.content });
    });
  });
}
