import { motion } from 'motion/react';
import { BookOpen, FileText, Download, Play, MessageSquare, Lightbulb, UserPlus, ArrowUpRight } from 'lucide-react';

const RESOURCES = [
  {
    title: 'The Zambia ITSM Roadmap 2026',
    type: 'Guide',
    category: 'Certification',
    desc: 'A comprehensive pathway for IT professionals aligning with National Digital Strategy.',
    icon: BookOpen,
    color: 'bg-blue-500'
  },
  {
    title: 'Incident Management in Banking',
    type: 'Case Study',
    category: 'Zambian Context',
    desc: 'How a leading commercial bank reduced downtime by 40% using ITIL v4 principles.',
    icon: Lightbulb,
    color: 'bg-orange-500'
  }
];

export default function Resources() {
  return (
    <div className="pt-20">
      <section className="bg-brand-bg py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">Knowledge Repository</span>
            <h1 className="text-6xl md:text-[8vw] font-black mb-12 uppercase tracking-tighter italic leading-[0.8]">INTELLECTUAL <br /><span className="text-transparent text-stroke">CAPITAL</span>.</h1>
            <p className="text-xl text-brand-muted max-w-2xl leading-relaxed uppercase tracking-wider font-bold opacity-80 decoration-brand-accent underline underline-offset-8">
              Curated ITSM tools, regional benchmarks, and exclusive mentorship pathways for the Zambian tech elite.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 text-[15vw] font-black text-white/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          ARCHIVE
        </div>
      </section>

      {/* Certification Guides */}
      <section id="certification-guides" className="py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic font-serif">PATHWAYS.</h2>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent flex items-center hover:text-white cursor-pointer transition-colors group">
              View Global Guide <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1px bg-white/10 border border-white/10">
            {[
              { name: 'ITIL 4 Foundation', levels: 'Core Practitioner', time: '1-2 Months' },
              { name: 'ITIL Specialist', levels: 'Professional Strategic', time: '3-6 Months' },
              { name: 'ISO/IEC 20000', levels: 'Framework Lead', time: 'Fixed/Ongoing' },
              { name: 'VeriSM Specialist', levels: 'Active Management', time: '2-4 Months' }
            ].map((path, i) => (
              <div key={i} className="bg-brand-dark p-10 hover:bg-slate-900/60 transition-all duration-500">
                <div className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-4 font-mono">{path.levels}</div>
                <h4 className="font-serif italic font-black text-2xl mb-8 leading-tight tracking-tight">{path.name}</h4>
                <div className="flex items-center text-brand-muted text-[10px] font-bold uppercase tracking-widest">
                  <Play className="w-3 h-3 mr-3 text-brand-accent fill-current" /> est. {path.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid: Blog + Case Studies */}
      <section id="case-studies" className="py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            
            {/* Blog & Thought Leadership */}
            <div className="lg:col-span-2 space-y-24">
              <div id="blog">
                <h2 className="text-5xl font-black uppercase tracking-tighter italic font-serif text-transparent text-stroke mb-12">BLOG & ARTICLES</h2>
                <div className="space-y-16">
                  {[
                    {
                      title: 'Sustainable ITSM: The Green Frontier for ZNB Architecture',
                      author: 'Isaac Banda',
                      date: '12 MAR 2026',
                      excerpt: 'Exploring how IT service frameworks can directly contribute to environmental sustainability goals in Zambia.'
                    }
                  ].map((post, i) => (
                    <div key={i} className="group accent-border pb-8 cursor-pointer">
                      <div className="flex items-center text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] font-mono mb-6 space-x-6">
                        <span className="bg-white/5 px-2 py-1">JOURNAL</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none group-hover:text-brand-accent transition-colors">{post.title}</h3>
                      <p className="text-xs text-brand-muted font-bold uppercase tracking-widest leading-loose max-w-2xl mb-8 opacity-80">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.3em] text-brand-text group/more">
                        <span>READ FULL ANALYSIS</span>
                        <ArrowUpRight className="w-4 h-4 text-brand-accent group-hover/more:translate-x-1 group-hover/more:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="thought-leadership" className="pt-24 border-t border-white/5">
                <h2 className="text-5xl font-black uppercase tracking-tighter italic font-serif text-transparent text-stroke mb-12">THOUGHT LEADERSHIP</h2>
                {[
                  {
                    title: 'Beyond the Ticket: Human-Centric Service Design',
                    author: 'Mary Kalinda',
                    date: '28 FEB 2026',
                    excerpt: 'Why empathy mapping is becoming the most critical tool for the modern Zambian service desk manager.'
                  }
                ].map((post, i) => (
                  <div key={i} className="group accent-border pb-8 cursor-pointer">
                    <div className="flex items-center text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] font-mono mb-6 space-x-6">
                      <span className="bg-white/5 px-2 py-1">LEADERSHIP</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none group-hover:text-brand-accent transition-colors">{post.title}</h3>
                    <p className="text-xs text-brand-muted font-bold uppercase tracking-widest leading-loose max-w-2xl mb-8 opacity-80">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Studies & Whitepapers */}
            <div className="space-y-24">
              <div id="case-studies">
                <h3 className="text-[10px] font-black text-brand-muted uppercase tracking-[0.4em] mb-8 flex items-center">
                   Featured Case Studies
                </h3>
                <div className="space-y-4">
                  {RESOURCES.filter(r => r.type === 'Case Study').map((res, i) => (
                    <div key={i} className="p-8 bg-brand-dark border border-white/5 hover:border-brand-accent/50 transition-all cursor-pointer group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                      <div className="flex justify-between items-start mb-6">
                        <res.icon className="w-6 h-6 text-brand-accent" />
                        <Download className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                      </div>
                      <h4 className="font-serif italic font-black text-lg mb-2 uppercase tracking-tighter leading-tight">{res.title}</h4>
                      <p className="text-[9px] text-brand-muted uppercase tracking-[0.2em] font-black opacity-60 font-mono">{res.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="whitepapers">
                <h3 className="text-[10px] font-black text-brand-muted uppercase tracking-[0.4em] mb-8 mt-12 flex items-center">
                   Whitepapers
                </h3>
                <div className="space-y-4">
                  {RESOURCES.filter(r => r.type === 'Guide').map((res, i) => (
                    <div key={i} className="p-8 bg-brand-dark border border-white/5 hover:border-brand-accent/50 transition-all cursor-pointer group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                      <div className="flex justify-between items-start mb-6">
                        <res.icon className="w-6 h-6 text-brand-accent" />
                        <Download className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                      </div>
                      <h4 className="font-serif italic font-black text-lg mb-2 uppercase tracking-tighter leading-tight">{res.title}</h4>
                      <p className="text-[9px] text-brand-muted uppercase tracking-[0.2em] font-black opacity-60 font-mono">{res.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-accent p-12 lg:p-16 text-brand-dark relative group overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic font-serif">FELLOWSHIP</h3>
                  <p className="text-sm font-bold uppercase tracking-widest leading-loose mb-12 opacity-80">Connect with the veterans of the industry. Direct pathways to mentorship.</p>
                  <button className="w-full bg-brand-dark text-white py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-brand-dark shadow-2xl transition-all">
                    Apply to Program
                  </button>
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-1000 rotate-12">
                  <MessageSquare className="w-48 h-48" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Knowledge Vault */}
      <section className="py-32 bg-brand-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div id="glossary">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">ITSM GLOSSARY.</h3>
              <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-loose mb-8">
                Master the terminology of modern service management. From 'SLA' to 'Value Stream'.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-brand-accent hover:text-brand-accent transition-colors">Open Dictionary</button>
            </div>
            <div id="videos">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">VIDEO LIBRARY.</h3>
              <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-loose mb-8">
                Workshop recordings, webinars, and technical deep-dives from our international summits.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-brand-accent hover:text-brand-accent transition-colors">Browse media</button>
            </div>
            <div id="newsletters">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">NEWSLETTERS.</h3>
              <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-loose mb-8">
                The chapter's monthly intelligence briefing archive dating back to 2018.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-brand-accent hover:text-brand-accent transition-colors">Access Archive</button>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Archive */}
      <section id="governance" className="py-32 bg-brand-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div id="reports">
              <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">ANNUAL <br />REPORTS.</h2>
              <div className="grid grid-cols-2 gap-4">
                 {[2025, 2024, 2023, 2022].map(year => (
                   <div key={year} className="bg-brand-bg border border-white/5 p-8 hover:border-brand-accent transition-all cursor-pointer group">
                      <FileText className="w-6 h-6 text-brand-accent mb-4" />
                      <span className="text-xl font-black italic font-serif uppercase tracking-tighter">{year} REPORT</span>
                   </div>
                 ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">CHAPTER <br />BYLAWS.</h2>
              <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
                Our governance framework regulates all member activities, ethical standards, and professional conduct across the chapter.
              </p>
              <div className="space-y-4">
                 <div className="p-8 bg-brand-bg border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-slate-900/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Code of Ethics 2026.PDF</span>
                    <Download className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                 </div>
                 <div className="p-8 bg-brand-bg border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-slate-900/40">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] font-sans">Chapter Constitution v2.PDF</span>
                    <Download className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
