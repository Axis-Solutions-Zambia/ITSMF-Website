import { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, User, Lock, Mail, ChevronRight, FileText, Download, Award, Calendar } from 'lucide-react';
import { usePageContent } from '@/src/hooks/usePageContent';

// ─── Default content (Firestore fallback) ────────────────────────────────────
const AUTH_DEFAULTS = {
  eyebrow: 'Authorization Required',
  headline_line1: 'MEMBER',
  headline_line2: 'GATEWAY.',
  desc: 'Enter your credentials to access the itSMF Zambia intellectual assets.',
  btn_label: 'AUTHENTICATE',
  notice: 'Unauthorized access is logged.',
  cta_label: 'Apply for Tier'
};

const DASHBOARD_DEFAULTS = {
  status: 'STATUS: VALIDATED',
  welcome_line1: 'WELCOME BACK,',
  welcome_line2: 'PRACTITIONER.',
  terminate_btn: 'TERMINATE SESSION'
};

const ARCHIVES_DEFAULTS = {
  headline: 'Premium Archives',
  documents: [
    { title: 'ITIL 4 Implementation Toolkit', type: 'ZIP Archive', size: '25 MB' },
    { title: 'Service Desk SLA Templates', type: 'DOCX', size: '1.2 MB' },
    { title: 'National IT Governance Policy 2026', type: 'PDF', size: '5 MB' },
    { title: 'Agile ITSM Whitepaper', type: 'PDF', size: '2 MB' }
  ]
};

const BRIEFING_DEFAULTS = {
  headline: 'Executive Briefing',
  month: 'APR',
  day: '28',
  title: 'QUARTERLY OBSERVER SESSION',
  desc: 'Chapter leadership session on strategic maturity and fiscal pathways for 2026.',
  btn_label: 'REGISTER'
};

const STATUS_DEFAULTS = {
  headline: 'CERTIFIED STATUS',
  type: 'INDIVIDUAL',
  tier: 'Tier: Platinum Practitioner',
  fields: [
    { label: 'CHAPTER ID', value: 'ZM-2026-0042' },
    { label: 'MATURITY POINTS', value: '1,240 CPD' }
  ]
};

const ITINERARY_DEFAULTS = {
  headline: 'Active Itinerary',
  events: [
    { text: 'LIVINGSTONE SUMMIT 2026 // DELEGATE PASS CONFIRMED' }
  ],
  footer_text: 'No further actions required at this time.'
};

export default function Portal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { content: auth } = usePageContent('portal', 'auth', AUTH_DEFAULTS);
  const { content: dashboard } = usePageContent('portal', 'dashboard', DASHBOARD_DEFAULTS);
  const { content: archives } = usePageContent('portal', 'archives', ARCHIVES_DEFAULTS as any);
  const { content: briefing } = usePageContent('portal', 'briefing', BRIEFING_DEFAULTS);
  const { content: status } = usePageContent('portal', 'status', STATUS_DEFAULTS as any);
  const { content: itinerary } = usePageContent('portal', 'itinerary', ITINERARY_DEFAULTS as any);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-brand-dark px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-bg p-12 lg:p-20 shadow-2xl border border-brand-text/5 w-full max-w-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-accent"></div>
          <div className="mb-12">
            <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">{auth.eyebrow}</span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic font-serif leading-none">
              {auth.headline_line1} <br />{auth.headline_line2}
            </h1>
            <p className="text-xs text-brand-muted font-bold uppercase tracking-widest leading-loose">{auth.desc}</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Credential ID</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-text/20 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="OFFICIAL EMAIL" 
                  className="w-full pl-16 pr-6 py-6 bg-brand-dark border border-brand-text/10 text-xs font-black uppercase tracking-widest focus:border-brand-accent outline-none transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Secure Key</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-text/20 w-5 h-5" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-16 pr-6 py-6 bg-brand-dark border border-brand-text/10 text-xs font-black uppercase tracking-widest focus:border-brand-accent outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <label className="flex items-center space-x-3 text-brand-muted cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded-none border-brand-text/20 bg-transparent checked:bg-brand-accent transition-all appearance-none border" />
                <span className="group-hover:text-brand-text transition-colors">Remember Session</span>
              </label>
              <button type="button" className="text-brand-accent hover:text-brand-text transition-colors">Access Recovery</button>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-accent text-brand-dark py-6 font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-text shadow-2xl transition-all flex items-center justify-center"
            >
              {auth.btn_label} <LogIn className="ml-3 w-5 h-5" />
            </button>
          </form>

          <div className="mt-16 pt-12 border-t border-brand-text/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">{auth.notice}</p>
            <button className="text-brand-accent font-black text-[10px] uppercase tracking-[0.4em] flex items-center hover:text-brand-text transition-all">
              {auth.cta_label} <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard Mockup
  return (
    <div className="pt-32 pb-32 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12 border-b border-brand-text/5 pb-12">
          <div>
            <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block font-mono">{dashboard.status}</span>
            <h1 className="text-4xl md:text-6xl font-black leading-none uppercase tracking-tighter italic">
              {dashboard.welcome_line1} <br /><span className="text-transparent text-stroke italic">{dashboard.welcome_line2}</span>
            </h1>
            <p className="text-[11px] text-brand-muted uppercase tracking-[0.2em] font-black mt-4">Profile Reference: <span className="text-brand-text">ZM-2026-0422</span></p>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="border border-brand-text/10 px-8 py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:border-brand-accent transition-all"
          >
            {dashboard.terminate_btn}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-24">
            <div>
              <h3 className="text-sm font-black mb-12 uppercase tracking-[0.4em] text-brand-accent flex items-center">
                 {archives.headline}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-text/5 border border-brand-text/5">
                {(archives.documents as unknown as any[]).map((item, i) => (
                  <div key={i} className="p-8 bg-brand-dark hover:bg-brand-text/5 transition-all cursor-pointer group relative">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 bg-brand-bg border border-brand-text/5 flex items-center justify-center text-brand-accent transition-all group-hover:bg-brand-accent group-hover:text-brand-bg">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest mb-1 leading-tight">{item.title}</div>
                        <div className="text-[9px] text-brand-muted font-black uppercase tracking-widest font-mono">{item.type} // {item.size}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black mb-12 uppercase tracking-[0.4em] text-brand-accent">{briefing.headline}</h3>
              <div className="accent-border border-brand-text/5 p-px">
                <div className="flex flex-col md:flex-row items-center gap-12 p-12 bg-brand-dark">
                  <div className="w-24 h-24 bg-brand-bg border border-brand-accent flex flex-col items-center justify-center text-brand-accent">
                    <span className="text-[10px] font-black uppercase font-mono mb-1 tracking-widest">{briefing.month}</span>
                    <span className="text-4xl font-black leading-none">{briefing.day}</span>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h4 className="text-xl font-black uppercase tracking-tighter italic font-serif mb-4 leading-none">{briefing.title}</h4>
                    <p className="text-xs text-brand-muted font-bold uppercase tracking-widest leading-loose">{briefing.desc}</p>
                  </div>
                  <button className="bg-brand-accent text-brand-dark px-8 py-4 font-black text-[10px] uppercase tracking-[0.3em] w-full md:w-auto hover:bg-brand-text transition-all shadow-xl">
                    {briefing.btn_label}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-24">
            <div className="bg-brand-accent p-12 text-brand-dark relative overflow-hidden group">
              <h3 className="text-[10px] font-black mb-12 uppercase tracking-[0.4em] opacity-60 flex items-center">
                 {status.headline}
              </h3>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 border-4 border-brand-dark flex items-center justify-center mb-8 grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <User className="w-16 h-16" />
                </div>
                <div className="text-3xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">{status.type}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 font-mono">{status.tier}</div>
              </div>
              <div className="mt-12 pt-12 border-t border-brand-dark/10 space-y-4 font-black uppercase text-[10px] tracking-widest">
                {(status.fields as unknown as any[]).map((field, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="opacity-60">{field.label}</span>
                    <span className={i > 0 ? "font-mono" : ""}>{field.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black mb-12 uppercase tracking-[0.4em] text-brand-muted">{itinerary.headline}</h3>
              <div className="space-y-4">
                {(itinerary.events as unknown as any[]).map((evt, i) => (
                  <div key={i} className="p-6 bg-brand-dark border border-brand-text/5 text-[10px] font-black uppercase tracking-widest text-brand-accent leading-relaxed">
                    {evt.text}
                  </div>
                ))}
                <p className="text-brand-text/20 text-[9px] font-black uppercase tracking-[0.4em] text-center italic">{itinerary.footer_text}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
