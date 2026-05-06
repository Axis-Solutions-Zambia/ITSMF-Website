import { motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';

// ─── Default content (Firestore fallback) ────────────────────────────────────
const TOP_DEFAULTS = {
  headline_line1: 'OUR',
  headline_line2: 'GENESIS',
  body: 'itSMF Zambia is the leading professional body for Service Management, fostering excellence across the Republic since 2018.'
};

const VISION_DEFAULTS = {
  headline: 'VISION & CORE VALUES.',
  vision_label: 'The Vision',
  vision_text: 'To be the primary catalyst for IT Service Management maturity in Zambia, driving sustainable digital growth.',
  mission_label: 'The Mission',
  mission_text: '"Empowering IT professionals through certification pathways, structured mentorship, and international alignment to global ITSM standards."',
  values: [
    { value: 'Integrity' },
    { value: 'Excellence' },
    { value: 'Collaboration' },
    { value: 'Innovation' }
  ]
};

const BOARD_DEFAULTS = {
  headline: 'THE BOARD.',
  members: [
    { name: 'Dr. Chisenga', role: 'Chairperson', org: 'ICT Authority' },
    { name: 'Sarah Phiri', role: 'Vice-Chair', org: 'FinTech Solutions' },
    { name: 'Michael Banda', role: 'Secretary', org: 'National Bank' },
    { name: 'Kelvin Mwansa', role: 'Treasurer', org: 'Global Audit' }
  ]
};

const ADVISORY_DEFAULTS = {
  advisory_headline: 'ADVISORY COMMITTEE.',
  advisory_intro: 'A non-voting body comprising industry veterans providing strategic oversight and mentorship to the board.',
  advisors: [
    { title: 'Permanent Secretary (Ministry of Technology)' },
    { title: 'CEO (National Digital Agency)' },
    { title: 'Regional Director (UNDP ICT)' },
    { title: 'Dean of IT (University of Zambia)' }
  ],
  gov_headline: 'GOVERNANCE.',
  gov_articles: [
    { title: 'Article 12: Elections', body: 'Elections are conducted biennially during the Annual General Meeting (AGM) to ensure continuity and fresh leadership perspectives.' },
    { title: 'Article 15: AGM Details', body: 'AGMs are held held in Q1 of each fiscal year. All voting members (Individual & Corporate) are required to attend.' }
  ]
};

const INTL_DEFAULTS = {
  eyebrow: 'Global Network',
  headline_line1: 'itSMF',
  headline_line2: 'INTERNATIONAL',
  body: 'itSMF Zambia is a proud member of the itSMF International federation, providing our members with direct access to global thought leadership and cross-chapter collaboration.',
  chapters: [
    { name: 'UK' },
    { name: 'USA' },
    { name: 'Germany' },
    { name: 'Australia' }
  ]
};

const REPORTS_DEFAULTS = {
  headline: 'ANNUAL REPORTS.',
  intro: 'Explore our commitment to transparency through yearly financial and impact audits.',
  reports: [
    { year: '2025', title: 'Annual Impact Report', details: 'PDF // 12.4 MB' },
    { year: '2024', title: 'Annual Impact Report', details: 'PDF // 12.4 MB' },
    { year: '2023', title: 'Annual Impact Report', details: 'PDF // 12.4 MB' }
  ]
};

const CONTACT_DEFAULTS = {
  headline: 'CONTACT US.',
  intro: 'For secretariat inquiries, sponsorship proposals, or governance clarifications.',
  email: 'secretariat@itsmf.zm',
  phone: '+260 970 000 000',
  base_label: 'PHYSICAL BASE',
  address: 'Innovation Hub,\nIndependence Avenue,\nLusaka, Zambia'
};

export default function About() {
  const { content: top } = usePageContent('about', 'top', TOP_DEFAULTS);
  const { content: vision } = usePageContent('about', 'vision', VISION_DEFAULTS as any);
  const { content: board } = usePageContent('about', 'board', BOARD_DEFAULTS as any);
  const { content: advisory } = usePageContent('about', 'advisory', ADVISORY_DEFAULTS as any);
  const { content: intl } = usePageContent('about', 'intl', INTL_DEFAULTS as any);
  const { content: reports } = usePageContent('about', 'reports', REPORTS_DEFAULTS as any);
  const { content: contact } = usePageContent('about', 'contact', CONTACT_DEFAULTS);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="pt-20">
      {/* Hero */}
      <EditableSection pageId="about" sectionId="top">
<section id="story" className="bg-brand-dark py-32 border-b border-brand-text/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {(top['_hide_headline_line1'] !== 'true' || top['_hide_headline_line2'] !== 'true') && (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-8 uppercase tracking-tighter italic">
                {top['_hide_headline_line1'] !== 'true' && <>{top.headline_line1} <br /></>}
                {top['_hide_headline_line2'] !== 'true' && <><span className="text-brand-text">{top.headline_line2}</span>.</>}
              </h1>
            )}
            {top['_hide_body'] !== 'true' && (
              <p className="text-xl text-brand-muted max-w-2xl leading-relaxed uppercase tracking-wider font-bold opacity-80 decoration-brand-accent underline underline-offset-8">
                {top.body}
              </p>
            )}
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 text-[20vw] font-black text-brand-text/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          STORY
        </div>
      </section>
      </EditableSection>

      {/* Vision, Mission, Values */}
      <EditableSection pageId="about" sectionId="vision">
<section id="vision" className="py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div>
            {vision['_hide_headline'] !== 'true' && (
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">
                {vision.headline.split(' ').reduce<any[]>((acc, word, idx, arr) => {
                   return [...acc, word, idx === arr.length - 2 ? <br key={idx}/> : ' '];
                }, [])}
              </h2>
            )}
            
            {vision['_hide_values'] !== 'true' && (
              <div className="relative overflow-hidden w-screen left-1/2 -translate-x-1/2 py-8 mt-12 bg-brand-text/5">
                {/* Fade edges for better visual effect */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-marquee-lr">
                  {[...Array(2)].map((_, groupIdx) => (
                    <div key={groupIdx} className="flex gap-8 pr-8">
                      {([...(vision.values as any[]), ...(vision.values as any[]), ...(vision.values as any[])]).map((val, idx) => (
                        <div key={idx} className="w-[280px] md:w-[400px] shrink-0 p-8 border border-brand-text/10 bg-brand-dark flex items-center space-x-6 hover:border-brand-accent transition-colors">
                          <div className="w-2 h-2 bg-brand-accent shadow-[0_0_10px_var(--color-brand-accent)]"></div>
                          <span className="text-sm font-black uppercase tracking-[0.3em]">{val.value}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      </EditableSection>

      {/* Board of Directors */}
      <EditableSection pageId="about" sectionId="board">
<section id="board" className="py-32 bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {board['_hide_headline'] !== 'true' && (
            <div className="mb-16 md:mb-24 border-l-4 border-brand-accent pl-6 sm:pl-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic font-serif leading-none">{board.headline}</h2>
            </div>
          )}
          {board['_hide_members'] !== 'true' && (
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
                className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-px bg-transparent md:bg-brand-text/5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {(board.members as unknown as any[]).map((member, i) => (
                  <div key={i} className="w-[85vw] sm:w-[50vw] md:w-auto shrink-0 snap-center bg-brand-dark p-8 group relative overflow-hidden">
                    <div className="aspect-[4/5] bg-brand-bg rounded-none mb-6 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                      <div className="absolute inset-0 border border-brand-text/5"></div>
                    </div>
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
<section id="advisory" className="py-32 bg-brand-bg">
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
<section id="intl" className="py-32 bg-brand-dark border-y border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          {intl['_hide_eyebrow'] !== 'true' && <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">{intl.eyebrow}</span>}
          {(intl['_hide_headline_line1'] !== 'true' || intl['_hide_headline_line2'] !== 'true') && (
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic font-serif leading-none mb-12">
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
                <div key={idx} className="p-8 bg-brand-dark text-xs font-black uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity">
                  Chapter: {ch.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </EditableSection>





      <EditableSection pageId="about" sectionId="contact">
<section id="contact" className="py-32 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
             {contact['_hide_headline'] !== 'true' && <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic font-serif mb-8 md:mb-0">{contact.headline}</h2>}
          </div>
          
          <div className="w-full flex-1 md:max-w-3xl bg-brand-accent p-12 text-brand-dark">
             <div className="flex flex-col sm:flex-row gap-10 justify-between items-start sm:items-center">
               {contact['_hide_email'] !== 'true' && (
                 <div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-70">Email Address</h4>
                   <div className="text-xl md:text-2xl font-black uppercase tracking-tighter border-b-2 border-brand-dark/20 pb-1 inline-block">{contact.email}</div>
                 </div>
               )}
               {contact['_hide_phone'] !== 'true' && (
                 <div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-70">Phone Number</h4>
                   <div className="text-xl md:text-2xl font-black uppercase tracking-tighter border-b-2 border-brand-dark/20 pb-1 inline-block">{contact.phone}</div>
                 </div>
               )}
             </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 text-[15vw] font-black text-brand-text/5 uppercase select-none pointer-events-none -mb-10 ml-4">
          CONTACT
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
