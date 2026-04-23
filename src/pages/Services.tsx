import { motion } from 'motion/react';
import { BookOpen, Users, Zap, Briefcase, Filter, ArrowUpRight, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES_LIST = [
  {
    title: 'Certification Pathways',
    desc: 'Official itSMF-recognized pathways for ITIL 4, ISO/IEC 20000, and VeriSM certifications in Zambia.',
    icon: BookOpen,
    category: 'Education'
  },
  {
    title: 'Community Education',
    desc: 'Free and subsidized monthly webinars and technical workshops for local practitioners.',
    icon: Users,
    category: 'Advocacy'
  },
  {
    title: 'ITSM Consultancy',
    desc: 'Strategic advisory for organizations looking to implement or refine their service management frameworks.',
    icon: Briefcase,
    category: 'Consultancy'
  },
  {
    title: 'Mentorship Programme',
    desc: 'Connecting early-career professionals with industry veterans for structured career guidance.',
    icon: Zap,
    category: 'Development'
  },
  {
    title: 'ATO Partner Directory',
    desc: 'Find Accredited Training Organizations authorized to deliver itSMF courses in Zambia.',
    icon: Filter,
    category: 'Network'
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-brand-dark py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-[8vw] font-black leading-[0.8] mb-10 uppercase tracking-tighter italic">ELEVATING <br /><span className="text-transparent text-stroke">STANDARDS</span>.</h1>
            <p className="text-xl text-brand-muted max-w-2xl leading-relaxed uppercase tracking-wider font-bold opacity-80 decoration-brand-accent underline underline-offset-8">
              Professional services designed to professionalize the Zambian ICT workforce and align local industry with global benchmarks.
            </p>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 text-[20vw] font-black text-white/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          OFFERING
        </div>
      </section>

      {/* Benchmarking Feature (The "Amber Highlighted" section) */}
      <section className="py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-brand-accent p-12 lg:p-20 text-brand-dark relative group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-6 block">Strategic Initiative</span>
                <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-none italic font-serif">ITIL PERFORMANCE <br/>BENCHMARKING.</h2>
                <p className="text-sm font-bold uppercase tracking-widest leading-loose mb-12 opacity-80 decoration-brand-dark/20 underline underline-offset-8">
                  The primary tool for measuring your organizational IT maturity against national and international peers.
                </p>
                <Link 
                  to="/services/benchmarking"
                  className="inline-flex items-center bg-brand-dark text-white px-10 py-5 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-brand-dark shadow-2xl transition-all"
                >
                  ENTER THE MODEL <ArrowUpRight className="ml-3 w-5 h-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square bg-brand-dark/10 border border-brand-dark/20 flex items-center justify-center">
                  <BarChart3 className="w-48 h-48 opacity-20" />
                </div>
                <div className="absolute -bottom-8 -right-8 p-8 bg-brand-dark text-brand-accent font-black text-4xl italic font-serif">
                  2026
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BarChart3 className="w-64 h-64 rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="directory" className="py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
            {SERVICES_LIST.map((service, i) => (
              <div 
                key={i} 
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                className="bg-brand-dark p-12 lg:p-16 flex flex-col group hover:bg-brand-bg transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-6xl italic pointer-events-none group-hover:text-brand-accent/10 transition-colors">
                  0{i + 1}
                </div>
                <div className="mb-12">
                  <service.icon className="w-10 h-10 text-brand-accent mb-8" />
                  <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] font-mono mb-4 block">{service.category}</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic font-serif leading-none mb-6">{service.title}</h3>
                  <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose">{service.desc}</p>
                </div>
                <div className="mt-auto pt-8 border-t border-white/5">
                  <button className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-text hover:text-brand-accent transition-colors flex items-center">
                    LEARN MORE <ArrowUpRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Link CTA */}
      <section className="py-32 bg-brand-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic font-serif">BECOME A PROVIDER.</h2>
          <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
            Are you an ATO or consultancy looking to be listed in our official services directory?
          </p>
          <Link to="/partners" className="text-brand-accent font-black text-2xl uppercase tracking-tighter border-b-2 border-brand-accent pb-2 hover:text-white hover:border-white transition-all">
            strategic.partnerships@itsmf.zm
          </Link>
        </div>
      </section>
    </div>
  );
}
