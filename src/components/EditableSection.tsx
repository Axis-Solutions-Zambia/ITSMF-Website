import React from 'react';
import { useAdminMode } from '@/src/context/AdminModeContext';
import { usePageContent } from '@/src/hooks/usePageContent';
import { Edit3, EyeOff } from 'lucide-react';

interface EditableSectionProps {
  pageId: string;
  sectionId: string;
  children: React.ReactNode;
  className?: string;
}

export default function EditableSection({ pageId, sectionId, children, className = '' }: EditableSectionProps) {
  const { isAdminMode, pageId: adminPageId, activeSectionId, setActiveSectionId } = useAdminMode();
  const { content } = usePageContent(pageId, sectionId);
  const isHidden = content._hidden === 'true';

  if (isHidden && !isAdminMode) {
    return null;
  }

  // If not in admin mode, or editing a different page, just render children
  if (!isAdminMode || pageId !== adminPageId) {
    return <>{children}</>;
  }

  const isActive = activeSectionId === sectionId;

  return (
    <div 
      className={`relative group transition-all duration-300 ${isActive ? 'ring-4 ring-brand-accent ring-inset z-40' : 'hover:ring-2 hover:ring-brand-accent/50 hover:ring-inset hover:z-30'} ${isHidden ? 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0' : ''} ${className}`}
    >
      {children}
      
      {/* Hidden Badge */}
      {isHidden && (
        <div className="absolute top-4 left-4 z-50 bg-red-500 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center shadow-lg">
          <EyeOff className="w-3 h-3 mr-2" /> Hidden on Live Site
        </div>
      )}

      {/* Edit Overlay Button */}
      <div 
        className={`absolute top-4 right-4 transition-opacity duration-200 z-50 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveSectionId(sectionId);
          }}
          className="flex items-center space-x-2 bg-brand-accent text-brand-dark px-4 py-2 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brand-text shadow-xl"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isActive ? 'Editing' : 'Edit Section'}</span>
        </button>
      </div>
    </div>
  );
}
