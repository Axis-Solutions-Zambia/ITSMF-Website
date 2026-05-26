import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  FileText, ExternalLink, Edit3, Eye,
  GripVertical, ChevronRight, LayoutTemplate,
  Globe, Clock, Search, LayoutList, Loader2,
  Database, CheckCircle, AlertCircle
} from 'lucide-react';
import {
  collection, doc, onSnapshot, query, orderBy
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { seedFirestore } from '@/src/lib/seedFirestore';
import { SECTION_SCHEMAS } from '@/src/lib/sectionSchemas';
import SectionEditor from './SectionEditor';
import LiveEditor from './LiveEditor';

// ─── Types ──────────────────────────────────────────────────────────────────

interface PageSection {
  id: string;
  name: string;
}

interface WebsitePage {
  id: string;
  name: string;
  path: string;
  lastEdited: string;
  status: string;
  sections: PageSection[];
}

// Fallback sections from schema if page not seeded yet
function getSectionsFromSchema(pageId: string): PageSection[] {
  const schemaPage = SECTION_SCHEMAS[pageId];
  if (!schemaPage) return [];
  return Object.entries(schemaPage).map(([id, s]) => ({ id, name: s.name }));
}

// ─── Seed Banner ─────────────────────────────────────────────────────────────

function SeedBanner() {
  const [seeding, setSeeding] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSeed() {
    setSeeding(true);
    setError('');
    try {
      await seedFirestore();
      setDone(true);
    } catch (err) {
      console.error(err);
      setError('Seed failed — check Firestore rules or console.');
    } finally {
      setSeeding(false);
    }
  }

  if (done) {
    return (
      <div className="flex items-center bg-green-500/10 border border-green-500/30 text-green-500 px-6 py-4 mb-8">
        <CheckCircle className="w-4 h-4 mr-3 shrink-0" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Firestore seeded successfully! Pages are now live.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-brand-accent/10 border border-brand-accent/30 px-6 py-4 mb-8 gap-4">
      <div className="flex items-start">
        <Database className="w-4 h-4 mr-3 text-brand-accent shrink-0 mt-0.5" />
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent mb-1">First-time setup required</div>
          <div className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">
            Seed Firestore with the default site content to enable editing.
            {error && <span className="text-red-500 ml-2">{error}</span>}
          </div>
        </div>
      </div>
      <button
        onClick={handleSeed}
        disabled={seeding}
        className="flex items-center shrink-0 px-6 py-3 bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-text transition-all disabled:opacity-50"
      >
        {seeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
        {seeding ? 'Seeding…' : 'Seed Default Content'}
      </button>
    </div>
  );
}

// ─── Pages Grid ──────────────────────────────────────────────────────────────

function PagesGrid() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [seeded, setSeeded] = useState(true); // Optimistic — check on load

  useEffect(() => {
    const q = query(collection(db, 'pages'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setSeeded(false);
          setPages([]);
        } else {
          setSeeded(true);
          const result: WebsitePage[] = snapshot.docs.map((d) => {
            const data = d.data();
            let lastEdited = 'Never';
            if (data.lastEdited?.toDate) {
              const date: Date = data.lastEdited.toDate();
              const diff = Date.now() - date.getTime();
              const hours = Math.floor(diff / 3600000);
              const days = Math.floor(diff / 86400000);
              if (hours < 1) lastEdited = 'Just now';
              else if (hours < 24) lastEdited = `${hours}h ago`;
              else if (days === 1) lastEdited = 'Yesterday';
              else lastEdited = `${days} days ago`;
            }
            return {
              id: d.id,
              name: data.title ?? d.id,
              path: data.path ?? `/${d.id}`,
              lastEdited,
              status: data.status ?? 'Published',
              sections: getSectionsFromSchema(d.id),
            };
          });
          // Sort by a known order
          const ORDER = ['home', 'about', 'membership', 'events', 'resources', 'partners', 'services', 'portal'];
          result.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
          setPages(result);
        }
        setLoading(false);
      },
      (_err) => {
        setSeeded(false);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const filtered = pages.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.path.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-brand-text/5 pb-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">CONTENT MANAGEMENT.</h2>
          <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">Select a page to edit its sections.</p>
        </div>
        <div className="flex items-center bg-brand-dark border border-brand-text/10 px-4 py-3 focus-within:border-brand-accent transition-colors">
          <Search className="w-4 h-4 text-brand-muted mr-3" />
          <input
            type="text"
            placeholder="SEARCH PAGES..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-48 text-brand-text placeholder-brand-muted/50"
          />
        </div>
      </div>

      {!seeded && <SeedBanner />}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-32">
          <Loader2 className="w-8 h-8 animate-spin text-brand-accent mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Connecting to Firestore…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((page, i) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/admin/content/${page.id}/live`)}
              className="bg-brand-dark border border-brand-text/5 hover:border-brand-accent transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="p-6 border-b border-brand-text/5 flex justify-between items-start">
                <div className="w-10 h-10 bg-brand-bg flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <span className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest ${page.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-brand-text/10 text-brand-muted'}`}>
                  {page.status}
                </span>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-black uppercase tracking-tighter italic font-serif mb-2">{page.name}</h3>
                <div className="flex items-center text-[10px] font-bold text-brand-muted mb-4 uppercase tracking-widest font-mono">
                  <Globe className="w-3 h-3 mr-2" /> {page.path}
                </div>
              </div>
              <div className="p-6 border-t border-brand-text/5 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-brand-muted">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-2" /> {page.lastEdited}
                </div>
                <div className="flex items-center group-hover:text-brand-accent transition-colors">
                  {page.sections.length} Sections <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page Details (section list) ─────────────────────────────────────────────

function PageDetails() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();

  const sections = pageId ? getSectionsFromSchema(pageId) : [];
  const pageSchema = pageId ? SECTION_SCHEMAS[pageId] : null;

  if (!pageSchema || !pageId) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-32 text-center">
        <AlertCircle className="w-10 h-10 text-brand-muted mb-4" />
        <p className="text-xs font-black uppercase tracking-widest text-brand-muted">Page not found.</p>
        <Link to="/admin/content" className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent hover:underline">
          ← Back to Content
        </Link>
      </div>
    );
  }

  // Infer path from schema id
  const pathMap: Record<string, string> = {
    home: '/', about: '/about', membership: '/membership', events: '/events',
    resources: '/resources', partners: '/partners', services: '/services', portal: '/portal'
  };
  const pagePath = pathMap[pageId] ?? `/${pageId}`;

  return (
    <div className="max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-brand-muted mb-8">
        <Link to="/admin/content" className="hover:text-brand-accent transition-colors">Content Management</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-brand-text capitalize">{pageId}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic font-serif leading-none capitalize">{pageId}</h2>
            <span className="px-2 py-1 text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-500">Published</span>
          </div>
          <p className="text-[11px] text-brand-muted font-bold uppercase tracking-widest font-mono flex items-center">
            Path:&nbsp;
            <a href={pagePath} target="_blank" rel="noreferrer" className="text-brand-accent hover:underline flex items-center ml-1">
              {pagePath} <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href={pagePath}
            target="_blank"
            rel="noreferrer"
            className="bg-brand-dark border border-brand-text/10 text-brand-text px-6 py-3 font-black text-[10px] uppercase tracking-[0.3em] hover:border-brand-accent transition-all flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" /> View Live
          </a>
        </div>
      </div>

      {/* Sections List */}
      <div className="bg-brand-dark border border-brand-text/5">
        <div className="p-6 border-b border-brand-text/5 flex justify-between items-center bg-brand-text/5">
          <div className="flex items-center text-xs font-black uppercase tracking-[0.2em]">
            <LayoutList className="w-4 h-4 mr-3 text-brand-accent" />
            Page Sections
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">
            {sections.length} section{sections.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="divide-y divide-brand-text/5">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="p-6 flex items-center justify-between hover:bg-brand-text/5 transition-colors group cursor-pointer"
              onClick={() => navigate(`/admin/content/${pageId}/sections/${section.id}`)}
            >
              <div className="flex items-center">
                <div className="cursor-grab text-brand-muted/50 hover:text-brand-text mr-4">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded border border-brand-text/10 bg-brand-bg flex items-center justify-center text-[10px] font-black text-brand-muted mr-6">
                  {index + 1}
                </div>
                <div>
                  <div className="text-sm font-black uppercase tracking-widest mb-1">{section.name}</div>
                  <div className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] font-mono">ID: {section.id}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 border border-brand-text/10 bg-brand-bg text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all opacity-0 group-hover:opacity-100"
                  title="Edit Section"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/content/${pageId}/sections/${section.id}`);
                  }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-accent transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Exported Router ─────────────────────────────────────────────────────────

export default function ContentManager() {
  return (
    <Routes>
      <Route path="/" element={<PagesGrid />} />
      <Route path="/:pageId" element={<PageDetails />} />
      <Route path="/:pageId/live" element={<LiveEditor />} />
      <Route path="/:pageId/sections/:sectionId" element={<SectionEditor />} />
    </Routes>
  );
}
