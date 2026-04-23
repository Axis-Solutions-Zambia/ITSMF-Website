import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, Target, Activity, Zap, Users, UserPlus, HelpCircle, ArrowRight } from 'lucide-react';

const SUB_NAV = [
  { name: 'Overview', path: '', icon: LayoutDashboard },
  { name: 'What it is', path: 'about', icon: Target },
  { name: 'How it works', path: 'process', icon: Activity },
  { name: 'Benefits', path: 'benefits', icon: Zap },
  { name: 'Participants', path: 'who', icon: Users },
  { name: 'Register', path: 'signup', icon: UserPlus },
  { name: 'FAQ', path: 'faq', icon: HelpCircle },
];

export default function Benchmarking() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || '';

  return (
    <div className="pt-20 min-h-screen bg-brand-dark">
      {/* Local Header */}
      <div className="bg-brand-bg border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block font-mono">DASHED SUB-TREE // LEVEL 4 DEPTH</span>
              <h1 className="text-4xl md:text-5xl font-black leading-none uppercase tracking-tighter italic font-serif">ITIL PERFORMANCE <br/>BENCHMARKING MODEL.</h1>
            </div>
            <div className="flex space-x-4">
              <div className="w-px h-12 bg-white/10 hidden md:block"></div>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase text-brand-muted mb-1 opacity-60">Cycle Status</div>
                <div className="text-brand-accent font-black uppercase text-sm">2026 OPEN FOR ENROLLMENT</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Siderbar Nav (Dashed Tree visualization) */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-32 space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted mb-6 pb-2 border-b border-white/5">Navigation</div>
              {SUB_NAV.map((item) => {
                const isActive = (item.path === '' && (currentPath === 'benchmarking' || currentPath === '')) || currentPath === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path === '' ? '/services/benchmarking' : `/services/benchmarking/${item.path}`}
                    className={`flex items-center space-x-4 px-6 py-4 border transition-all uppercase text-[10px] font-black tracking-widest ${
                      isActive 
                        ? 'bg-brand-accent border-brand-accent text-brand-dark' 
                        : 'border-white/5 text-brand-muted hover:border-brand-accent/40 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-brand-dark' : 'text-brand-accent'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route index element={<BenchmarkingOverview />} />
              <Route path="about" element={<BenchmarkingWhat />} />
              <Route path="process" element={<BenchmarkingHow />} />
              <Route path="benefits" element={<BenchmarkingBenefits />} />
              <Route path="who" element={<BenchmarkingWho />} />
              <Route path="signup" element={<BenchmarkingSignUp />} />
              <Route path="faq" element={<BenchmarkingFAQ />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function BenchmarkingOverview() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
      <div className="accent-border border-brand-accent p-px">
        <div className="bg-brand-bg p-12 lg:p-16">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic font-serif">A DATA-DRIVEN <br />MATURITY ROADMAP.</h2>
          <p className="text-xs text-brand-muted uppercase tracking-[0.2em] font-bold leading-loose mb-12">
            The Performance Benchmarking Model (PBM) is itSMF Zambia's proprietary assessment framework. It allows organizations to evaluate their ITIL 4 implementation success against national averages and global best practices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 border border-white/5 bg-brand-dark">
              <h4 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-4 italic">Strategic Goal</h4>
              <p className="text-[11px] font-bold text-white/60 leading-relaxed uppercase pr-4">To provide a standardized metric for IT service quality across the Zambian corporate and government sectors.</p>
            </div>
            <div className="p-8 border border-white/5 bg-brand-dark">
              <h4 className="text-brand-accent font-black text-xs uppercase tracking-widest mb-4 italic">2026 Focus</h4>
              <p className="text-[11px] font-bold text-white/60 leading-relaxed uppercase pr-4">Alignment between ITIL 4 service value chains and the National ICT Policy (2023-2030).</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BenchmarkingWhat() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <h2 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-brand-accent">WHAT IS THE MODEL?</h2>
      <div className="prose prose-invert max-w-none text-xs text-brand-muted uppercase font-bold tracking-widest leading-loose">
        <p className="mb-6">The model consists of a 240-point assessment covering People, Process, Technology, and Governance. It was developed in collaboration with itSMF International to ensure local relevance within a global context.</p>
        <p>Unlike simple audits, the PBM is a longitudinal study that tracks an organization's maturity over years, providing actionable intelligence for CIOs.</p>
      </div>
    </motion.div>
  );
}

function BenchmarkingHow() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <h2 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-brand-accent">THE PROCESS.</h2>
      <div className="grid grid-cols-1 gap-px bg-white/5">
        {[
          'Initial Self-Assessment via portal',
          'Evidence verification by itSMF Zambia audit committee',
          'Comparative analysis vs industry sector',
          'Final Maturity Report and Certification issue'
        ].map((step, i) => (
          <div key={i} className="bg-brand-dark p-8 flex items-center gap-8 group hover:bg-brand-bg transition-all">
            <span className="text-brand-accent/20 font-black text-4xl group-hover:text-brand-accent transition-colors italic">0{i+1}</span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{step}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BenchmarkingBenefits() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 text-xs text-brand-muted uppercase font-bold tracking-widest leading-relaxed">
      <h2 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-brand-accent">BENEFITS.</h2>
      <ul className="space-y-8">
        <li><span className="text-white block mb-2 font-black italic">OBJECTIVE INSIGHT:</span> Moving beyond "feeling" towards data-backed proof of IT performance.</li>
        <li><span className="text-white block mb-2 font-black italic">BUDGET JUSTIFICATION:</span> Clear metrics to present to the board for technology investments.</li>
        <li><span className="text-white block mb-2 font-black italic">RECOGNITION:</span> itSMF "Validated Practitioner" seal for your IT organogram.</li>
      </ul>
    </motion.div>
  );
}

function BenchmarkingWho() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <h2 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-brand-accent">PARTICIPANTS.</h2>
      <p className="text-xs text-brand-muted uppercase tracking-[0.2em] font-bold leading-loose">
        The model is architected for:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
        <div className="bg-brand-dark p-8 border border-white/5">
          <h4 className="text-[10px] font-black mb-4 tracking-widest text-brand-accent">CORPORATE</h4>
          <p className="text-[10px] leading-relaxed">Financial institutions, Mining operators, and Telecom providers.</p>
        </div>
        <div className="bg-brand-dark p-8 border border-white/5">
          <h4 className="text-[10px] font-black mb-4 tracking-widest text-brand-accent">GOVERNMENT</h4>
          <p className="text-[10px] leading-relaxed">Ministries, Agencies, and Statutory bodies aligning with e-Gov mandates.</p>
        </div>
      </div>
    </motion.div>
  );
}

function BenchmarkingSignUp() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <h2 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-brand-accent">SECURE REGISTRATION.</h2>
      <div className="bg-brand-bg p-8 lg:p-12 border border-white/5 relative">
        <div className="absolute top-0 right-0 w-2 h-full bg-brand-accent"></div>
        <p className="text-xs text-brand-muted uppercase font-bold tracking-widest mb-10 leading-loose">
          Organizations must be current Corporate Members of itSMF Zambia to apply. Individual members may register as part of a Corporate team.
        </p>
        <button className="w-full py-6 bg-brand-accent text-brand-dark font-black text-xs uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl">
          INITIATE APPLICATION
        </button>
      </div>
    </motion.div>
  );
}

function BenchmarkingFAQ() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <h2 className="text-3xl font-black uppercase tracking-tighter italic font-serif text-brand-accent">FAQ.</h2>
      <div className="space-y-4">
        {[
          { q: 'How long does the assessment take?', a: 'Typically 6-8 weeks from data submission to report delivery.' },
          { q: 'Is my data confidential?', a: 'Yes. Only aggregated anonymized data is used for benchmarking. Specific organizational data is never shared.' },
          { q: 'What is the cost?', a: 'Free for Corporate Members at the Executive tier. Subsidized for Standard tiers.' }
        ].map((faq, i) => (
          <div key={i} className="border-b border-white/10 pb-8">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-4 italic leading-relaxed">{faq.q}</h4>
            <p className="text-[10px] text-brand-muted font-bold tracking-[0.2em] leading-loose">{faq.a}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
