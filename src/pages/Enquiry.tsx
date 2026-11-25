import { FormEvent, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

const TYPES = ['membership', 'benchmarking', 'speakers', 'sponsorship', 'newsletter', 'conference', 'partnership', 'mentorship', 'services', 'general'];
export default function Enquiry() {
  const [params] = useSearchParams();
  const [type, setType] = useState(TYPES.includes(params.get('type') || '') ? params.get('type')! : 'general');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const values = new FormData(event.currentTarget);
    if (values.get('website')) return;
    setStatus('sending');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        name: String(values.get('name') || '').trim(),
        email: String(values.get('email') || '').trim(),
        subject: `${type} enquiry`, enquiryType: type,
        message: String(values.get('message') || '').trim(),
        organization: String(values.get('organization') || '').trim(),
        consentGiven: values.get('consent') === 'on', privacyPolicyVersion: '2026-10-26',
        createdAt: serverTimestamp(), read: false, phone: '', source: 'enquiry'
      });
      setStatus('sent');
    } catch { setStatus('error'); }
  }
  return <section className="max-w-2xl mx-auto px-6 pt-36 pb-24">
    <h1 className="text-4xl mb-6">Contact the chapter</h1>
    <p className="mb-8">Express your interest and the chapter can follow up with details. Do not include confidential organisational data.</p>
    {status === 'sent' ? <p role="status">Your enquiry has been saved for the chapter. Thank you.</p> : <form onSubmit={submit} className="space-y-5">
      <label className="block">Enquiry type<select value={type} onChange={e => setType(e.target.value)} className="block w-full border p-3 bg-brand-dark mt-2">{TYPES.map(t => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}</select></label>
      <label className="block">Name<input name="name" required maxLength={160} autoComplete="name" className="block w-full border p-3 bg-brand-dark mt-2" /></label>
      <label className="block">Email<input name="email" type="email" required maxLength={254} autoComplete="email" className="block w-full border p-3 bg-brand-dark mt-2" /></label>
      <label className="block">Organisation (optional)<input name="organization" maxLength={200} autoComplete="organization" className="block w-full border p-3 bg-brand-dark mt-2" /></label>
      <label className="block">Message<textarea name="message" required maxLength={5000} rows={5} className="block w-full border p-3 bg-brand-dark mt-2" /></label>
      <div hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex gap-3 items-start"><input type="checkbox" name="consent" required className="mt-1" /><span>I consent to itSMF Zambia using these details to respond to this enquiry{type === 'newsletter' ? ' and send the monthly briefing' : ''}. Read the <Link to="/privacy" className="underline">Privacy notice</Link>.</span></label>
      {status === 'error' && <p role="alert">The enquiry could not be saved. Please try again or email <a href="mailto:hello@itsmf.org.zm" className="underline">hello@itsmf.org.zm</a>.</p>}
      <button disabled={status === 'sending'} className="bg-brand-accent text-white px-8 py-4 rounded-xl disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
    </form>}
  </section>;
}
