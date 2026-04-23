import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, BookOpen, Calendar, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-bg">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3"
            >
              <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-2">
                Shaping <br/> 
                <span className="text-transparent text-stroke">Zambia's</span> <br/> 
                Digital Future
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:w-1/3 lg:pl-12 pb-6"
            >
              <p className="text-xs text-brand-muted uppercase tracking-[0.3em] font-bold mb-6">Our Mission</p>
              <p className="text-xl leading-snug italic font-serif text-brand-text/90">
                "To professionalize IT Service Management in Zambia through alignment with international standards and national digital transformation goals."
              </p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6 mb-20">
             <Link
                to="/membership"
                className="bg-brand-accent text-brand-dark px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl"
              >
                Join Chapter
              </Link>
              <Link
                to="/events"
                className="bg-transparent border border-white/20 text-white px-10 py-5 font-black text-xs uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-all"
              >
                View 2026 Summit
              </Link>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'ITIL Certification Gap in National Workforce', value: '82%' },
              { label: 'Estimated Digital Economy Opportunity', value: 'ZMW 12B' },
              { label: 'Corporate Partners Aligning with ISO 20000', value: '45+' },
              { label: 'National Strategy Target Year', value: '2026' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="accent-border"
              >
                <div className="text-4xl lg:text-5xl font-black font-mono tracking-tighter mb-2">{stat.value}</div>
                <div className="text-[10px] lg:text-[11px] uppercase tracking-wider text-brand-muted font-bold leading-tight max-w-[140px]">
                  {stat.label.split(' ').map((word, idx) => (
                    <span key={idx} className="inline-block mr-1">{word}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Overview */}
      <section className="py-32 bg-brand-dark border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-brand-accent font-black tracking-[0.3em] uppercase text-xs mb-8 block">Foundations</span>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9]">ACCELERATING <br/>SERVICE <br/>MATURITY.</h2>
              <p className="text-lg text-brand-muted mb-10 font-medium leading-relaxed">
                As the authorized voice of ITSM in the Republic, we work at the intersection of international best practice and Zambian economic reality.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'Governance', desc: 'Standardizing frameworks for Zambian enterprise.' },
                  { title: 'Growth', desc: 'Increasing the density of certified professionals.' },
                  { title: 'Advocacy', desc: 'Bridging the policy gap with MICT & ZNB.' },
                  { title: 'Network', desc: 'Connecting the minds that power our systems.' }
                ].map((feature, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-sm font-black uppercase tracking-widest text-brand-text">{feature.title}</h4>
                    <p className="text-xs text-brand-muted leading-relaxed uppercase tracking-wider font-bold opacity-70">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] bg-slate-800 border border-white/10 p-2 grayscale">
                 <img 
                  src="https://picsum.photos/seed/zambia-main/800/1000" 
                  alt="Zambia Digital Transformation" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-accent p-12 text-brand-dark max-w-[280px]">
                <div className="text-4xl font-black font-mono mb-4 italic">01.</div>
                <h3 className="text-xl font-black uppercase tracking-tighter leading-none mb-4">MEMBER<br/>DRIVEN</h3>
                <p className="text-xs font-bold uppercase tracking-widest leading-loose">
                  Governance is provided by a board elected directly by our corporate and individual members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Events */}
      <section className="py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          <h2 className="text-7xl md:text-[10vw] font-black italic text-transparent text-stroke mb-8 uppercase">HAPPENING</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { type: 'Summit', title: 'National Conference Livingstone', date: 'NOV 2026' },
              { type: 'Workshop', title: 'ITIL 4 Masterclass Lusaka', date: 'JUNE 2026' },
              { type: 'Webinar', title: 'Future of ZNB Infrastructure', date: 'MAY 2026' }
            ].map((ev, i) => (
              <div key={i} className="bg-slate-900/50 border border-white/5 p-10 text-left hover:border-brand-accent transition-all group">
                <div className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-4">{ev.type}</div>
                <h3 className="text-2xl font-black mb-6 leading-none italic font-serif">{ev.title}</h3>
                <div className="flex justify-between items-end">
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-muted">{ev.date}</div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-accent transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:text-brand-dark" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
