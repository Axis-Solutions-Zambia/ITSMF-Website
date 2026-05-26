import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';
import { PageSkeleton } from '@/src/components/PageSkeleton';

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
  headline: 'Chapter Overview.',
  accordion_items: [
    {
      title: 'Governance',
      content: 'Standardizing frameworks for Zambian enterprise. Governance is provided by a board elected directly by our corporate and individual members.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
    },
    {
      title: 'Growth',
      content: 'Increasing the density of certified professionals across the Republic through structured mentorship and exams.',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80'
    },
    {
      title: 'Advocacy',
      content: 'Bridging the policy gap with MICT and ZNB. As the authorized voice of ITSM in the Republic, we work at the intersection of international best practice and Zambian economic reality.',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80'
    },
    {
      title: 'Network',
      content: 'Connecting the minds that power our systems through networking events, summits, and local chapters.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
    }
  ]
};

const EVENTS_DEFAULTS = {
  event_list: [
    {
      eyebrow: 'Summit',
      title: 'National Conference Livingstone',
      desc: 'Join industry leaders to discuss the future of ITSM and upcoming frameworks for 2026.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      link: '/events'
    },
    {
      eyebrow: 'Workshop',
      title: 'ITIL 4 Masterclass Lusaka',
      desc: 'A comprehensive deep-dive into ITIL 4 Foundation and advanced practices.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      link: '/events'
    },
    {
      eyebrow: 'Webinar',
      title: 'Future of ZNB Infrastructure',
      desc: 'Online session exploring the digital transformation journey of the national bank.',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
      link: '/events'
    }
  ]
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
  const { content: hero, loading: heroLoading } = usePageContent('home', 'hero', HERO_DEFAULTS as any);
  const { content: heroMedia, loading: heroMediaLoading } = usePageContent('home', 'hero_media');
  const { content: overview, loading: overviewLoading } = usePageContent('home', 'overview', OVERVIEW_DEFAULTS as any);
  const { content: eventsContent, loading: eventsLoading } = usePageContent('home', 'events', EVENTS_DEFAULTS as any);

  const isLoading = heroLoading || heroMediaLoading || overviewLoading || eventsLoading;

  const topImages = Array.isArray(heroMedia.top_images) && heroMedia.top_images.length ? (heroMedia.top_images as unknown as any[]).map(img => img.image) : TOP_ROW_IMAGES;
  const bottomImages = Array.isArray(heroMedia.bottom_images) && heroMedia.bottom_images.length ? (heroMedia.bottom_images as unknown as any[]).map(img => img.image) : BOTTOM_ROW_IMAGES;

  const eventsList = Array.isArray(eventsContent.event_list) && eventsContent.event_list.length > 0 
    ? eventsContent.event_list 
    : EVENTS_DEFAULTS.event_list;

  const headerRef = useRef<HTMLHeadingElement>(null);
  const eventsScrollRef = useRef<HTMLDivElement>(null);
  const [carouselPadding, setCarouselPadding] = useState(24); // Default to px-6 equivalent
  const [activeAccordion, setActiveAccordion] = useState<number>(0);

  useEffect(() => {
    const updatePadding = () => {
      if (headerRef.current) {
        setCarouselPadding(headerRef.current.getBoundingClientRect().left);
      }
    };
    
    // Initial calculation
    updatePadding();
    
    // Small timeout to ensure fonts/layouts are fully rendered
    const timeoutId = setTimeout(updatePadding, 100);
    
    window.addEventListener('resize', updatePadding);
    return () => {
      window.removeEventListener('resize', updatePadding);
      clearTimeout(timeoutId);
    };
  }, []);
  
  const scrollEvents = (direction: 'left' | 'right') => {
    if (eventsScrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 320;
      eventsScrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="flex flex-col">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <EditableSection pageId="home" sectionId="hero">
        <section className="relative min-h-fit md:min-h-screen flex items-center pt-32 pb-12 md:pt-20 md:pb-0 overflow-hidden bg-brand-bg">
          {/* Marquee Background */}
          <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center gap-6 py-12 pointer-events-none opacity-40 dark:opacity-20">
            {/* Top Row - moving left to right */}
            <div className="flex w-max animate-marquee-lr">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-6 pr-6">
                  {topImages.map((src, i) => (
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
                  {bottomImages.map((src, i) => (
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
          <div className="flex flex-col lg:flex-row justify-between items-end mb-10 md:mb-16 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-4">
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
                className="hidden md:block lg:w-1/3 lg:pl-12 pb-6"
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
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-16 md:mb-20">
            {hero['_hide_cta_primary_label'] !== 'true' && (
              <Link
                to={hero.cta_primary_url || '/membership'}
                className="bg-brand-accent text-brand-dark px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-brand-text transition-all shadow-xl w-full sm:w-auto text-center"
              >
                {hero.cta_primary_label}
              </Link>
            )}
            {hero['_hide_cta_secondary_label'] !== 'true' && (
              <Link
                to={hero.cta_secondary_url || '/events'}
                className="bg-transparent border border-brand-text/20 text-brand-text px-10 py-5 font-black text-xs uppercase tracking-widest hover:border-brand-accent hover:text-brand-accent transition-all w-full sm:w-auto text-center"
              >
                {hero.cta_secondary_label}
              </Link>
            )}
          </div>

          {/* Statistics Grid */}
          {hero['_hide_stats'] !== 'true' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8">
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

      {/* ─── Chapter Overview (Apple-Style Accordion) ─────────────────────── */}
      <EditableSection pageId="home" sectionId="overview">
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          
          {/* Main Section Headline */}
          {overview['_hide_headline'] !== 'true' && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-12">
              {overview.headline}
            </h2>
          )}

          {/* Accordion Card */}
          <div className="bg-[#F5F5F7] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16">
            <div className="flex flex-col gap-0 divide-y divide-gray-300/60">
              {((overview as any).accordion_items || OVERVIEW_DEFAULTS.accordion_items).map((item: any, i: number) => {
                const isActive = activeAccordion === i;
                
                return (
                  <div key={i} className="py-6 first:pt-0 last:pb-0">
                    {/* Header Button */}
                    <button
                      onClick={() => setActiveAccordion(isActive ? -1 : i)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 transition-colors">
                        {item.title}
                      </h3>
                      <div className="ml-4 shrink-0 text-gray-500 group-hover:text-gray-900 transition-colors">
                        {isActive ? (
                          <ChevronUp className="w-8 h-8" strokeWidth={2.5} />
                        ) : (
                          <ChevronDown className="w-8 h-8" strokeWidth={2.5} />
                        )}
                      </div>
                    </button>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6">
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                              {item.content}
                            </p>
                            
                            {item.image && (
                              <div className="mt-8 md:mt-12 w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-gray-200">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-auto object-cover object-center max-h-[500px]"
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* ─── Call to Events (Apple-Style Carousel) ────────────────────────── */}
      <EditableSection pageId="home" sectionId="events">
      <section className="py-16 md:py-20 bg-[#F5F5F7] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-left mb-8 md:mb-10">
          <h2 
            ref={headerRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-3xl mb-4"
          >
            What's happening?
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl">
            Join us at our upcoming chapter events and summits.
          </p>
        </div>
        
        <div className="relative">
          {/* Scrollable Container */}
          <div 
            ref={eventsScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-[padding] duration-300"
            style={{
              paddingLeft: `${carouselPadding}px`,
              paddingRight: `${carouselPadding}px`,
              scrollPaddingLeft: `${carouselPadding}px`
            }}
          >
            {(eventsList as any[]).map((ev, i) => (
              <Link 
                to={ev.link || '/events'} 
                key={i} 
                className="snap-start shrink-0 w-[85vw] sm:w-[360px] md:w-[400px] aspect-[4/5] bg-white rounded-[2rem] p-8 flex flex-col relative group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Content Top */}
                <div className="relative z-10 flex flex-col items-start mb-6">
                  {ev.eyebrow && <span className="text-[10px] md:text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">{ev.eyebrow}</span>}
                  {ev.title && <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3">{ev.title}</h3>}
                  {ev.desc && <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-[90%]">{ev.desc}</p>}
                </div>

                {/* Image Bottom */}
                {ev.image && (
                  <div className="flex-1 w-full relative mt-auto flex items-end justify-center rounded-2xl overflow-hidden">
                    <img 
                      src={ev.image} 
                      alt={ev.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                )}

                {/* Plus Icon Button */}
                <div className="absolute bottom-8 right-8 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-black transition-all">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.25 6.25V0H7.75V6.25H14V7.75H7.75V14H6.25V7.75H0V6.25H6.25Z" fill="currentColor"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Controls (Right Aligned under carousel) */}
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex justify-end gap-4 mt-2">
            <button 
              onClick={() => scrollEvents('left')}
              className="w-12 h-12 rounded-full bg-gray-200/60 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollEvents('right')}
              className="w-12 h-12 rounded-full bg-gray-200/60 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
