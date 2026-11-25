import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, MapPin, Award } from 'lucide-react';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';
import { PageSkeleton } from '@/src/components/PageSkeleton';

// ─── Default content (Firestore fallback) ────────────────────────────────────
const FLAGSHIP_DEFAULTS = {
  eyebrow: 'itSMF Zambia Events',
  headline_line1: 'CONNECT.',
  headline_line2: 'LEARN.',
  headline_line3: 'SHARE.',
  duration_label: 'Next event',
  duration_value: 'Details to be announced',
  venue_label: 'Venue',
  venue_value: 'To be confirmed',
  date_iso: '',
  btn_label: 'View event details',
  btn_url: '',
  recap_url: '',
  img: ''
};

const CALENDAR_DEFAULTS = { headline: 'CALENDAR.', events: [{ title: 'ITIL 5 inaugural webinar', date: '4 June 2026', date_iso: '2026-06-04', location: 'Online', format: 'Online', type: 'Webinar', desc: 'Contact the chapter for the inaugural webinar recap and available materials.', time: '', price: '', img: '', action_label: '', action_url: '', recap_url: '', recording_url: '', slides_url: '' }] };

const SPONSOR_DEFAULTS = {
  headline: 'SPONSOR AN EVENT.',
  desc: 'Contact us to discuss event sponsorship opportunities and available packages.',
  tiers: []
};

const SPEAKERS_DEFAULTS = {
  headline_line1: 'CALL FOR',
  headline_line2: 'SPEAKERS.',
  desc: 'Share your expertise with the Zambian ITSM community. We welcome proposals on ITIL 5, COBIT, ISO/IEC 20000 and practical service management.',
  form_text: 'Submit a speaker proposal',
  policy_text: 'Speaker policy',
  policy_url: '',
  box_headline_line1: 'Share Your Experience',
  box_headline_line2: 'With Our Community.',
  box_desc: 'Tell us about your proposed topic and experience. We will contact you about suitable speaking opportunities.',
  btn_label: 'Enquire as a Speaker'
};

// Only accept local paths or web links in editable actions.
function safeEventUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const url = value.trim();
  if (/^\/(?![/\\])/.test(url)) return url;
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? url : undefined;
  } catch {
    return undefined;
  }
}

function eventDate(value: unknown): string | undefined {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value ? value : undefined;
}

export default function Events() {
  const [category, setCategory] = useState('All');
  const [period, setPeriod] = useState<'upcoming' | 'past'>('upcoming');
  const { content: flagship, loading: flagshipLoading } = usePageContent('events', 'flagship', FLAGSHIP_DEFAULTS);
  const { content: calendar, loading: calendarLoading } = usePageContent('events', 'calendar', CALENDAR_DEFAULTS);
  const { content: sponsor, loading: sponsorLoading } = usePageContent('events', 'sponsor', SPONSOR_DEFAULTS);
  const { content: speakers, loading: speakersLoading } = usePageContent('events', 'speakers', SPEAKERS_DEFAULTS);

  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lusaka', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const events = calendar['_hide_events'] !== 'true' && Array.isArray(calendar.events) ? calendar.events : [];
  const visibleEvents = events.filter((event) => {
    const date = eventDate(event.date_iso);
    const matchesPeriod = period === 'past' ? date && date < today : !date || date >= today;
    return matchesPeriod && (category === 'All' || event.type === category);
  });
  const flagshipDate = eventDate(flagship.date_iso);
  const flagshipUrl = safeEventUrl(flagshipDate && flagshipDate < today ? flagship.recap_url : flagship.btn_url);
  const isLoading = flagshipLoading || calendarLoading || sponsorLoading || speakersLoading;

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="pt-20">
      {/* Flagship Header */}
      <EditableSection pageId="events" sectionId="flagship">
<section className="bg-brand-dark min-h-[70vh] flex items-center relative overflow-hidden border-b border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 py-16 md:py-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl"
          >
            {flagship['_hide_eyebrow'] !== 'true' && <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">{flagship.eyebrow}</span>}
            {(flagship['_hide_headline_line1'] !== 'true' || flagship['_hide_headline_line2'] !== 'true' || flagship['_hide_headline_line3'] !== 'true') && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-12 uppercase italic tracking-tighter">
                {flagship['_hide_headline_line1'] !== 'true' && <>{flagship.headline_line1} <br /></>}
                {flagship['_hide_headline_line2'] !== 'true' && <><span className="text-brand-text">{flagship.headline_line2}</span> <br /></>}
                {flagship['_hide_headline_line3'] !== 'true' && flagship.headline_line3}
              </h1>
            )}
            <div className="flex flex-col md:flex-row gap-12 mb-12 items-start uppercase font-bold tracking-widest text-brand-muted text-sm border-t border-brand-text/5 pt-12">
              <div className="flex flex-col">
                {flagship['_hide_duration_label'] !== 'true' && <span className="text-brand-accent mb-2">{flagship.duration_label}</span>}
                {flagship['_hide_duration_value'] !== 'true' && <span className="text-brand-text">{flagship.duration_value}</span>}
              </div>
              <div className="flex flex-col">
                {flagship['_hide_venue_label'] !== 'true' && <span className="text-brand-accent mb-2">{flagship.venue_label}</span>}
                {flagship['_hide_venue_value'] !== 'true' && <span className="text-brand-text">{flagship.venue_value}</span>}
              </div>
            </div>
            {flagship['_hide_btn_label'] !== 'true' && flagshipDate && flagshipUrl && (
              <a href={flagshipUrl} className="inline-block bg-brand-accent text-brand-dark px-12 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-text shadow-2xl transition-all">
                {flagshipDate < today ? 'View recap' : flagship.btn_label}
              </a>
            )}
          </motion.div>
        </div>
        {safeEventUrl(flagship.img) && <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 grayscale pointer-events-none">
          <img src={safeEventUrl(flagship.img)} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-dark/20 to-brand-dark" />
        </div>}
      </section>
      </EditableSection>



      {/* Filter & Listing */}
      <EditableSection pageId="events" sectionId="calendar">
<section id="calendar" className="py-16 md:py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            {calendar['_hide_headline'] !== 'true' && <h2 className="text-5xl font-black uppercase tracking-tighter italic font-serif">{calendar.headline}</h2>}
            <div className="flex flex-wrap gap-4 font-black text-[10px] uppercase tracking-widest">
              {(['upcoming', 'past'] as const).map((value) => (
                <button key={value} onClick={() => setPeriod(value)} aria-pressed={period === value}
                  className={`px-6 py-3 border transition-all ${period === value ? 'bg-brand-accent text-brand-dark border-brand-accent' : 'border-brand-text/20 text-brand-muted hover:border-brand-accent'}`}>
                  {value === 'upcoming' ? 'Upcoming events' : 'Past events'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8" aria-label="Event categories">
            {['All', ...new Set(events.map(event => event.type).filter(Boolean))].map(value => <button key={value} onClick={() => setCategory(value)} aria-pressed={category === value} className={`px-4 py-2 rounded-xl border ${category === value ? 'border-brand-accent text-brand-accent' : 'border-brand-text/20'}`}>{value}</button>)}
          </div>
          <div className="grid grid-cols-1 gap-px bg-brand-text/5 border border-brand-text/5">
            {visibleEvents.length === 0 && <p className="p-8 bg-brand-bg text-brand-muted">{period === 'upcoming' ? 'Upcoming events will be announced here. Please check back for dates and registration details.' : 'Event recaps will be published here when available.'}</p>}
            {visibleEvents.map((event, i) => {
              const date = eventDate(event.date_iso);
              const isPast = Boolean(date && date < today);
              const actionUrl = safeEventUrl(isPast ? event.recap_url : event.action_url);
              const recordingUrl = safeEventUrl(event.recording_url);
              const slidesUrl = safeEventUrl(event.slides_url);
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row bg-brand-bg hover:bg-brand-text/5 transition-all duration-500"
              >
                {safeEventUrl(event.img) && <div className="md:w-1/4 aspect-video md:aspect-square h-64 md:h-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={safeEventUrl(event.img)} alt={event.title || "Event"} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                </div>}
                <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] font-mono">
                      {date ? event.date || date : 'Date to be confirmed'}
                    </span>
                    <span className="text-brand-muted text-[10px] font-black uppercase tracking-[0.3em] bg-brand-text/5 px-3 py-1 rounded-sm">
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none group-hover:text-brand-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-base text-brand-muted leading-relaxed max-w-2xl mb-8">
                    {event.desc}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-brand-muted mb-6">
                    {event.time && <span>{event.time} (CAT, UTC+2)</span>}
                    {event.format && <span>{event.format}</span>}
                    {event.price && <span>{event.price}</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-brand-text">
                      <MapPin className="w-4 h-4 mr-2 text-brand-accent" />
                      {event.location}
                    </div>
                    {date && actionUrl && (
                      <a href={actionUrl} className="flex items-center text-xs font-bold text-brand-accent">
                        {isPast ? 'View recap' : event.action_label || 'Event details'} <ChevronRight className="ml-1 w-4 h-4" />
                      </a>
                    )}
                    {isPast && recordingUrl && <a href={recordingUrl} className="text-xs font-bold text-brand-accent">Watch recording</a>}
                    {isPast && slidesUrl && <a href={slidesUrl} className="text-xs font-bold text-brand-accent">View slides</a>}
                  </div>
                </div>
              </motion.div>
            );})}
          </div>
        </div>
      </section>
      </EditableSection>

      {/* Sponsorship Grid */}
      <EditableSection pageId="events" sectionId="sponsor">
<section className="py-16 md:py-32 bg-brand-dark border-b border-brand-text/5" id="sponsor">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8">
            {sponsor['_hide_headline'] !== 'true' && (
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter italic font-serif leading-none">
                {String(sponsor.headline).split(' ').reduce<any[]>((acc, word, idx, arr) => {
                   return [...acc, word, idx === arr.length - 3 ? <br key={idx}/> : idx === arr.length - 2 ? <span key={`span-${idx}`} className="text-brand-text font-sans font-black"> </span> : ' '];
                }, [])}
              </h2>
            )}
            {sponsor['_hide_desc'] !== 'true' && (
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted max-w-sm text-right leading-loose">
                {sponsor.desc}
              </p>
            )}
          </div>
          
          <Link to="/enquire?type=sponsorship" className="inline-block mb-10 bg-brand-accent text-brand-dark px-8 py-4 font-bold">Discuss sponsorship</Link>
          {sponsor['_hide_tiers'] !== 'true' && (
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
                  <Link to="/enquire?type=sponsorship" className="block text-center w-full border border-brand-text/20 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-all">
                    Enquire Now
                  </Link>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>
      </EditableSection>

      {/* Call for Speakers */}
      <EditableSection pageId="events" sectionId="speakers">
<section id="speakers" className="py-16 md:py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                  {(speakers['_hide_headline_line1'] !== 'true' || speakers['_hide_headline_line2'] !== 'true') && (
                    <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic font-serif leading-none">
                      {speakers['_hide_headline_line1'] !== 'true' && <>{speakers.headline_line1} <br /></>}
                      {speakers['_hide_headline_line2'] !== 'true' && speakers.headline_line2}
                    </h2>
                  )}
                  {speakers['_hide_desc'] !== 'true' && (
                    <p className="text-base text-brand-muted leading-relaxed mb-12">
                      {speakers.desc}
                    </p>
                  )}
                  <div className="space-y-6">
                     {speakers['_hide_form_text'] !== 'true' && (
                       <Link to="/enquire?type=speakers" className="p-6 bg-brand-dark border-l-4 border-brand-accent flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{speakers.form_text}</span>
                          <ChevronRight className="w-4 h-4 text-brand-accent" />
                       </Link>
                     )}
                     {speakers['_hide_policy_text'] !== 'true' && safeEventUrl(speakers.policy_url) && (
                       <a href={safeEventUrl(speakers.policy_url)} className="p-6 bg-brand-dark border border-brand-text/20 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{speakers.policy_text}</span>
                          <ChevronRight className="w-4 h-4" />
                       </a>
                     )}
                  </div>
               </div>
               {(speakers['_hide_box_headline_line1'] !== 'true' || speakers['_hide_box_headline_line2'] !== 'true' || speakers['_hide_box_desc'] !== 'true' || speakers['_hide_btn_label'] !== 'true') && (
                 <div className="bg-brand-accent p-12 text-brand-dark">
                    <Award className="w-16 h-16 mb-8" />
                    {(speakers['_hide_box_headline_line1'] !== 'true' || speakers['_hide_box_headline_line2'] !== 'true') && (
                      <h4 className="text-2xl font-black uppercase tracking-tighter italic font-serif mb-6 leading-tight">
                        {speakers['_hide_box_headline_line1'] !== 'true' && <>{speakers.box_headline_line1} <br /></>}
                        {speakers['_hide_box_headline_line2'] !== 'true' && speakers.box_headline_line2}
                      </h4>
                    )}
                    {speakers['_hide_box_desc'] !== 'true' && (
                      <p className="text-base leading-relaxed mb-10">
                        {speakers.box_desc}
                      </p>
                    )}
                    {speakers['_hide_btn_label'] !== 'true' && (
                      <Link to="/enquire?type=speakers" className="block text-center w-full bg-brand-dark text-brand-text py-5 font-black uppercase tracking-widest hover:bg-brand-text hover:text-brand-bg transition-all">
                        {speakers.btn_label}
                      </Link>
                    )}
                 </div>
               )}
           </div>
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
