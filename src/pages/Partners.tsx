import { motion } from 'motion/react';
import { ShieldCheck, Globe, Building2, Briefcase, ExternalLink, HelpCircle } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Training Partners (ATOs)',
    desc: 'Accredited organizations authorized to deliver official itSMF training and certifications.',
    partners: ['Exemplar Global', 'PeopleCert', 'APMG International', 'ITSM Academy']
  },
  {
    title: 'Strategic Government & NGOs',
    desc: 'Institutional allies driving national policy and cross-sector digital transformation.',
    partners: ['Ministry of Technology', 'ZNBC', 'UNDP Zambia', 'GIZ Office Lusaka', 'SMART Zambia']
  },
  {
    title: 'Corporate Sponsors',
    desc: 'Forward-thinking enterprises supporting the chapter through sustained investment.',
    partners: ['ZRA', 'Liquid Intelligent', 'Airtel Business', 'Standard Chartered']
  }
];

export default function Partners() {
  return (
    <div className="pt-20">
      <section className="bg-brand-dark py-32 relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-[8vw] font-black leading-[0.8] mb-10 uppercase tracking-tighter italic">ALLIED <br /><span className="text-transparent text-stroke">ECOSYSTEMS</span>.</h1>
            <p className="text-xl text-brand-muted max-w-2xl leading-relaxed uppercase tracking-wider font-bold opacity-80 decoration-brand-accent underline underline-offset-8">
              Strategic alignment with governance bodies, international standards, and private sector innovators.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 text-[18vw] font-black text-white/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          SYSTEM
        </div>
      </section>

      {/* Local Sub-nav */}
      <section className="py-20 bg-brand-bg border-b border-white/5 font-black text-[10px] uppercase tracking-[0.3em] text-brand-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-8">
             <a href="#overview" className="hover:text-brand-accent transition-colors underline decoration-brand-accent">Partner Overview</a>
             <a href="#atos" className="hover:text-brand-accent transition-colors">ATO Directory</a>
             <a href="#sponsors" className="hover:text-brand-accent transition-colors">Corporate Sponsors</a>
             <a href="#ngo" className="hover:text-brand-accent transition-colors">Gov & NGO</a>
             <a href="#become" className="hover:text-brand-accent transition-colors text-brand-accent">Become a Partner</a>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section id="overview" className="py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-32">
          {CATEGORIES.map((cat, i) => (
            <div 
              key={i} 
              id={cat.title.toLowerCase().includes('training') ? 'atos' : cat.title.toLowerCase().includes('sponsor') ? 'sponsors' : 'ngo'}
              className="group"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12 border-b border-white/5 pb-12">
                <div className="max-w-xl">
                  <span className="text-brand-accent font-black tracking-[0.3em] uppercase text-[9px] mb-4 block">Category {i + 1}</span>
                  <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none">{cat.title}</h2>
                  <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose">{cat.desc}</p>
                </div>
                <button className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent hover:text-white transition-all whitespace-nowrap">
                  PARTNERSHIP BORDER <ExternalLink className="ml-3 w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
                {cat.partners.map((partner, j) => (
                  <motion.div
                    key={j}
                    className="aspect-[4/3] bg-brand-bg flex items-center justify-center p-12 text-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:bg-slate-900/60"
                  >
                    <span className="font-serif font-black text-brand-text text-lg tracking-tighter italic leading-tight">
                      {partner}
                    </span>
                  </motion.div>
                ))}
                <div className="aspect-[4/3] bg-brand-accent/5 flex flex-col items-center justify-center p-8 text-center group/add cursor-pointer border-2 border-dashed border-brand-accent/20 hover:border-brand-accent hover:bg-brand-accent/10 transition-all">
                  <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">Join Network</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* International Relationship */}
      <section className="py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center gap-24">
            <div className="md:w-1/2">
              <div className="accent-border p-1">
                <div className="bg-brand-bg border border-white/5 aspect-square flex flex-col items-center justify-center p-16">
                  <Globe className="w-32 h-32 mb-12 text-brand-accent animate-pulse" />
                  <div className="contents text-center">
                    <span className="text-5xl font-black block leading-none tracking-tighter uppercase mb-4">itSMF</span>
                    <span className="text-3xl font-black block italic font-serif text-brand-accent leading-none">International</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-5xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">SHARED <br />GLOBAL VISION.</h2>
              <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
                As a chartered member of itSMF International, we benchmark against Global 500 standards, ensuring our local ecosystem operates at the highest technical maturity level.
              </p>
              <div className="grid grid-cols-1 gap-12 mb-12">
                <div className="accent-border">
                  <h4 className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2">Accredited Standing</h4>
                  <p className="text-[11px] text-brand-muted uppercase tracking-widest font-bold leading-relaxed">Formally audited and chartered by the International Secretariat.</p>
                </div>
                <div className="accent-border">
                  <h4 className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2">Global Portability</h4>
                  <p className="text-[11px] text-brand-muted uppercase tracking-widest font-bold leading-relaxed">Membership recognized across all major itSMF Global Nodes.</p>
                </div>
              </div>
              <button className="bg-brand-accent text-brand-dark px-12 py-5 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all">
                Visit Global Site
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Question CTA */}
      <section id="become" className="py-32 bg-brand-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <HelpCircle className="w-16 h-16 text-white/5 mx-auto mb-12" />
          <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic font-serif">READY TO <br />INFLUENCE?</h2>
          <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">Whether you are an ATO looking to certify or a corporation seeking strategic placement.</p>
          <a href="mailto:partners@itsmf.zm" className="text-brand-accent font-black text-2xl uppercase tracking-tighter border-b-2 border-brand-accent pb-2 hover:text-white hover:border-white transition-all">
            partners@itsmf.zm
          </a>
        </div>
      </section>
    </div>
  );
}
