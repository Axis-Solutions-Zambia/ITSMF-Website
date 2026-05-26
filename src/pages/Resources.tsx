import { motion } from 'motion/react';
import { BookOpen, FileText, Download, Play, MessageSquare, Lightbulb, UserPlus, ArrowUpRight } from 'lucide-react';
import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';
import { PageSkeleton } from '@/src/components/PageSkeleton';

// ─── Default content (Firestore fallback) ────────────────────────────────────
const HERO_DEFAULTS = {
  eyebrow: 'Knowledge Repository',
  headline_line1: 'INTELLECTUAL',
  headline_line2: 'CAPITAL',
  body: 'Curated ITSM tools, regional benchmarks, and exclusive mentorship pathways for the Zambian tech elite.',
  watermark: 'ARCHIVE'
};

const PATHWAYS_DEFAULTS = {
  headline: 'PATHWAYS.',
  paths: [
    { name: 'ITIL 4 Foundation', levels: 'Core Practitioner', time: '1-2 Months' },
    { name: 'ITIL Specialist', levels: 'Professional Strategic', time: '3-6 Months' },
    { name: 'ISO/IEC 20000', levels: 'Framework Lead', time: 'Fixed/Ongoing' },
    { name: 'VeriSM Specialist', levels: 'Active Management', time: '2-4 Months' }
  ]
};

const BLOG_DEFAULTS = {
  headline: 'BLOG & ARTICLES',
  posts: [
    {
      title: 'Sustainable ITSM: The Green Frontier for ZNB Architecture',
      author: 'Isaac Banda',
      date: '12 MAR 2026',
      excerpt: 'Exploring how IT service frameworks can directly contribute to environmental sustainability goals in Zambia.'
    }
  ]
};

const THOUGHT_LEADERSHIP_DEFAULTS = {
  headline: 'THOUGHT LEADERSHIP',
  posts: [
    {
      title: 'Beyond the Ticket: Human-Centric Service Design',
      author: 'Mary Kalinda',
      date: '28 FEB 2026',
      excerpt: 'Why empathy mapping is becoming the most critical tool for the modern Zambian service desk manager.'
    }
  ]
};

const RESOURCES_LIST_DEFAULTS = {
  case_studies_headline: 'Featured Case Studies',
  whitepapers_headline: 'Whitepapers',
  resources: [
    {
      title: 'The Zambia ITSM Roadmap 2026',
      type: 'Guide',
      category: 'Certification',
      desc: 'A comprehensive pathway for IT professionals aligning with National Digital Strategy.'
    },
    {
      title: 'Incident Management in Banking',
      type: 'Case Study',
      category: 'Zambian Context',
      desc: 'How a leading commercial bank reduced downtime by 40% using ITIL v4 principles.'
    }
  ]
};

const FELLOWSHIP_DEFAULTS = {
  headline: 'FELLOWSHIP',
  desc: 'Connect with the veterans of the industry. Direct pathways to mentorship.',
  btn_label: 'Apply to Program'
};

const VAULT_DEFAULTS = {
  glossary_headline: 'ITSM GLOSSARY.',
  glossary_desc: "Master the terminology of modern service management. From 'SLA' to 'Value Stream'.",
  glossary_btn: 'Open Dictionary',
  videos_headline: 'VIDEO LIBRARY.',
  videos_desc: 'Workshop recordings, webinars, and technical deep-dives from our international summits.',
  videos_btn: 'Browse media',
  newsletters_headline: 'NEWSLETTERS.',
  newsletters_desc: "The chapter's monthly intelligence briefing archive dating back to 2018.",
  newsletters_btn: 'Access Archive'
};

const GOVERNANCE_DEFAULTS = {
  reports_headline: 'ANNUAL REPORTS.',
  reports_years: [
    { year: '2025' },
    { year: '2024' },
    { year: '2023' },
    { year: '2022' }
  ],
  bylaws_headline: 'CHAPTER BYLAWS.',
  bylaws_desc: 'Our governance framework regulates all member activities, ethical standards, and professional conduct across the chapter.',
  bylaws_docs: [
    { title: 'Code of Ethics 2026.PDF' },
    { title: 'Chapter Constitution v2.PDF' }
  ]
};

export default function Resources() {
  const { content: hero, loading: heroLoading } = usePageContent('resources', 'hero', HERO_DEFAULTS);
  const { content: pathways, loading: pathwaysLoading } = usePageContent('resources', 'pathways', PATHWAYS_DEFAULTS as any);
  const { content: blog, loading: blogLoading } = usePageContent('resources', 'blog', BLOG_DEFAULTS as any);
  const { content: thoughtLeadership, loading: thoughtLeadershipLoading } = usePageContent('resources', 'thought-leadership', THOUGHT_LEADERSHIP_DEFAULTS as any);
  const { content: resourcesList, loading: resourcesListLoading } = usePageContent('resources', 'resources_list', RESOURCES_LIST_DEFAULTS as any);
  const { content: fellowship, loading: fellowshipLoading } = usePageContent('resources', 'fellowship', FELLOWSHIP_DEFAULTS);
  const { content: vault, loading: vaultLoading } = usePageContent('resources', 'vault', VAULT_DEFAULTS);
  const { content: governance, loading: governanceLoading } = usePageContent('resources', 'governance', GOVERNANCE_DEFAULTS as any);

  const isLoading = heroLoading || pathwaysLoading || blogLoading || thoughtLeadershipLoading || resourcesListLoading || fellowshipLoading || vaultLoading || governanceLoading;

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="pt-20">
      <EditableSection pageId="resources" sectionId="hero">
<section className="bg-brand-bg py-16 md:py-32 border-b border-brand-text/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {hero['_hide_eyebrow'] !== 'true' && <span className="text-brand-accent font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">{hero.eyebrow}</span>}
            {(hero['_hide_headline_line1'] !== 'true' || hero['_hide_headline_line2'] !== 'true') && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 uppercase tracking-tighter italic leading-[0.9]">
                {hero['_hide_headline_line1'] !== 'true' && <>{hero.headline_line1} <br /></>}
                {hero['_hide_headline_line2'] !== 'true' && <span className="text-brand-text">{hero.headline_line2}</span>}
                {(hero['_hide_headline_line1'] !== 'true' || hero['_hide_headline_line2'] !== 'true') && '.'}
              </h1>
            )}
            {hero['_hide_body'] !== 'true' && (
              <p className="text-xl text-brand-muted max-w-2xl leading-relaxed uppercase tracking-wider font-bold opacity-80 decoration-brand-accent underline underline-offset-8">
                {hero.body}
              </p>
            )}
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 text-[15vw] font-black text-brand-text/5 uppercase select-none pointer-events-none -mt-10 mr-10 leading-none">
          {hero.watermark}
        </div>
      </section>
      </EditableSection>

      {/* Certification Guides */}
      <EditableSection pageId="resources" sectionId="pathways">
<section id="certification-guides" className="py-16 md:py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            {pathways['_hide_headline'] !== 'true' && <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter italic font-serif">{pathways.headline}</h2>}
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent flex items-center hover:text-brand-text cursor-pointer transition-colors group">
              View Global Guide <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
          
          {pathways['_hide_paths'] !== 'true' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1px bg-brand-text/10 border border-brand-text/10">
              {(pathways.paths as unknown as any[]).map((path, i) => (
                <div key={i} className="bg-brand-dark p-10 hover:bg-brand-text/10 transition-all duration-500">
                  <div className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] mb-4 font-mono">{path.levels}</div>
                  <h4 className="font-serif italic font-black text-2xl mb-8 leading-tight tracking-tight">{path.name}</h4>
                  <div className="flex items-center text-brand-muted text-[10px] font-bold uppercase tracking-widest">
                    <Play className="w-3 h-3 mr-3 text-brand-accent fill-current" /> est. {path.time}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </EditableSection>

      {/* Main Grid: Blog + Case Studies */}
      <EditableSection pageId="resources" sectionId="blog">
<section id="case-studies" className="py-16 md:py-32 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            
            {/* Blog & Thought Leadership */}
            <div className="lg:col-span-2 space-y-24">
              <div id="blog">
                {blog['_hide_headline'] !== 'true' && <h2 className="text-5xl font-black uppercase tracking-tighter italic font-serif text-brand-text mb-12">{blog.headline}</h2>}
                {blog['_hide_posts'] !== 'true' && (
                  <div className="space-y-16">
                    {(blog.posts as unknown as any[]).map((post, i) => (
                      <div key={i} className="group accent-border pb-8 cursor-pointer">
                        <div className="flex items-center text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] font-mono mb-6 space-x-6">
                          <span className="bg-brand-text/5 px-2 py-1">JOURNAL</span>
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none group-hover:text-brand-accent transition-colors">{post.title}</h3>
                        <p className="text-xs text-brand-muted font-bold uppercase tracking-widest leading-loose max-w-2xl mb-8 opacity-80">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.3em] text-brand-text group/more">
                        <span>READ FULL ANALYSIS</span>
                        <ArrowUpRight className="w-4 h-4 text-brand-accent group-hover/more:translate-x-1 group-hover/more:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>

              <div id="thought-leadership" className="pt-24 border-t border-brand-text/5">
                {thoughtLeadership['_hide_headline'] !== 'true' && <h2 className="text-5xl font-black uppercase tracking-tighter italic font-serif text-brand-text mb-12">{thoughtLeadership.headline}</h2>}
                {thoughtLeadership['_hide_posts'] !== 'true' && (thoughtLeadership.posts as unknown as any[]).map((post, i) => (
                  <div key={i} className="group accent-border pb-8 cursor-pointer">
                    <div className="flex items-center text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] font-mono mb-6 space-x-6">
                      <span className="bg-brand-text/5 px-2 py-1">LEADERSHIP</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black mb-6 uppercase tracking-tighter italic font-serif leading-none group-hover:text-brand-accent transition-colors">{post.title}</h3>
                    <p className="text-xs text-brand-muted font-bold uppercase tracking-widest leading-loose max-w-2xl mb-8 opacity-80">{post.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Studies & Whitepapers */}
            <div className="space-y-24">
              <div id="case-studies">
                {resourcesList['_hide_case_studies_headline'] !== 'true' && (
                  <h3 className="text-[10px] font-black text-brand-muted uppercase tracking-[0.4em] mb-8 flex items-center">
                     {resourcesList.case_studies_headline}
                  </h3>
                )}
                {resourcesList['_hide_resources'] !== 'true' && (
                  <div className="space-y-4">
                    {(resourcesList.resources as unknown as any[]).filter(r => r.type === 'Case Study').map((res, i) => (
                      <div key={i} className="p-8 bg-brand-dark border border-brand-text/5 hover:border-brand-accent/50 transition-all cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                        <div className="flex justify-between items-start mb-6">
                          <Lightbulb className="w-6 h-6 text-brand-accent" />
                          <Download className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                        </div>
                        <h4 className="font-serif italic font-black text-lg mb-2 uppercase tracking-tighter leading-tight">{res.title}</h4>
                        <p className="text-[9px] text-brand-muted uppercase tracking-[0.2em] font-black opacity-60 font-mono">{res.category}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div id="whitepapers">
                {resourcesList['_hide_whitepapers_headline'] !== 'true' && (
                  <h3 className="text-[10px] font-black text-brand-muted uppercase tracking-[0.4em] mb-8 mt-12 flex items-center">
                     {resourcesList.whitepapers_headline}
                  </h3>
                )}
                {resourcesList['_hide_resources'] !== 'true' && (
                  <div className="space-y-4">
                    {(resourcesList.resources as unknown as any[]).filter(r => r.type === 'Guide').map((res, i) => (
                      <div key={i} className="p-8 bg-brand-dark border border-brand-text/5 hover:border-brand-accent/50 transition-all cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                        <div className="flex justify-between items-start mb-6">
                          <BookOpen className="w-6 h-6 text-brand-accent" />
                          <Download className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                        </div>
                        <h4 className="font-serif italic font-black text-lg mb-2 uppercase tracking-tighter leading-tight">{res.title}</h4>
                        <p className="text-[9px] text-brand-muted uppercase tracking-[0.2em] font-black opacity-60 font-mono">{res.category}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-brand-accent p-12 lg:p-16 text-brand-dark relative group overflow-hidden">
                <div className="relative z-10">
                  {fellowship['_hide_headline'] !== 'true' && <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter italic font-serif">{fellowship.headline}</h3>}
                  {fellowship['_hide_desc'] !== 'true' && <p className="text-sm font-bold uppercase tracking-widest leading-loose mb-12 opacity-80">{fellowship.desc}</p>}
                  {fellowship['_hide_btn_label'] !== 'true' && (
                    <button className="w-full bg-brand-dark text-brand-text py-5 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-text hover:text-brand-bg shadow-2xl transition-all">
                      {fellowship.btn_label}
                    </button>
                  )}
                </div>
                <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-1000 rotate-12">
                  <MessageSquare className="w-48 h-48" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      </EditableSection>
      {/* Knowledge Vault */}
      <EditableSection pageId="resources" sectionId="vault">
<section className="py-16 md:py-32 bg-brand-dark border-t border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div id="glossary">
              {vault['_hide_glossary_headline'] !== 'true' && <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">{vault.glossary_headline}</h3>}
              {vault['_hide_glossary_desc'] !== 'true' && (
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-loose mb-8">
                  {vault.glossary_desc}
                </p>
              )}
              {vault['_hide_glossary_btn'] !== 'true' && <button className="text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-brand-accent hover:text-brand-accent transition-colors">{vault.glossary_btn}</button>}
            </div>
            <div id="videos">
              {vault['_hide_videos_headline'] !== 'true' && <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">{vault.videos_headline}</h3>}
              {vault['_hide_videos_desc'] !== 'true' && (
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-loose mb-8">
                  {vault.videos_desc}
                </p>
              )}
              {vault['_hide_videos_btn'] !== 'true' && <button className="text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-brand-accent hover:text-brand-accent transition-colors">{vault.videos_btn}</button>}
            </div>
            <div id="newsletters">
              {vault['_hide_newsletters_headline'] !== 'true' && <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter italic font-serif">{vault.newsletters_headline}</h3>}
              {vault['_hide_newsletters_desc'] !== 'true' && (
                <p className="text-[10px] text-brand-muted uppercase font-bold tracking-widest leading-loose mb-8">
                  {vault.newsletters_desc}
                </p>
              )}
              {vault['_hide_newsletters_btn'] !== 'true' && <button className="text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-brand-accent hover:text-brand-accent transition-colors">{vault.newsletters_btn}</button>}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>

      {/* Governance & Archive */}
      <EditableSection pageId="resources" sectionId="governance">
<section id="governance" className="py-16 md:py-32 bg-brand-bg border-t border-brand-text/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div id="reports">
              {governance['_hide_reports_headline'] !== 'true' && (
                <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">
                  {governance.reports_headline.split(' ').reduce<any[]>((acc, word, idx, arr) => {
                     return [...acc, word, idx === arr.length - 2 ? <br key={idx}/> : ' '];
                  }, [])}
                </h2>
              )}
              {governance['_hide_reports_years'] !== 'true' && (
                <div className="grid grid-cols-2 gap-4">
                   {(governance.reports_years as unknown as any[]).map((report, idx) => (
                     <div key={idx} className="bg-brand-bg border border-brand-text/5 p-8 hover:border-brand-accent transition-all cursor-pointer group">
                        <FileText className="w-6 h-6 text-brand-accent mb-4" />
                        <span className="text-xl font-black italic font-serif uppercase tracking-tighter">{report.year} REPORT</span>
                     </div>
                   ))}
                </div>
              )}
            </div>
            <div>
              {governance['_hide_bylaws_headline'] !== 'true' && (
                <h2 className="text-3xl font-black mb-12 uppercase tracking-tighter italic font-serif leading-none">
                  {governance.bylaws_headline.split(' ').reduce<any[]>((acc, word, idx, arr) => {
                     return [...acc, word, idx === arr.length - 2 ? <br key={idx}/> : ' '];
                  }, [])}
                </h2>
              )}
              {governance['_hide_bylaws_desc'] !== 'true' && (
                <p className="text-xs text-brand-muted uppercase tracking-widest font-bold leading-loose mb-12">
                  {governance.bylaws_desc}
                </p>
              )}
              {governance['_hide_bylaws_docs'] !== 'true' && (
                <div className="space-y-4">
                   {(governance.bylaws_docs as unknown as any[]).map((doc, idx) => (
                     <div key={idx} className="p-8 bg-brand-bg border border-brand-text/5 flex items-center justify-between group cursor-pointer hover:bg-brand-text/5">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] font-sans">{doc.title}</span>
                        <Download className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
                     </div>
                   ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </EditableSection>
    </div>
  );
}
