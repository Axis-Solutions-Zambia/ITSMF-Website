import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, ExternalLink, HelpCircle } from 'lucide-react';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';
import { PageSkeleton } from '@/src/components/PageSkeleton';

// ─── Default content (Firestore fallback) ────────────────────────────────────
const HERO_DEFAULTS = {
  headline_line1: 'ALLIED',
  headline_line2: 'ECOSYSTEMS.',
  body: 'Explore opportunities to support service management through knowledge sharing, collaboration and professional development.',
  watermark: 'SYSTEM'
};

const CATEGORIES_DEFAULTS = { categories_list: [] };
const INTERNATIONAL_DEFAULTS = {
  headline_line1: 'A GLOBAL', headline_line2: 'COMMUNITY.',
  body: 'itSMF International connects service management communities around the world. Explore its website to learn about the international network.',
  points: [], btn_label: 'Visit itSMF International', btn_url: 'https://www.itsmfi.org/'
};
const BECOME_DEFAULTS = {
  headline_line1: 'BECOME A', headline_line2: 'PARTNER.',
  desc: 'Connect with us about training referrals, knowledge sharing and opportunities to support the service management community.',
  contact_email: ''
};

export default function Partners() {
  const { content: hero, loading: heroLoading } = usePageContent('partners', 'hero', HERO_DEFAULTS);
  const { content: categories, loading: categoriesLoading } = usePageContent('partners', 'categories', CATEGORIES_DEFAULTS as any);
  const { content: international, loading: internationalLoading } = usePageContent('partners', 'international', INTERNATIONAL_DEFAULTS as any);
  const { content: become, loading: becomeLoading } = usePageContent('partners', 'become', BECOME_DEFAULTS);

  const isLoading = heroLoading || categoriesLoading || internationalLoading || becomeLoading;

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="pt-20">
      <EditableSection pageId="partners" sectionId="hero">
<section id="overview" className="bg-brand-dark py-16 md:py-32 relative overflow-hidden border-b border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {(hero['_hide_headline_line1'] !== 'true' || hero['_hide_headline_line2'] !== 'true') && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] mb-10 uppercase tracking-tighter italic">
                {hero['_hide_headline_line1'] !== 'true' && <>{hero.headline_line1} <br /></>}
                {hero['_hide_headline_line2'] !== 'true' && <span className="text-brand-text">{hero.headline_line2}</span>}
              </h1>
            )}
            {hero['_hide_body'] !== 'true' && (
              <p className="text-xl text-brand-muted max-w-2xl leading-relaxed font-normal">
                {hero.body}
              </p>
            )}
          </motion.div>
        </div>
      </section>
      </EditableSection>

      {/* Local Sub-nav */}
      <section className="py-20 bg-brand-bg border-b border-brand-text/5 font-black text-[10px] uppercase tracking-[0.3em] text-brand-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-8">
             <a href="#overview" className="hover:text-brand-accent transition-colors underline decoration-brand-accent">Partner Overview</a>
             <a href="#become" className="hover:text-brand-accent transition-colors text-brand-accent">Become a Partner</a>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <EditableSection pageId="partners" sectionId="categories">
{categories['_hide_categories_list'] !== 'true' && (categories.categories_list as any[]).some(cat => typeof cat.partners === 'string' && cat.partners.trim()) && <section className="py-16 md:py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-32">
          {categories['_hide_categories_list'] !== 'true' && (categories.categories_list as unknown as any[]).filter(cat => typeof cat.partners === 'string' && cat.partners.trim()).map((cat, i) => {
            const partnerList = (cat.partners || '').split('\n').filter((p: string) => p.trim().length > 0);
            return (
              <div 
                key={i} 
                id={cat.title.toLowerCase().includes('training') ? 'atos' : cat.title.toLowerCase().includes('sponsor') ? 'sponsors' : 'ngo'}
                className="group"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12 border-b border-brand-text/5 pb-12">
                  <div className="max-w-xl">
                    <span className="text-brand-accent font-black tracking-[0.3em] uppercase text-[9px] mb-4 block">Category {i + 1}</span>
                    <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none">{cat.title}</h2>
                    <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose">{cat.desc}</p>
                  </div>
                  <Link to="/enquire?type=partnership" className="flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent hover:text-brand-text transition-all whitespace-nowrap">
                    PARTNERSHIP ENQUIRY <ExternalLink className="ml-3 w-4 h-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-brand-text/10 border border-brand-text/10">
                  {partnerList.map((partner: string, j: number) => (
                    <motion.div
                      key={j}
                      className="aspect-[4/3] bg-brand-bg flex items-center justify-center p-12 text-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:bg-brand-text/10"
                    >
                      <span className="font-serif font-black text-brand-text text-lg tracking-tighter italic leading-tight">
                        {partner}
                      </span>
                    </motion.div>
                  ))}
                  <Link to="/enquire?type=partnership" className="aspect-[4/3] bg-brand-accent/5 flex flex-col items-center justify-center p-8 text-center group/add cursor-pointer border-2 border-dashed border-brand-accent/20 hover:border-brand-accent hover:bg-brand-accent/10 transition-all">
                    <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">Become a partner</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>}
      </EditableSection>

      {/* International Relationship */}
      <EditableSection pageId="partners" sectionId="international">
<section className="py-16 md:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center gap-24">
            <div className="md:w-1/2">
              <div className="accent-border p-1">
                <div className="bg-brand-bg border border-brand-text/5 aspect-square flex flex-col items-center justify-center p-16">
                  <Globe className="w-32 h-32 mb-12 text-brand-accent animate-pulse" />
                  <div className="contents text-center">
                    <span className="text-5xl font-black block leading-none tracking-tighter uppercase mb-4">itSMF</span>
                    <span className="text-3xl font-black block italic font-serif text-brand-accent leading-none">International</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              {(international['_hide_headline_line1'] !== 'true' || international['_hide_headline_line2'] !== 'true') && (
                <h2 className="text-5xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">
                  {international['_hide_headline_line1'] !== 'true' && <>{international.headline_line1} <br /></>}
                  {international['_hide_headline_line2'] !== 'true' && international.headline_line2}
                </h2>
              )}
              {international['_hide_body'] !== 'true' && (
                <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
                  {international.body}
                </p>
              )}
              {international['_hide_points'] !== 'true' && (
                <div className="grid grid-cols-1 gap-12 mb-12">
                  {(international.points as unknown as any[]).map((point, i) => (
                    <div key={i} className="accent-border">
                      <h4 className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-2">{point.title}</h4>
                      <p className="text-[11px] text-brand-muted uppercase tracking-widest font-bold leading-relaxed">{point.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {international['_hide_btn_label'] !== 'true' && typeof international.btn_url === 'string' && /^https?:\/\//.test(international.btn_url) && (
                <a href={international.btn_url as string} className="inline-block bg-brand-accent text-brand-dark px-12 py-5 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-text transition-all">
                  {international.btn_label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* Question CTA */}
      <EditableSection pageId="partners" sectionId="become">
<section id="become" className="py-16 md:py-32 bg-brand-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <HelpCircle className="w-16 h-16 text-brand-text/5 mx-auto mb-12" />
          {(become['_hide_headline_line1'] !== 'true' || become['_hide_headline_line2'] !== 'true') && (
            <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter italic font-serif">
              {become['_hide_headline_line1'] !== 'true' && <>{become.headline_line1} <br /></>}
              {become['_hide_headline_line2'] !== 'true' && become.headline_line2}
            </h2>
          )}
          {become['_hide_desc'] !== 'true' && (
            <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
              {become.desc}
            </p>
          )}
          <Link to="/enquire?type=partnership" className="inline-block bg-brand-accent text-brand-dark px-8 py-4 font-bold mb-8">Enquire about partnership</Link>
          {become['_hide_contact_email'] !== 'true' && typeof become.contact_email === 'string' && become.contact_email.trim() && (
            <a href={`mailto:${become.contact_email}`} className="text-brand-accent font-black text-2xl uppercase tracking-tighter border-b-2 border-brand-accent pb-2 hover:text-brand-text hover:border-brand-text transition-all">
              {become.contact_email}
            </a>
          )}
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
