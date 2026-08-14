import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { Save, KeyRound, CheckCircle, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

// ─── SHA-256 hash util ────────────────────────────────────────────────────────
export async function hashPassword(plain: string): Promise<string> {
  const data = new TextEncoder().encode(plain);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const ADMIN_SETTINGS_REF = () => doc(db, 'admin', 'settings');

// ─── Component ────────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | null;

function Toast({ type, message }: { type: ToastType; message: string }) {
  if (!type) return null;
  const ok = type === 'success';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-8 right-8 z-50 flex items-center px-6 py-4 shadow-2xl border font-black text-xs uppercase tracking-[0.2em] ${
        ok ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'
      }`}
    >
      {ok ? <CheckCircle className="w-4 h-4 mr-3 shrink-0" /> : <AlertCircle className="w-4 h-4 mr-3 shrink-0" />}
      {message}
    </motion.div>
  );
}

function PasswordInput({
  label, value, onChange, placeholder, id
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; id: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? '••••••••'}
          className="w-full px-4 py-4 pr-12 bg-brand-bg border border-brand-text/10 text-sm font-medium text-brand-text placeholder-brand-muted/40 outline-none focus:border-brand-accent transition-colors"
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-accent transition-colors"
          tabIndex={-1}
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: ToastType; message: string }>({ type: null, message: '' });

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message });
    setTimeout(() => setToast({ type: null, message: '' }), 4000);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (newPw.length < 8) {
      showToast('error', 'New password must be at least 8 characters.');
      return;
    }
    if (newPw !== confirmPw) {
      showToast('error', 'New passwords do not match.');
      return;
    }

    setSaving(true);
    try {
      const snap = await getDoc(ADMIN_SETTINGS_REF());
      const storedHash = snap.exists() ? snap.data()?.masterPasswordHash : null;
      const currentHash = await hashPassword(currentPw);

      // If no password has been set yet, the default is "ITSMF@2026"
      const defaultHash = await hashPassword('ITSMF@2026');
      const expectedHash = storedHash ?? defaultHash;

      if (currentHash !== expectedHash) {
        showToast('error', 'Current master password is incorrect.');
        setSaving(false);
        return;
      }

      const newHash = await hashPassword(newPw);
      await setDoc(ADMIN_SETTINGS_REF(), { masterPasswordHash: newHash }, { merge: true });

      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
      showToast('success', 'Master password updated successfully.');
    } catch (err: any) {
      console.error(err);
      showToast('error', `Failed to update: ${err?.message || 'Check your connection.'}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-10">
      {/* Header */}
      <div className="border-b border-brand-text/5 pb-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">
          SETTINGS.
        </h2>
        <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">
          Manage admin access and security settings.
        </p>
      </div>

      {/* Master Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-dark border border-brand-text/5"
      >
        {/* Card Header */}
        <div className="p-6 border-b border-brand-text/5 flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-accent/10 flex items-center justify-center">
            <KeyRound className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <div className="text-sm font-black uppercase tracking-widest mb-0.5">Master Password</div>
            <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
              Required after Google sign-in. Default is{' '}
              <code className="text-brand-accent font-mono bg-brand-bg px-1 py-0.5 rounded">ITSMF@2026</code>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleChangePassword} className="p-6 space-y-6">
          <PasswordInput
            id="current-master"
            label="Current Master Password"
            value={currentPw}
            onChange={setCurrentPw}
            placeholder="Enter current master password"
          />
          <PasswordInput
            id="new-master"
            label="New Master Password"
            value={newPw}
            onChange={setNewPw}
            placeholder="Min. 8 characters"
          />
          <PasswordInput
            id="confirm-master"
            label="Confirm New Password"
            value={confirmPw}
            onChange={setConfirmPw}
            placeholder="Repeat new password"
          />

          {/* Strength hint */}
          {newPw.length > 0 && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((level) => {
                const strength =
                  (newPw.length >= 8 ? 1 : 0) +
                  (/[A-Z]/.test(newPw) ? 1 : 0) +
                  (/[0-9]/.test(newPw) ? 1 : 0) +
                  (/[^A-Za-z0-9]/.test(newPw) ? 1 : 0);
                const colors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];
                return (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      level <= strength ? colors[strength - 1] : 'bg-brand-text/10'
                    }`}
                  />
                );
              })}
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-muted ml-2">
                {['', 'Weak', 'Fair', 'Good', 'Strong'][
                  (newPw.length >= 8 ? 1 : 0) +
                  (/[A-Z]/.test(newPw) ? 1 : 0) +
                  (/[0-9]/.test(newPw) ? 1 : 0) +
                  (/[^A-Za-z0-9]/.test(newPw) ? 1 : 0)
                ]}
              </span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving || !currentPw || !newPw || !confirmPw}
              className="flex items-center px-6 py-3 bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-text transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {saving ? 'Saving…' : 'Update Password'}
            </button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {toast.type && <Toast type={toast.type} message={toast.message} />}
      </AnimatePresence>
    </div>
  );
}
