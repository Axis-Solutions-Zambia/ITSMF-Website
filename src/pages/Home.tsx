import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';

// ─── Default content (Firestore fallback) ────────────────────────────────────

const HERO_DEFAULTS = {
  headline_line1: 'Shaping',
  headline_line2: "Zambia's",
  headline_line3: 'Digital Future',
  mission_label: 'Our Mission',
  mission_text: '"To professionalize IT Service Management in Zambia through alignment with international standards and national digital transformation goals."',
  cta_primary_label: 'Join Chapter',
  cta_primary_url: '/membership',
  cta_secondary_label: 'View 2026 Summit',
  cta_secondary_url: '/events',
  stats: [
    { label: 'ITIL Certification Gap in National Workforce', value: '82%' },
    { label: 'Estimated Digital Economy Opportunity', value: 'ZMW 12B' },
    { label: 'Corporate Partners Aligning with ISO 20000', value: '45+' },
    { label: 'National Strategy Target Year', value: '2026' }
  ]
};

const OVERVIEW_DEFAULTS = {
  eyebrow: 'Foundations',
  headline: 'ACCELERATING SERVICE MATURITY.',
  body: 'As the authorized voice of ITSM in the Republic, we work at the intersection of international best practice and Zambian economic reality.',
  card_title: 'MEMBER DRIVEN',
  card_body: 'Governance is provided by a board elected directly by our corporate and individual members.',
  image_url: 'https://picsum.photos/seed/zambia-main/800/1000',
};

const EVENTS_DEFAULTS = {
  event1_type: 'Summit',
  event1_title: 'National Conference Livingstone',
  event1_date: 'NOV 2026',
  event2_type: 'Workshop',
  event2_title: 'ITIL 4 Masterclass Lusaka',
  event2_date: 'JUNE 2026',
  event3_type: 'Webinar',
  event3_title: 'Future of ZNB Infrastructure',
  event3_date: 'MAY 2026',
};

// ─── Home Page ───────────────────────────────────────────────────────────────

const TOP_ROW_IMAGES = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1531297172867-622c4314c1e6?w=800&q=80',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
];

const BOTTOM_ROW_IMAGES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80'
];

export default function Home() {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const { content: hero } = usePageContent('home', 'hero', HERO_DEFAULTS as any);
  const { content: overview } = usePageContent('home', 'overview', OVERVIEW_DEFAULTS);
  const { content: eventsContent } = usePageContent('home', 'events', EVENTS_DEFAULTS);

  const upcomingEvents = [
    { type: eventsContent.event1_type, title: eventsContent.event1_title, date: eventsContent.event1_date, hidden: eventsContent['_hide_event1_title'] === 'true' },
    { type: eventsContent.event2_type, title: eventsContent.event2_title, date: eventsContent.event2_date, hidden: eventsContent['_hide_event2_title'] === 'true' },
    { type: eventsContent.event3_type, title: eventsContent.event3_title, date: eventsContent.event3_date, hidden: eventsContent['_hide_event3_title'] === 'true' },
  ].filter(ev => !ev.hidden);

  return (
    <div className="flex flex-col">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <EditableSection pageId="home" sectionId="hero">
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-bg">
          {/* Marquee Background */}
          <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center gap-6 py-12 pointer-events-none opacity-40 dark:opacity-20">
            {/* Top Row - moving left to right */}
            <div className="flex w-max animate-marquee-lr">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-6 pr-6">
                  {TOP_ROW_IMAGES.map((src, i) => (
                    <div key={i} className="w-[280px] md:w-[350px] shrink-0">
                      <img src={src} alt="" className="w-full h-48 md:h-64 object-cover rounded-3xl" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Bottom Row - moving right to left */}
            <div className="flex w-max animate-marquee-rl">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-6 pr-6">
                  {BOTTOM_ROW_IMAGES.map((src, i) => (
                    <div key={i} className="w-[280px] md:w-[350px] shrink-0">
                      <img src={src} alt="" className="w-full h-48 md:h-64 object-cover rounded-3xl" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Gradient Overlays to fade edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-transparent to-brand-bg z-10" />
          </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3"
            >
              <h1 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black leading-[0.85] tracking-tighter uppercase mb-2">
                {hero['_hide_headline_line1'] !== 'true' && <>{hero.headline_line1} <br /></>}
                {hero['_hide_headline_line2'] !== 'true' && <>{hero.headline_line2} <br /></>}
                {hero['_hide_headline_line3'] !== 'true' && hero.headline_line3}
              </h1>
            </motion.div>

            {hero['_hide_mission_text'] !== 'true' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="lg:w-1/3 lg:pl-12 pb-6"
              >
                {hero['_hide_mission_label'] !== 'true' && (
                  <p className="text-xs text-brand-muted uppercase tracking-[0.3em] font-bold mb-6">{hero.mission_label}</p>
                )}
                <p className="text-base leading-snug italic font-serif text-brand-text/90">
                  {hero.mission_text}
                </p>
              </motion.div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 mb-20">
            {hero['_hide_cta_primary_label'] !== 'true' && (
              <Link
                to={hero.cta_primary_url || '/membership'}
                className="bg-brand-accent text-brand-dark px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-brand-text transition-all shadow-xl"
              >
                {hero.cta_primary_label}
              </Link>
            )}
            {hero['_hide_cta_secondary_label'] !== 'true' && (
              <Link
                to={hero.cta_secondary_url || '/events'}
                className="bg-transparent border border-brand-text/20 text-brand-text px-10 py-5 font-black text-xs uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-all"
              >
                {hero.cta_secondary_label}
              </Link>
            )}
          </div>

          {/* Statistics Grid */}
          {hero['_hide_stats'] !== 'true' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {((hero as any).stats || HERO_DEFAULTS.stats).map((stat: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="accent-border"
                >
                  <div className="text-3xl lg:text-4xl font-black font-mono tracking-tighter mb-2">{stat.value}</div>
                  <div className="text-[10px] lg:text-[11px] uppercase tracking-wider text-brand-muted font-bold leading-tight max-w-[140px]">
                    {stat.label.split(' ').map((word: string, idx: number) => (
                      <span key={idx} className="inline-block mr-1">{word}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      </EditableSection>

      {/* ─── Chapter Overview ─────────────────────────────────────────────── */}
      <EditableSection pageId="home" sectionId="overview">
      <section className="py-16 lg:py-20 bg-brand-dark border-y border-brand-text/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              {overview['_hide_eyebrow'] !== 'true' && (
                <span className="text-brand-accent font-black tracking-[0.3em] uppercase text-xs mb-6 block">{overview.eyebrow}</span>
              )}
              {overview['_hide_headline'] !== 'true' && (
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1]">
                  {overview.headline}
                </h2>
              )}
              {overview['_hide_body'] !== 'true' && (
                <p className="text-lg text-brand-muted mb-10 font-medium leading-relaxed">
                  {overview.body}
                </p>
              )}

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
              {overview['_hide_image_url'] !== 'true' && (
                <div className="aspect-[4/5] bg-slate-800 border border-brand-text/10 p-2 grayscale">
                  <img
                    src={overview.image_url || 'https://picsum.photos/seed/zambia-main/800/1000'}
                    alt="Zambia Digital Transformation"
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              {(overview['_hide_card_title'] !== 'true' || overview['_hide_card_body'] !== 'true') && (
                <div className="absolute -bottom-10 -right-10 bg-brand-accent p-12 text-brand-dark max-w-[280px]">
                  <div className="text-4xl font-black font-mono mb-4 italic">01.</div>
                  {overview['_hide_card_title'] !== 'true' && <h3 className="text-xl font-black uppercase tracking-tighter leading-none mb-4">{overview.card_title}</h3>}
                  {overview['_hide_card_body'] !== 'true' && <p className="text-xs font-bold uppercase tracking-widest leading-loose">{overview.card_body}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* ─── Call to Events ───────────────────────────────────────────────── */}
      <EditableSection pageId="home" sectionId="events">
      <section className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-brand-text mb-3">What's happening?</h2>
          <p className="text-brand-muted text-sm md:text-base">Join us at our upcoming chapter events and summits</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Desktop Grid View */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {upcomingEvents.map((ev, i) => {
              const bgImages = [
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
                'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
                'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80'
              ];
              
              return (
                <Link to="/events" key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/5] block cursor-pointer shadow-lg">
                  <div className="absolute inset-0">
                    <img src={bgImages[i % 3]} alt={ev.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-xl text-center w-full break-words">
                      {ev.type}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-1">{ev.date}</div>
                    <div className="text-white text-lg font-bold leading-snug">{ev.title}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setActiveEventIndex(prev => prev === 0 ? upcomingEvents.length - 1 : prev - 1)}
                className="p-2 rounded-full border border-brand-text/10 bg-brand-bg hover:bg-brand-text/5 text-brand-text shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex-1 px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEventIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {upcomingEvents[activeEventIndex] && (() => {
                      const ev = upcomingEvents[activeEventIndex];
                      const bgImages = [
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
                        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
                        'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80'
                      ];
                      
                      return (
                        <Link to="/events" className="group relative rounded-3xl overflow-hidden aspect-[4/5] block shadow-xl">
                          <div className="absolute inset-0">
                            <img src={bgImages[activeEventIndex % 3]} alt={ev.type} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center p-4">
                            <h3 className="text-5xl font-black text-white uppercase tracking-tight drop-shadow-2xl text-center w-full break-words">
                              {ev.type}
                            </h3>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                            <div className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-1">{ev.date}</div>
                            <div className="text-white text-lg font-bold leading-snug">{ev.title}</div>
                          </div>
                        </Link>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                onClick={() => setActiveEventIndex(prev => prev === upcomingEvents.length - 1 ? 0 : prev + 1)}
                className="p-2 rounded-full border border-brand-text/10 bg-brand-bg hover:bg-brand-text/5 text-brand-text shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Carousel Dots */}
            <div className="flex justify-center items-center space-x-3 mt-6">
              {upcomingEvents.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveEventIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeEventIndex 
                      ? 'w-2.5 h-2.5 bg-blue-600 dark:bg-blue-500' 
                      : 'w-2 h-2 bg-brand-text/20 hover:bg-brand-text/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
