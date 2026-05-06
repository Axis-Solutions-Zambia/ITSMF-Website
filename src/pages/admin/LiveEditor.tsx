import { useState, ComponentType } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Monitor } from 'lucide-react';
import { AdminModeProvider, useAdminMode } from '@/src/context/AdminModeContext';
import SectionEditor from './SectionEditor';

// Page Components
import Home from '../Home';
import About from '../About';
import Membership from '../Membership';
import Events from '../Events';
import Resources from '../Resources';
import Partners from '../Partners';
import Portal from '../Portal';
import Services from '../Services';

const PAGE_COMPONENTS: Record<string, ComponentType<any>> = {
  home: Home,
  about: About,
  membership: Membership,
  events: Events,
  resources: Resources,
  partners: Partners,
  portal: Portal,
  services: Services,
};

function LiveEditorShell() {
  const { pageId } = useParams<{ pageId: string }>();
  const { activeSectionId, setActiveSectionId } = useAdminMode();
  
  if (!pageId || !PAGE_COMPONENTS[pageId]) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-bg text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter italic font-serif">Page Not Found</h1>
        <Link to="/admin/content" className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent hover:underline flex items-center">
          <ArrowLeft className="w-3 h-3 mr-2" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const PageComponent = PAGE_COMPONENTS[pageId];

  return (
    <div className="flex h-screen bg-brand-bg overflow-hidden relative">
      
      {/* Main Preview Area */}
      <div className="flex-grow flex flex-col transition-all duration-500 overflow-hidden w-full">
        
        {/* Top Editor Nav */}
        <div className="h-16 border-b border-brand-text/10 bg-brand-dark flex items-center justify-between px-6 shrink-0 shadow-lg relative z-20">
          <div className="flex items-center space-x-6">
            <Link to="/admin/content" className="text-brand-muted hover:text-brand-text transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <Monitor className="w-4 h-4 text-brand-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text">
                Live Editor: <span className="text-brand-accent capitalize">{pageId}</span>
              </span>
            </div>
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-muted font-mono">
              Hover over sections to edit
            </span>
          </div>
        </div>

        {/* Live Page Preview */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden relative bg-brand-bg scrollbar-thin">
          <PageComponent />
        </div>
      </div>

      {/* Side Panel for Section Editor */}
      <div 
        className={`shrink-0 h-full bg-brand-dark border-l border-brand-text/10 shadow-2xl transition-all duration-500 ease-in-out z-50 overflow-y-auto ${activeSectionId ? 'w-full md:w-[450px]' : 'w-0 border-none'}`}
      >
        <div className="w-full md:w-[450px] p-6 h-full">
          {activeSectionId && (
            <SectionEditor 
              pageId={pageId} 
              sectionId={activeSectionId} 
              onClose={() => setActiveSectionId(null)} 
            />
          )}
        </div>
      </div>

    </div>
  );
}

export default function LiveEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  return (
    <AdminModeProvider isAdminMode={true} pageId={pageId || null}>
      <LiveEditorShell />
    </AdminModeProvider>
  );
}
