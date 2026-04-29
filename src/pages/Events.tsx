import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Ticket, Award, Filter, ArrowRight, ChevronRight } from 'lucide-react';
import { usePageContent } from '@/src/hooks/usePageContent';

// ─── Default content (Firestore fallback) ────────────────────────────────────
const FLAGSHIP_DEFAULTS = {
  eyebrow: 'November 2026',
  headline_line1: 'ANNUAL',
  headline_line2: 'SUMMIT',
  headline_line3: 'LIVINGSTONE',
  duration_label: 'Duration',
  duration_value: '24 — 26 Nov 2026',
  venue_label: 'Venue',
  venue_value: 'Avani Victoria Falls Resort',
  btn_label: 'Secure Delegate Pass'
};

const CALENDAR_DEFAULTS = {
  headline: 'CALENDAR.',
  events: [
    {
      title: 'ITSM Strategy Roundtable: Lusaka 2026',
      date: 'May 12, 2026',
      location: 'Taj Pamodzi, Lusaka',
      type: 'Roundtable',
      desc: 'An exclusive gathering for CIOs to discuss the impact of national AI policy on service delivery.',
      img: 'https://picsum.photos/seed/event1/600/400'
    },
    {
      title: 'ITIL 4 Foundation Fast-Track',
      date: 'June 4-6, 2026',
      location: 'Online Workshop',
      type: 'Workshop',
      desc: 'Intensive 3-day certification preparation led by accredited international trainers.',
      img: 'https://picsum.photos/seed/event2/600/400'
    },
    {
      title: 'Quarterly Member Webinar: ZNB Digital Core',
      date: 'July 15, 2026',
      location: 'Zoom Video Conference',
      type: 'Webinar',
      desc: 'Deep dive into the new ZNB digital architecture and ITSM integration points.',
      img: 'https://picsum.photos/seed/event3/600/400'
    }
  ]
};

const SPONSOR_DEFAULTS = {
  headline: 'SPONSOR AN EVENT.',
  desc: "Strategic brand placement for organizations leading Zambia's tech agenda.",
  tiers: [
    {
      name: 'Bronze',
      price: 'ZMW 5,000',
      benefits: 'Logo on banners\nSocial media mention\n1 Delegate pass',
      color: 'bg-orange-400'
    },
    {
      name: 'Silver',
      price: 'ZMW 15,000',
      benefits: 'Exhibition space\n2 Delegate passes\nPresentation slot (10m)\nLogo on lanyards',
      color: 'bg-slate-400'
    },
    {
      name: 'Gold',
      price: 'ZMW 35,000',
      benefits: 'Prime exhibition spot\n5 Delegate passes\nKeynote slot (30m)\nFull-page program ad\nVIP Dinner access',
      color: 'bg-yellow-500'
    }
  ]
};

const SPEAKERS_DEFAULTS = {
  headline_line1: 'CALL FOR',
  headline_line2: 'SPEAKERS.',
  desc: 'Share your expertise with the Zambian ITSM community. We are looking for practitioners to present on ITIL 4, ISO 20000, and AI Governance.',
  form_text: 'Submission Form 2026',
  policy_text: 'Speaker Compensation Policy',
  box_headline_line1: 'Elevate Your Practice',
  box_headline_line2: 'On The National Stage.',
  box_desc: 'itSMF Zambia speakers are globally recognized and receive full delegate access to our premium Livingstone summits.',
  btn_label: 'Register as Speaker'
};

export default function Events() {
  const { content: flagship } = usePageContent('events', 'flagship', FLAGSHIP_DEFAULTS);
  const { content: calendar } = usePageContent('events', 'calendar', CALENDAR_DEFAULTS as any);
  const { content: sponsor } = usePageContent('events', 'sponsor', SPONSOR_DEFAULTS as any);
  const { content: speakers } = usePageContent('events', 'speakers', SPEAKERS_DEFAULTS);

  return (
    <div className="pt-20">
      {/* Flagship Header */}
      <section className="bg-brand-dark min-h-[70vh] flex items-center relative overflow-hidden border-b border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl"
          >
            <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">{flagship.eyebrow}</span>
            <h1 className="text-7xl md:text-[10vw] font-black leading-none mb-12 uppercase italic tracking-tighter">
              {flagship.headline_line1} <br /><span className="text-transparent text-stroke">{flagship.headline_line2}</span> <br />{flagship.headline_line3}
            </h1>
            <div className="flex flex-col md:flex-row gap-12 mb-12 items-start uppercase font-bold tracking-widest text-brand-muted text-sm border-t border-brand-text/5 pt-12">
              <div className="flex flex-col">
                <span className="text-brand-accent mb-2">{flagship.duration_label}</span>
                <span className="text-brand-text">{flagship.duration_value}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-brand-accent mb-2">{flagship.venue_label}</span>
                <span className="text-brand-text">{flagship.venue_value}</span>
              </div>
            </div>
            <button className="bg-brand-accent text-brand-dark px-12 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-text shadow-2xl transition-all">
              {flagship.btn_label}
            </button>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 grayscale pointer-events-none">
          <img src="https://picsum.photos/seed/falls/800/1200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-dark/20 to-brand-dark" />
        </div>
      </section>

      {/* Local Sub-nav */}
      <section className="py-20 bg-brand-bg border-b border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 font-black text-[10px] uppercase tracking-[0.3em] text-brand-muted">
          <div className="flex flex-wrap gap-8">
             <a href="#flagship" className="hover:text-brand-accent transition-colors">Flagship Summit</a>
             <a href="#calendar" className="hover:text-brand-accent transition-colors underline decoration-brand-accent">Calendar</a>
             <a href="#webinars" className="hover:text-brand-accent transition-colors">Webinars</a>
             <a href="#sponsor" className="hover:text-brand-accent transition-colors">Sponsorships</a>
             <a href="#speakers" className="hover:text-brand-accent transition-colors text-brand-accent">Call for Speakers</a>
          </div>
        </div>
      </section>

      {/* Filter & Listing */}
      <section id="calendar" className="py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter italic font-serif">{calendar.headline}</h2>
            <div className="flex flex-wrap gap-4 font-black text-[10px] uppercase tracking-widest">
              <button className="px-6 py-3 bg-brand-accent text-brand-dark">All Events</button>
              <button className="px-6 py-3 border border-brand-text/10 text-brand-muted hover:border-brand-accent transition-all">Workshops</button>
              <button className="px-6 py-3 border border-brand-text/10 text-brand-muted hover:border-brand-accent transition-all">Roundtables</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-brand-text/5 border border-brand-text/5">
            {(calendar.events as unknown as any[]).map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row bg-brand-bg hover:bg-brand-text/5 transition-all duration-500"
              >
                <div className="md:w-1/4 aspect-video md:aspect-square h-64 md:h-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={event.img} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                </div>
                <div className="md:w-3/4 p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] font-mono">
                      {event.date}
                    </span>
                    <span className="text-brand-muted text-[10px] font-black uppercase tracking-[0.3em] bg-brand-text/5 px-3 py-1 rounded-sm">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none group-hover:text-brand-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-brand-muted font-bold uppercase tracking-widest leading-loose max-w-2xl mb-8">
                    {event.desc}
                  </p>
                  <div className="flex items-center gap-12">
                    <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-brand-text">
                      <MapPin className="w-4 h-4 mr-2 text-brand-accent" />
                      {event.location}
                    </div>
                    <button className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent group/btn">
                      REGISTER <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Grid */}
      <section className="py-32 bg-brand-dark border-b border-brand-text/5" id="sponsor">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic font-serif leading-none">
              {sponsor.headline.split(' ').reduce<any[]>((acc, word, idx, arr) => {
                 return [...acc, word, idx === arr.length - 3 ? <br key={idx}/> : idx === arr.length - 2 ? <span key={`span-${idx}`} className="text-transparent text-stroke italic font-sans font-black"> </span> : ' '];
              }, [])}
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted max-w-sm text-right leading-loose">
              {sponsor.desc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-text/5 border border-brand-text/5">
            {(sponsor.tiers as unknown as any[]).map((tier, i) => {
              const benefitsList = (tier.benefits || '').split('\n').filter((f: string) => f.trim().length > 0);
              return (
                <div key={i} className="bg-brand-dark p-12 lg:p-16 flex flex-col hover:bg-brand-text/10 transition-all duration-500">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent mb-8">{tier.name}</div>
                  <div className="text-4xl font-black italic font-serif mb-12 tracking-tighter">{tier.price}</div>
                  <ul className="space-y-6 mb-16 flex-grow">
                    {benefitsList.map((b: string, j: number) => (
                      <li key={j} className="text-[10px] font-bold uppercase tracking-widest text-brand-muted flex items-start leading-tight">
                        <div className="w-1.5 h-1.5 bg-brand-accent mt-1 mr-4 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full border border-brand-text/20 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-all">
                    Inquire Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call for Speakers */}
      <section id="speakers" className="py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                 <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic font-serif leading-none">
                   {speakers.headline_line1} <br />{speakers.headline_line2}
                 </h2>
                 <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
                   {speakers.desc}
                 </p>
                 <div className="space-y-6">
                    <div className="p-6 bg-brand-dark border-l-4 border-brand-accent flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">{speakers.form_text}</span>
                       <ChevronRight className="w-4 h-4 text-brand-accent" />
                    </div>
                    <div className="p-6 bg-brand-dark border border-brand-text/5 flex items-center justify-between opacity-50">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">{speakers.policy_text}</span>
                       <ChevronRight className="w-4 h-4" />
                    </div>
                 </div>
              </div>
              <div className="bg-brand-accent p-12 text-brand-dark">
                 <Award className="w-16 h-16 mb-8" />
                 <h4 className="text-2xl font-black uppercase tracking-tighter italic font-serif mb-6 leading-tight">
                   {speakers.box_headline_line1} <br />{speakers.box_headline_line2}
                 </h4>
                 <p className="text-xs font-bold uppercase tracking-widest leading-loose mb-10 opacity-80">
                   {speakers.box_desc}
                 </p>
                 <button className="w-full bg-brand-dark text-brand-text py-5 font-black uppercase tracking-widest hover:bg-brand-text hover:text-brand-bg transition-all">
                   {speakers.btn_label}
                 </button>
              </div>
           </div>
        </div>
        <div className="absolute left-0 bottom-0 text-[18vw] font-black text-brand-text/5 uppercase select-none pointer-events-none -mb-12 ml-4">
          SPEAKER
        </div>
      </section>
    </div>
  );
}
