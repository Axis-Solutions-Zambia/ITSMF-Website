import { motion } from 'motion/react';
import { BookOpen, Users, Zap, Briefcase, Filter, ArrowUpRight, BarChart3, Target, Server, Network, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';

const ICONS: Record<string, any> = {
  BookOpen, Users, Zap, Briefcase, Filter, Target, Server, Network
};

// ─── Default content (Firestore fallback) ────────────────────────────────────
const HERO_DEFAULTS = {
  headline_line1: 'ELEVATING',
  headline_line2: 'STANDARDS.',
  body: 'Professional services designed to professionalize the Zambian ICT workforce and align local industry with global benchmarks.',
  watermark: 'OFFERING'
};

const BENCHMARKING_DEFAULTS = {
  eyebrow: 'Strategic Initiative',
  headline_line1: 'ITIL PERFORMANCE',
  headline_line2: 'BENCHMARKING.',
  body: 'The primary tool for measuring your organizational IT maturity against national and international peers.',
  btn_label: 'ENTER THE MODEL',
  year_watermark: '2026'
};

const DIRECTORY_DEFAULTS = {
  services_list: [
    {
      title: 'Certification Pathways',
      desc: 'Official itSMF-recognized pathways for ITIL 4, ISO/IEC 20000, and VeriSM certifications in Zambia.',
      category: 'Education'
    },
    {
      title: 'Community Education',
      desc: 'Free and subsidized monthly webinars and technical workshops for local practitioners.',
      category: 'Advocacy'
    },
    {
      title: 'ITSM Consultancy',
      desc: 'Strategic advisory for organizations looking to implement or refine their service management frameworks.',
      category: 'Consultancy'
    },
    {
      title: 'Mentorship Programme',
      desc: 'Connecting early-career professionals with industry veterans for structured career guidance.',
      category: 'Development'
    },
    {
      title: 'ATO Partner Directory',
      desc: 'Find Accredited Training Organizations authorized to deliver itSMF courses in Zambia.',
      category: 'Network'
    }
  ]
};

const BECOME_DEFAULTS = {
  headline: 'BECOME A PROVIDER.',
  desc: 'Are you an ATO or consultancy looking to be listed in our official services directory?',
  contact_email: 'strategic.partnerships@itsmf.zm'
};

// Fallback icons array matching original defaults in case names don't match or are missing
const FALLBACK_ICONS = [BookOpen, Users, Briefcase, Zap, Filter, Target];

export default function Services() {
  const { content: hero } = usePageContent('services', 'hero', HERO_DEFAULTS);
  const { content: benchmarking } = usePageContent('services', 'benchmarking', BENCHMARKING_DEFAULTS);
  const { content: directory } = usePageContent('services', 'directory', DIRECTORY_DEFAULTS as any);
  const { content: become } = usePageContent('services', 'become', BECOME_DEFAULTS);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <EditableSection pageId="services" sectionId="hero">
<section className="bg-brand-dark py-32 border-b border-brand-text/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {(hero['_hide_headline_line1'] !== 'true' || hero['_hide_headline_line2'] !== 'true') && (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-10 uppercase tracking-tighter italic">
                {hero['_hide_headline_line1'] !== 'true' && <>{hero.headline_line1} <br /></>}
                {hero['_hide_headline_line2'] !== 'true' && <span className="text-brand-text">{hero.headline_line2}</span>}
              </h1>
            )}
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 text-[20vw] font-black text-brand-text/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          {hero.watermark}
        </div>
      </section>
      </EditableSection>

      {/* Benchmarking Feature (The "Amber Highlighted" section) */}
      <EditableSection pageId="services" sectionId="benchmarking">
<section className="py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-brand-accent p-12 lg:p-20 text-brand-dark relative group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                {benchmarking['_hide_eyebrow'] !== 'true' && <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-6 block">{benchmarking.eyebrow}</span>}
                {(benchmarking['_hide_headline_line1'] !== 'true' || benchmarking['_hide_headline_line2'] !== 'true') && (
                  <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-none italic font-serif">
                    {benchmarking['_hide_headline_line1'] !== 'true' && <>{benchmarking.headline_line1} <br/></>}
                    {benchmarking['_hide_headline_line2'] !== 'true' && benchmarking.headline_line2}
                  </h2>
                )}
                {benchmarking['_hide_body'] !== 'true' && (
                  <p className="text-sm font-bold uppercase tracking-widest leading-loose mb-12 opacity-80 decoration-brand-dark/20 underline underline-offset-8">
                    {benchmarking.body}
                  </p>
                )}
                {benchmarking['_hide_btn_label'] !== 'true' && (
                  <Link 
                    to="/services/benchmarking"
                    className="inline-flex items-center bg-brand-dark text-brand-text px-10 py-5 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-brand-text hover:text-brand-bg shadow-2xl transition-all"
                  >
                    {benchmarking.btn_label} <ArrowUpRight className="ml-3 w-5 h-5" />
                  </Link>
                )}
              </div>
              <div className="hidden lg:block relative">
                <div className="aspect-square bg-brand-dark/10 border border-brand-dark/20 flex items-center justify-center">
                  <BarChart3 className="w-48 h-48 opacity-20" />
                </div>
                {benchmarking['_hide_year_watermark'] !== 'true' && (
                  <div className="absolute -bottom-8 -right-8 p-8 bg-brand-dark text-brand-accent font-black text-4xl italic font-serif">
                    {benchmarking.year_watermark}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BarChart3 className="w-64 h-64 rotate-12" />
            </div>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* Services Grid */}
      <EditableSection pageId="services" sectionId="directory">
<section id="directory" className="py-32 bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {directory['_hide_services_list'] !== 'true' && (
            <div className="relative group/carousel -mx-6 px-6 sm:-mx-10 sm:px-10 md:mx-0 md:px-0">
              {/* Mobile Arrows */}
              <button 
                onClick={() => scroll('left')} 
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 md:hidden bg-brand-bg border border-brand-text/10 rounded-full shadow-xl hover:text-brand-accent transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 text-brand-text" />
              </button>
              <button 
                onClick={() => scroll('right')} 
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 md:hidden bg-brand-bg border border-brand-text/10 rounded-full shadow-xl hover:text-brand-accent transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 text-brand-text" />
              </button>

              <div 
                ref={scrollRef}
                className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-px bg-transparent md:bg-brand-text/5 md:border md:border-brand-text/5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {(directory.services_list as unknown as any[]).map((service, i) => {
                  const Icon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
                  return (
                    <div 
                      key={i} 
                      id={service.title.toLowerCase().replace(/\s+/g, '-')}
                      className="w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-center bg-brand-dark p-12 lg:p-16 flex flex-col group hover:bg-brand-bg transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-8 text-brand-text/5 font-black text-6xl italic pointer-events-none group-hover:text-brand-accent/10 transition-colors">
                        0{i + 1}
                      </div>
                      <div className="mb-12">
                        <Icon className="w-10 h-10 text-brand-accent mb-8" />
                        <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] font-mono mb-4 block">{service.category}</span>
                        <h3 className="text-2xl font-black uppercase tracking-tighter italic font-serif leading-none mb-6">{service.title}</h3>
                        <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose">{service.desc}</p>
                      </div>
                      <div className="mt-auto pt-8 border-t border-brand-text/5">
                        <button className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-text hover:text-brand-accent transition-colors flex items-center">
                          LEARN MORE <ArrowUpRight className="ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      </EditableSection>

      {/* Partners Link CTA */}
      <EditableSection pageId="services" sectionId="become">
<section className="py-32 bg-brand-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          {become['_hide_headline'] !== 'true' && <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic font-serif">{become.headline}</h2>}
          {become['_hide_desc'] !== 'true' && (
            <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
              {become.desc}
            </p>
          )}
          {become['_hide_contact_email'] !== 'true' && (
            <Link to="/partners" className="text-brand-accent font-black text-2xl uppercase tracking-tighter border-b-2 border-brand-accent pb-2 hover:text-brand-text hover:border-brand-text transition-all">
              {become.contact_email}
            </Link>
          )}
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
