import { motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';
import { PageSkeleton } from '@/src/components/PageSkeleton';
import { db } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// ─── Default content (Firestore fallback) ────────────────────────────────────
const TOP_DEFAULTS = {
  headline_line1: 'OUR',
  headline_line2: 'GENESIS',
  body: 'itSMF Zambia brings together people interested in IT Service Management to share knowledge, develop skills and strengthen professional practice in Zambia.'
};

const VISION_DEFAULTS = {
  headline: 'VISION & CORE VALUES.',
  vision_label: 'The Vision',
  vision_text: 'To be the primary catalyst for IT Service Management maturity in Zambia, driving sustainable digital growth.',
  mission_label: 'The Mission',
  mission_text: '"Empowering IT professionals through certification pathways, structured mentorship, and international alignment to global ITSM standards."',
  values: [
    { value: 'Integrity', desc: 'Act with honesty, accountability and respect.' },
    { value: 'Excellence', desc: 'Continually improve the quality of service management practice.' },
    { value: 'Collaboration and inclusivity', desc: 'Welcome diverse perspectives and learn together across organisations.' },

  ]
};

const BOARD_DEFAULTS = {
  headline: 'THE BOARD.',
  members: []
};

const ADVISORY_DEFAULTS = {
  advisory_headline: 'ADVISORY COMMITTEE.',
  advisory_intro: 'Confirmed advisory appointments and governance information will be published here.',
  advisors: [],
  gov_headline: 'GOVERNANCE.',
  gov_articles: []
};

const INTL_DEFAULTS = {
  eyebrow: 'Global Network',
  headline_line1: 'itSMF',
  headline_line2: 'INTERNATIONAL',
  body: 'Learn about the wider itSMF community and service management practice around the world. Contact us for current information about our international relationships.',
  chapters: []
};

const REPORTS_DEFAULTS = {
  headline: 'ANNUAL REPORTS.',
  intro: 'Approved annual reports will be published when available.',
  reports: []
};

const CONTACT_DEFAULTS = {
  headline: 'CONTACT US.',
  intro: 'For secretariat inquiries, sponsorship proposals, or governance clarifications.',
  email: 'hello@itsmf.org.zm',
  phone: '+260974874981',
  base_label: 'PHYSICAL BASE',
  address: 'Lusaka, Zambia'
};

export default function About() {
  const { content: top, loading: topLoading } = usePageContent('about', 'top', TOP_DEFAULTS);
  const { content: vision, loading: visionLoading } = usePageContent('about', 'vision', VISION_DEFAULTS as any);
  const { content: board, loading: boardLoading } = usePageContent('about', 'board', BOARD_DEFAULTS as any);
  const { content: advisory, loading: advisoryLoading } = usePageContent('about', 'advisory', ADVISORY_DEFAULTS as any);
  const { content: intl, loading: intlLoading } = usePageContent('about', 'intl', INTL_DEFAULTS as any);
  const { content: reports, loading: reportsLoading } = usePageContent('about', 'reports', REPORTS_DEFAULTS as any);
  const { content: contact, loading: contactLoading } = usePageContent('about', 'contact', CONTACT_DEFAULTS);

  const missionItems = String(vision.mission_text || '').split(/\s*•\s*|\n+/).map(item => item.trim()).filter(Boolean);
  const isLoading = topLoading || visionLoading || boardLoading || advisoryLoading || intlLoading || reportsLoading || contactLoading;

  const [searchParams] = useSearchParams();
  const [enquiryType, setEnquiryType] = useState(searchParams.get('type') === 'sponsorship' ? 'sponsorship' : 'general');
  const [consentGiven, setConsentGiven] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };


  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSending, setFormSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven || formSending) return;
    setFormSending(true);
    setFormError('');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        message: formData.message,
        enquiryType,
        consentGiven,
        read: false,
        createdAt: serverTimestamp(),
      });
      setFormSubmitted(true);
    } catch (err: any) {
      setFormError('Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setFormSending(false);
    }
  };

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div id="top" className="pt-20">
      {/* Hero */}
      <EditableSection pageId="about" sectionId="top">
<section id="story" className="bg-brand-dark py-16 md:py-32 border-b border-brand-text/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {(top['_hide_headline_line1'] !== 'true' || top['_hide_headline_line2'] !== 'true') && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8 uppercase tracking-tighter italic">
                {top['_hide_headline_line1'] !== 'true' && <>{top.headline_line1} <br /></>}
                {top['_hide_headline_line2'] !== 'true' && <><span className="text-brand-text">{top.headline_line2}</span>.</>}
              </h1>
            )}
            {top['_hide_body'] !== 'true' && (
              <p className="text-lg text-brand-muted max-w-2xl leading-relaxed">
                {top.body}
              </p>
            )}
            <Link to="/enquire?type=membership" className="inline-flex items-center gap-2 mt-8 px-6 py-4 bg-brand-accent text-brand-dark font-bold">Join itSMF Zambia <ArrowUpRight className="w-4 h-4" /></Link>
          </motion.div>
        </div>
      </section>
      </EditableSection>

      {/* Vision, Mission, Values */}
      <EditableSection pageId="about" sectionId="vision">
<section id="vision" className="py-16 md:py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div>
            {vision['_hide_headline'] !== 'true' && (
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">
                {String(vision.headline).split(' ').reduce<any[]>((acc, word, idx, arr) => {
                   return [...acc, word, idx === arr.length - 2 ? <br key={idx}/> : ' '];
                }, [])}
              </h2>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {vision['_hide_vision_text'] !== 'true' && <div><h3 className="text-xl font-bold mb-3">{String(vision.vision_label || 'Vision')}</h3><p className="text-brand-muted leading-relaxed">{String(vision.vision_text || '')}</p></div>}
              {vision['_hide_mission_text'] !== 'true' && <div><h3 className="text-xl font-bold mb-3">{String(vision.mission_label || 'Mission')}</h3>{missionItems.length > 1 ? <ul className="list-disc pl-5 space-y-3 text-brand-muted">{missionItems.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p className="text-brand-muted leading-relaxed">{missionItems[0]}</p>}</div>}
            </div>
            {vision['_hide_values'] !== 'true' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {(vision.values as unknown as any[]).map((val, idx) => (
                  <div key={idx} className="p-8 border border-brand-text/10 bg-brand-dark flex items-center space-x-6 hover:border-brand-accent transition-colors group">
                    <div className="w-2 h-2 bg-brand-accent shadow-[0_0_10px_var(--color-brand-accent)] group-hover:scale-150 transition-transform"></div>
                    <div><h3 className="text-sm font-bold mb-3">{val.value}</h3>{val.desc && <p className="text-sm text-brand-muted leading-relaxed">{val.desc}</p>}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      </EditableSection>

      {/* Board of Directors */}
      <EditableSection pageId="about" sectionId="board">
<section id="board" className="py-16 md:py-32 bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {board['_hide_headline'] !== 'true' && (
            <div className="mb-16 md:mb-24 border-l-4 border-brand-accent pl-6 sm:pl-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic font-serif leading-none">{board.headline}</h2>
            </div>
          )}
          {board['_hide_members'] !== 'true' && (board.members as any[]).length > 0 && (
            <div className="relative group/carousel -mx-6 px-6 sm:-mx-10 sm:px-10 md:mx-0 md:px-0">
              {/* Mobile Arrows */}
              <button
                aria-label="Previous board members" onClick={() => scroll('left')}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 md:hidden bg-brand-bg border border-brand-text/10 rounded-full shadow-xl hover:text-brand-accent transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 text-brand-text" />
              </button>
              <button
                aria-label="Next board members" onClick={() => scroll('right')}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 md:hidden bg-brand-bg border border-brand-text/10 rounded-full shadow-xl hover:text-brand-accent transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 text-brand-text" />
              </button>

              <div
                ref={scrollRef}
                className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px bg-transparent md:bg-brand-text/5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {(board.members as unknown as any[]).map((member, i) => (
                  <div key={i} className="w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-center bg-brand-dark p-8 group relative overflow-hidden">
                    {member.photo && <div className="aspect-[4/5] bg-brand-bg rounded-none mb-6 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>}
                    <h4 className="text-xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">{member.name}</h4>
                    <p className="text-brand-accent font-black text-[10px] uppercase tracking-[0.2em] mb-4">{member.role}</p>
                    <p className="text-[9px] text-brand-muted font-bold uppercase tracking-widest leading-none">{member.org}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      </EditableSection>

      {/* Advisory & Governance */}
      <EditableSection pageId="about" sectionId="advisory">
<section id="advisory" className="py-16 md:py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              {advisory['_hide_advisory_headline'] !== 'true' && <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif">{advisory.advisory_headline}</h2>}
              {advisory['_hide_advisory_intro'] !== 'true' && (
                <p className="text-xs text-brand-muted uppercase font-bold tracking-widest leading-loose mb-12">
                  {advisory.advisory_intro}
                </p>
              )}
              {advisory['_hide_advisors'] !== 'true' && (
                <div className="space-y-4">
                  {(advisory.advisors as unknown as any[]).map((advisor, idx) => (
                    <div key={idx} className="p-6 bg-brand-dark border-r-2 border-brand-accent text-[9px] font-black uppercase tracking-[0.2em]">
                      {advisor.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div id="governance">
              {advisory['_hide_gov_headline'] !== 'true' && <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif">{advisory.gov_headline}</h2>}
              {advisory['_hide_gov_articles'] !== 'true' && (
                <div className="bg-brand-dark p-12 border border-brand-text/5 space-y-8">
                  {(advisory.gov_articles as unknown as any[]).map((article, idx) => (
                    <div key={idx}>
                      <h4 className="text-brand-accent font-black text-[10px] uppercase tracking-widest mb-2 font-mono">{article.title}</h4>
                      <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-relaxed">
                        {article.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* International & Contact */}
      <EditableSection pageId="about" sectionId="intl">
<section id="intl" className="py-16 md:py-32 bg-brand-dark border-y border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          {intl['_hide_eyebrow'] !== 'true' && <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">{intl.eyebrow}</span>}
          {(intl['_hide_headline_line1'] !== 'true' || intl['_hide_headline_line2'] !== 'true') && (
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter italic font-serif leading-none mb-12">
              {intl['_hide_headline_line1'] !== 'true' && <>{intl.headline_line1} <br /></>}
              {intl['_hide_headline_line2'] !== 'true' && <span className="text-brand-text">{intl.headline_line2}</span>}
              {(intl['_hide_headline_line1'] !== 'true' || intl['_hide_headline_line2'] !== 'true') && '.'}
            </h2>
          )}
          {intl['_hide_body'] !== 'true' && (
            <p className="max-w-2xl mx-auto text-xs text-brand-muted uppercase tracking-[0.2em] font-bold leading-loose mb-16">
              {intl.body}
            </p>
          )}
          {intl['_hide_chapters'] !== 'true' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-text/5 border border-brand-text/5">
              {(intl.chapters as unknown as any[]).map((ch, idx) => (
                /^https?:\/\//i.test(ch.url || '') ? <a key={idx} href={ch.url} target="_blank" rel="noopener noreferrer" className="p-8 bg-brand-dark text-sm font-bold hover:text-brand-accent transition-colors">Chapter: {ch.name} <ArrowUpRight className="inline w-4 h-4" /></a> : <div key={idx} className="p-8 bg-brand-dark text-sm font-bold">Chapter: {ch.name}</div>
              ))}
            </div>
          )}
        </div>
      </section>
      </EditableSection>





      <EditableSection pageId="about" sectionId="contact">
<section id="contact" className="py-16 md:py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
            <div>
               {contact['_hide_headline'] !== 'true' && <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic font-serif mb-8 md:mb-0">{contact.headline}</h2>}
            </div>

            <div className="w-full flex-1 md:max-w-3xl bg-brand-accent p-8 md:p-12 text-brand-dark">
               <div className="flex flex-col sm:flex-row gap-10 justify-between items-start sm:items-center">
                 {contact['_hide_email'] !== 'true' && (
                   <div>
                     <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-70">Email Address</h4>
                     <a href={`mailto:${contact.email}`} className="text-lg md:text-2xl font-bold break-all border-b-2 border-brand-dark/20 pb-1 inline-block">{String(contact.email)}</a>
                   </div>
                 )}
                 {contact['_hide_phone'] !== 'true' && (
                   <div>
                     <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-70">Phone Number</h4>
                     <a href={`tel:${contact.phone}`} className="text-lg md:text-2xl font-bold border-b-2 border-brand-dark/20 pb-1 inline-block">{String(contact.phone)}</a>
                   </div>
                 )}
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-brand-dark border border-brand-text/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 md:gap-16">
              <div className="md:w-1/3">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic font-serif leading-none mb-4">SEND US<br />A MESSAGE.</h3>
                <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose">For secretariat inquiries, sponsorship proposals, or governance clarifications.</p>
              </div>
              <div className="md:w-2/3">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mb-6" />
                    <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Message Sent</h4>
                    <p className="text-xs text-brand-muted uppercase tracking-widest font-bold mb-8">We'll get back to you as soon as possible.</p>
                    <button
                      onClick={() => { setFormSubmitted(false); setConsentGiven(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
                      className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent hover:text-brand-text transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Full Name *</label>
                        <input
                          type="text"
                          id="contact-name"
                        value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-4 bg-brand-bg border border-brand-text/10 text-sm font-bold focus:border-brand-accent outline-none transition-all text-brand-text placeholder:text-brand-muted/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Email Address *</label>
                        <input
                          type="email"
                          id="contact-email"
                        value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          placeholder="john@example.com"
                          className="w-full px-4 py-4 bg-brand-bg border border-brand-text/10 text-sm font-bold focus:border-brand-accent outline-none transition-all text-brand-text placeholder:text-brand-muted/40"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Phone Number</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+260 97X XXX XXX"
                        className="w-full px-4 py-4 bg-brand-bg border border-brand-text/10 text-sm font-bold focus:border-brand-accent outline-none transition-all text-brand-text placeholder:text-brand-muted/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-muted">Message *</label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-4 bg-brand-bg border border-brand-text/10 text-sm font-bold focus:border-brand-accent outline-none transition-all resize-none text-brand-text placeholder:text-brand-muted/40"
                      />
                    </div>
                    <label className="block text-sm font-bold">Enquiry type
                      <select value={enquiryType} onChange={e => setEnquiryType(e.target.value)} className="block mt-2 w-full p-4 bg-brand-bg border border-brand-text/10">
                        <option value="general">General enquiry</option><option value="sponsorship">Sponsorship</option><option value="governance">Governance</option>
                      </select>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-brand-muted leading-relaxed">
                      <input type="checkbox" required checked={consentGiven} onChange={e => setConsentGiven(e.target.checked)} className="mt-1" />
                      <span>I consent to itSMF Zambia using these details to respond to my enquiry. Read the <Link to="/privacy" className="underline text-brand-accent">Privacy Policy</Link>.</span>
                    </label>
                    {formError && (
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-500">{formError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={formSending}
                      className="bg-brand-accent text-brand-dark px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-text transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {formSending ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4 mr-2" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
