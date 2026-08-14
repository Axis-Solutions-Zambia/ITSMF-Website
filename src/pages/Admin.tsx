import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, Users, Calendar, FileText, Settings, 
  LogOut, LayoutDashboard, ChevronRight,
  Bell, Sun, Moon, MessageSquare, Image as ImageIcon,
  Loader2, KeyRound, Eye, EyeOff, Download
} from 'lucide-react';

import ContentManager from './admin/ContentManager';
import Messages from './admin/Messages';
import MediaLibrary from './admin/MediaLibrary';
import AdminSettings, { hashPassword, ADMIN_SETTINGS_REF } from './admin/AdminSettings';

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, Legend
} from 'recharts';
import { collection, query, orderBy, onSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { db, auth, googleProvider } from '@/src/lib/firebase';

// Mock Data
const METRICS = [
  { label: 'Total Members', value: '2,845', change: '+12%', isPositive: true },
  { label: 'Active Subscriptions', value: '1,420', change: '+5%', isPositive: true },
  { label: 'Site Visits (30d)', value: '45,231', change: '+18%', isPositive: true },
  { label: 'Event Registrations', value: '890', change: '+24%', isPositive: true },
];



const SIGNUPS_DATA = [
  { name: 'Platinum', count: 45, color: '#3b82f6' },
  { name: 'Corporate', count: 120, color: '#10b981' },
  { name: 'Individual', count: 350, color: '#6366f1' },
];

const UPCOMING_EVENTS = [
  { name: 'Livingstone Tech Summit 2026', daysLeft: 45, totalSeats: 500, booked: 450 },
  { name: 'ITIL Foundation Masterclass', daysLeft: 62, totalSeats: 50, booked: 20 },
  { name: 'Q3 Executive Briefing', daysLeft: 101, totalSeats: 150, booked: 120 },
];

const RECENT_ACTIVITY = [
  { user: 'Sarah Musonda', action: 'applied for Platinum Membership', time: '2 hours ago' },
  { user: 'Admin', action: 'published new whitepaper "Agile ITSM"', time: '4 hours ago' },
  { user: 'System', action: 'processed 45 subscription renewals', time: '5 hours ago' },
  { user: 'David Chanda', action: 'registered for Livingstone Summit', time: 'Yesterday' },
];

// ─── Google Sign-In Screen ────────────────────────────────────────────────────

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGoogle() {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged in Admin will pick this up automatically
    } catch (err: any) {
      const code = err?.code ?? '';
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        // User closed the popup — not an error
      } else if (code === 'auth/unauthorized-domain') {
        setError('This domain is not authorised. Add it in Firebase Console → Auth → Settings.');
      } else {
        setError('Sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-brand-bg p-12 shadow-2xl border border-brand-text/10 w-full max-w-sm relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-brand-dark border-2 border-brand-accent flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-brand-accent" />
          </div>
          <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">Restricted Access</span>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-center">COMMAND CENTER.</h1>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-800 font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-100 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            /* Google SVG icon */
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
          )}
          {loading ? 'Signing in…' : 'Continue with Google'}
        </button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-[10px] font-black uppercase tracking-widest text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}

        <p className="mt-8 text-center text-[9px] font-bold uppercase tracking-widest text-brand-muted/60">
          Access restricted to authorised administrators only.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Master Password Challenge ─────────────────────────────────────────────────

function MasterPasswordChallenge({ user, onVerified }: { user: User; onVerified: () => void }) {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if a master password has been set yet
    getDoc(ADMIN_SETTINGS_REF()).then((snap) => {
      if (!snap.exists() || !snap.data()?.masterPasswordHash) {
        setIsFirstTime(true);
      }
    });
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const snap = await getDoc(ADMIN_SETTINGS_REF());
      const storedHash = snap.exists() ? snap.data()?.masterPasswordHash : null;
      const defaultHash = await hashPassword('ITSMF@2026');
      const expectedHash = storedHash ?? defaultHash;
      const enteredHash = await hashPassword(password);

      if (enteredHash === expectedHash) {
        // If no password was ever saved, seed it now
        if (!storedHash) {
          await setDoc(ADMIN_SETTINGS_REF(), { masterPasswordHash: defaultHash }, { merge: true });
        }
        onVerified();
      } else {
        setError('Incorrect master password. Try again.');
        setPassword('');
      }
    } catch (err: any) {
      console.error(err);
      setError(`Verification failed: ${err?.message || 'Check your connection.'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-brand-bg p-12 shadow-2xl border border-brand-text/10 w-full max-w-sm relative z-10"
      >
        {/* User avatar */}
        <div className="flex flex-col items-center mb-10">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName ?? 'Admin'} className="w-16 h-16 rounded-full border-2 border-brand-accent mb-4 object-cover" />
          ) : (
            <div className="w-16 h-16 bg-brand-accent text-brand-dark flex items-center justify-center font-black text-xl mb-4">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="text-xs font-black uppercase tracking-widest text-brand-text mb-1">{user.displayName ?? user.email}</div>
          <div className="text-[9px] font-bold text-brand-muted uppercase tracking-wider">{user.email}</div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-brand-dark border border-brand-accent/40 flex items-center justify-center mb-4">
            <KeyRound className="w-5 h-5 text-brand-accent" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter italic font-serif text-center mb-1">Master Password</h2>
          {isFirstTime && (
            <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest text-center mt-1">
              First time? Default is ITSMF@2026
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              ref={inputRef}
              type={visible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter master password"
              className="w-full px-4 py-4 pr-12 bg-brand-dark border border-brand-text/10 text-sm font-medium text-brand-text placeholder-brand-muted/40 outline-none focus:border-brand-accent transition-colors"
              required
              autoComplete="current-password"
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

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-widest text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center py-4 bg-brand-accent text-brand-dark font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-text transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><KeyRound className="w-4 h-4 mr-2" /> Unlock</>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-brand-text/5 flex justify-center">
          <button
            onClick={() => signOut(auth)}
            className="text-[9px] font-black uppercase tracking-widest text-brand-muted hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardOverview() {
  const [visitData, setVisitData] = useState<any[]>([]);
  const [totalVisits30d, setTotalVisits30d] = useState<number>(0);
  const [totalReturns30d, setTotalReturns30d] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, 'visits'), orderBy('timestamp', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const groups: Record<string, { visits: number, returns: number }> = {};
      let visits30d = 0;
      let returns30d = 0;
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      snap.forEach(doc => {
        const data = doc.data();
        if (!data.timestamp) return;
        const dateObj = data.timestamp.toDate();
        
        if (dateObj > thirtyDaysAgo) {
          visits30d++;
          if (data.isReturnVisit) {
            returns30d++;
          }
        }
        
        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (!groups[dateStr]) {
          groups[dateStr] = { visits: 0, returns: 0 };
        }
        
        groups[dateStr].visits++;
        if (data.isReturnVisit) {
          groups[dateStr].returns++;
        }
      });

      const chartData = Object.entries(groups).map(([name, counts]) => ({
        name,
        visits: counts.visits,
        returns: counts.returns
      }));

      if (chartData.length > 0) {
        setVisitData(chartData.slice(-14)); // Show up to last 14 active days
      } else {
        setVisitData([]);
      }
      setTotalVisits30d(visits30d);
      setTotalReturns30d(returns30d);
      setLoading(false);
    }, (err) => {
      console.error("Visits listener error:", err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const dynamicMetrics = [
    { label: 'Total Members', value: '2,845', change: '+12%', isPositive: true },
    { label: 'Return Visits (30d)', value: totalReturns30d.toLocaleString(), change: 'Live Data', isPositive: true },
    { label: 'Site Visits (30d)', value: totalVisits30d.toLocaleString(), change: 'Live Data', isPositive: true },
    { label: 'Event Registrations', value: '890', change: '+24%', isPositive: true },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">SYSTEM OVERVIEW.</h2>
          <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">Live metrics and analytical graphs.</p>
        </div>
        <button className="bg-brand-dark border border-brand-text/10 text-brand-text px-6 py-3 font-black text-[10px] uppercase tracking-[0.3em] hover:border-brand-accent transition-all flex items-center">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-brand-dark p-6 border border-brand-text/5 h-[130px] animate-pulse flex flex-col justify-between">
              <div className="w-24 h-3 bg-brand-text/10 rounded"></div>
              <div className="w-16 h-8 bg-brand-text/10 rounded"></div>
              <div className="w-32 h-3 bg-brand-text/10 rounded"></div>
            </div>
          ))
        ) : (
          dynamicMetrics.map((metric, i) => (
            <div key={i} className="bg-brand-dark p-6 border border-brand-text/5 hover:border-brand-accent/50 transition-all group">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted mb-4">{metric.label}</div>
              <div className="text-3xl font-black tracking-tighter mb-2">{metric.value}</div>
              <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-brand-dark border border-brand-text/5 p-6 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-brand-accent">Site Visits & Engagement</h3>
            <span className="text-[9px] font-bold text-brand-muted uppercase tracking-widest bg-brand-bg px-3 py-1 rounded-full">Last 6 Months</span>
          </div>
          <div className="flex-grow">
            {loading ? (
              <div className="w-full h-full bg-brand-text/5 animate-pulse rounded"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    itemStyle={{ textTransform: 'uppercase' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                  <Area type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                  <Area type="monotone" dataKey="returns" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReturns)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Countdowns Widget */}
        <div className="bg-brand-dark border border-brand-text/5 p-6 flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-brand-accent mb-6">Event Countdowns</h3>
          <div className="space-y-6 flex-grow flex flex-col justify-between">
            {UPCOMING_EVENTS.map((event, i) => (
              <div key={i} className="bg-brand-bg/50 p-4 border border-brand-text/5 rounded-lg relative overflow-hidden group">
                {/* Progress Bar Background */}
                <div className="absolute top-0 left-0 h-1 bg-brand-text/10 w-full">
                  <div 
                    className="h-full bg-brand-accent transition-all duration-1000" 
                    style={{ width: `${(event.booked / event.totalSeats) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-start mt-2">
                  <div className="pr-4">
                    <div className="text-xs font-black uppercase tracking-widest mb-1 leading-tight">{event.name}</div>
                    <div className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] font-mono">
                      {event.booked} / {event.totalSeats} Registered
                    </div>
                  </div>
                  <div className="flex flex-col items-center bg-brand-dark p-2 border border-brand-text/10 rounded min-w-[50px]">
                    <span className="text-xl font-black text-brand-accent leading-none mb-1">{event.daysLeft}</span>
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] text-brand-muted">Days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signups Bar Chart */}
        <div className="lg:col-span-2 bg-brand-dark border border-brand-text/5 p-6 h-[350px] flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-brand-accent mb-6">New Signups by Tier</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIGNUPS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                <XAxis type="number" stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                  {SIGNUPS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-brand-dark border border-brand-text/5 p-6 h-[350px] overflow-hidden flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-brand-accent mb-6">Recent Activity</h3>
          <div className="space-y-5 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-brand-accent mt-1.5" />
                  {i !== RECENT_ACTIVITY.length - 1 && (
                    <div className="w-px h-full bg-brand-text/10 my-1 group-hover:bg-brand-accent/50 transition-colors" />
                  )}
                </div>
                <div className="pb-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-text mb-0.5">{activity.user}</div>
                  <div className="text-[9px] font-bold text-brand-muted leading-relaxed mb-1">{activity.action}</div>
                  <div className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-brand-accent/60">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Admin() {
  // null = still checking auth state (loading)
  // false = not signed in with Google
  // User = signed in with Google but master password not yet verified
  const [user, setUser] = useState<User | null | false>(null);
  const [masterVerified, setMasterVerified] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  // Listen for Firebase auth state changes — persists login across page reloads
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? false);
      // Reset master password verification when user signs out
      if (!firebaseUser) setMasterVerified(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark';
    setIsDark(isDarkStored);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  // Still checking Firebase auth state
  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="w-8 h-8 animate-spin text-brand-accent" />
      </div>
    );
  }

  // Not signed in → Google sign-in screen
  if (user === false) return <AdminLogin />;

  // Signed in with Google but master password not verified yet
  if (!masterVerified) {
    return <MasterPasswordChallenge user={user} onVerified={() => setMasterVerified(true)} />;
  }

  const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Calendar, label: 'Events', path: '/admin/events' },
    { icon: Users, label: 'Members', path: '/admin/members' },
    { icon: FileText, label: 'Content', path: '/admin/content' },
    { icon: ImageIcon, label: 'Media', path: '/admin/media' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="h-screen overflow-hidden bg-brand-bg flex flex-col md:flex-row font-sans text-brand-text transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-dark border-r border-brand-text/5 flex flex-col z-20">
        <div className="p-6 border-b border-brand-text/5">
          <Link to="/" className="flex items-center" title="Return to Main Site">
            <ShieldCheck className="w-8 h-8 text-brand-accent mr-3" />
            <div>
              <div className="text-sm font-black tracking-tighter uppercase leading-none">itSMF Zambia</div>
              <div className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-muted mt-1">Admin Portal</div>
            </div>
          </Link>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all group ${
                  isActive 
                    ? 'bg-brand-accent/10 text-brand-accent' 
                    : 'text-brand-muted hover:bg-brand-text/5 hover:text-brand-text'
                }`}
              >
                <item.icon className={`w-4 h-4 mr-4 ${isActive ? 'text-brand-accent' : 'group-hover:text-brand-text'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-brand-text/5 flex flex-col">
          {/* Profile & Actions */}
          <div className="p-6 flex items-center justify-between border-b border-brand-text/5">
            <div className="flex items-center cursor-pointer group">
              {(user as User).photoURL ? (
                <img
                  src={(user as User).photoURL!}
                  alt={(user as User).displayName ?? 'Admin'}
                  className="w-8 h-8 rounded-full mr-3 shrink-0 border border-brand-accent/30 object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-brand-accent text-brand-dark flex items-center justify-center font-black text-xs mr-3 shrink-0">
                  {(user as User).email?.charAt(0).toUpperCase() ?? 'A'}
                </div>
              )}
              <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-widest group-hover:text-brand-accent transition-colors truncate max-w-[100px]">
                  {(user as User).displayName ?? (user as User).email}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="relative text-brand-muted hover:text-brand-accent transition-colors" title="Notifications">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={toggleTheme} className="text-brand-muted hover:text-brand-accent transition-colors" title="Toggle Theme">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <button 
              onClick={() => signOut(auth)}
              className="flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4 mr-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full overflow-hidden">
        {/* Dynamic Content */}
        <main className="flex-grow p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/events" element={<div className="p-8 border border-brand-text/10 border-dashed text-center text-brand-muted font-black uppercase tracking-[0.3em] text-xs">Events Management Module (Placeholder)</div>} />
                <Route path="/members" element={<div className="p-8 border border-brand-text/10 border-dashed text-center text-brand-muted font-black uppercase tracking-[0.3em] text-xs">Member Directory Module (Placeholder)</div>} />
                <Route path="/content/*" element={<ContentManager />} />
                <Route path="/media" element={<MediaLibrary />} />
                <Route path="/settings" element={<AdminSettings />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
