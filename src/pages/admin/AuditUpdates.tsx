import { useState } from 'react';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import patches from '@/src/lib/auditContent.json';

export default function AuditUpdates() {
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function apply() {
    setBusy(true); setStatus('Saving content updates…');
    try {
      await runTransaction(db, async transaction => {
        const refs = patches.map(patch => doc(db, 'pages', patch.page, 'sections', patch.section));
        const snapshots = await Promise.all(refs.map(ref => transaction.get(ref)));
        patches.forEach((patch, i) => {
          const old = snapshots[i].data() || {};
          const next = { ...(old.content || {}), ...patch.content } as Record<string, unknown>;
          // The audit says the existing vision and mission already match the plan.
          for (const key of ['vision_text', 'mission_text']) {
            if (old.content?.[key]) next[key] = old.content[key];
          }
          transaction.set(refs[i], {
            ...old,
            auditPreviousContent: old.auditPreviousContent || old.content || {},
            content: next,
            auditUpdatedAt: serverTimestamp()
          });
        });
      });
      setStatus('Audit content saved. Previous values are retained in each section’s auditPreviousContent field. Review the public pages before deployment.');
    } catch { setStatus('Content could not be saved. No audit changes were applied. Check administrator access and Firestore rules.'); }
    finally { setBusy(false); }
  }
  return <div className="border border-brand-accent/30 p-6 mb-8 rounded-xl">
    <h3 className="text-xl mb-3">Audit content updates</h3>
    <p className="mb-4">Apply neutral content to the audited sections: remove unsupported names, fees, benefits and historical claims. This updates the connected database, including content used by the live site. Review the exact replacements first. Confirmed appointments, partner agreements, resource URLs and event materials can then be entered in the section editors.</p>
    <button onClick={() => setPreview(!preview)} className="underline mr-6">{preview ? 'Hide replacements' : 'Review replacements'}</button>
    {preview && <><pre className="max-h-96 overflow-auto text-xs whitespace-pre-wrap my-5">{JSON.stringify(patches, null, 2)}</pre><button disabled={busy || status.startsWith('Audit content saved')} onClick={apply} className="bg-brand-accent text-white px-6 py-3 disabled:opacity-50">{busy ? 'Saving…' : 'Apply reviewed audit content'}</button></>}
    {status && <p role="status" className="mt-4">{status}</p>}
  </div>;
}
