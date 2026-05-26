import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { SECTION_SCHEMAS, FieldDef } from '@/src/lib/sectionSchemas';
import { Loader2, ExternalLink, Image as ImageIcon, ChevronRight, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

interface ExtractedImage {
  url: string;
  fieldLabel: string;
}

interface SectionMediaGroup {
  pageId: string;
  sectionId: string;
  sectionName: string;
  images: ExtractedImage[];
}

interface PageMediaGroup {
  pageId: string;
  pageName: string;
  sections: SectionMediaGroup[];
}

export default function MediaLibrary() {
  const [groupedMedia, setGroupedMedia] = useState<PageMediaGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMedia() {
      const groups: PageMediaGroup[] = [];

      for (const [pageId, pageSchema] of Object.entries(SECTION_SCHEMAS)) {
        const pageGroup: PageMediaGroup = {
          pageId,
          pageName: pageId, // capitalizing later
          sections: []
        };

        for (const [sectionId, sectionSchema] of Object.entries(pageSchema)) {
          // Quick check if section has any image fields
          const hasImageField = sectionSchema.fields.some(f => 
            f.type === 'image' || (f.type === 'list' && f.itemFields?.some(i => i.type === 'image'))
          );

          if (!hasImageField) continue;

          // Fetch section data from Firestore
          let contentData: any = {};
          try {
            // Because getDocs on collection is easier if we want all sections,
            // but we only want specific ones. It's safer to just fetch the collection.
            const sectionsRef = collection(db, 'pages', pageId, 'sections');
            const snap = await getDocs(sectionsRef);
            const docSnap = snap.docs.find(d => d.id === sectionId);
            if (docSnap && docSnap.exists()) {
              contentData = docSnap.data().content || {};
            }
          } catch (e) {
            console.error(`Failed to fetch ${pageId}/${sectionId}`, e);
          }

          const extractedImages: ExtractedImage[] = [];

          // Extract images based on schema
          for (const field of sectionSchema.fields) {
            if (field.type === 'image') {
              const url = contentData[field.key];
              if (url && typeof url === 'string') {
                extractedImages.push({ url, fieldLabel: field.label });
              }
            } else if (field.type === 'list' && field.itemFields) {
              const imageSubfields = field.itemFields.filter(i => i.type === 'image');
              if (imageSubfields.length > 0) {
                const listData = contentData[field.key];
                if (Array.isArray(listData)) {
                  listData.forEach((item, index) => {
                    imageSubfields.forEach(subfield => {
                      const url = item[subfield.key];
                      if (url && typeof url === 'string') {
                        extractedImages.push({ 
                          url, 
                          fieldLabel: `${field.label} (Item ${index + 1}) - ${subfield.label}`
                        });
                      }
                    });
                  });
                }
              }
            }
          }

          // Only add section if it has actual images uploaded
          if (extractedImages.length > 0) {
            pageGroup.sections.push({
              pageId,
              sectionId,
              sectionName: sectionSchema.name,
              images: extractedImages
            });
          }
        }

        if (pageGroup.sections.length > 0) {
          groups.push(pageGroup);
        }
      }

      setGroupedMedia(groups);
      setLoading(false);
    }

    loadMedia();
  }, []);

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-brand-text/5 pb-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic font-serif leading-none mb-2">MEDIA LIBRARY.</h2>
          <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">View all images currently used across the website.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-brand-accent mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Scanning website content…</p>
        </div>
      ) : groupedMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-brand-dark border border-brand-text/5 rounded-xl">
          <ImageIcon className="w-12 h-12 text-brand-muted mb-4 opacity-50" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-muted">No images are currently uploaded to any page sections.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {groupedMedia.map((pageGroup) => (
            <div key={pageGroup.pageId} className="space-y-8">
              {/* Page Header */}
              <div className="flex items-center space-x-4 border-b border-brand-text/10 pb-4">
                <div className="w-10 h-10 bg-brand-accent flex items-center justify-center text-brand-dark font-black">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic font-serif capitalize">
                    {pageGroup.pageName} Page
                  </h3>
                  <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">
                    /{pageGroup.pageId === 'home' ? '' : pageGroup.pageId}
                  </div>
                </div>
              </div>

              {/* Sections Grid */}
              <div className="grid grid-cols-1 gap-8">
                {pageGroup.sections.map((sectionGroup) => (
                  <div key={sectionGroup.sectionId} className="bg-brand-dark border border-brand-text/5 rounded-xl overflow-hidden">
                    {/* Section Header */}
                    <div className="bg-brand-bg/50 p-6 border-b border-brand-text/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="text-sm font-black uppercase tracking-[0.2em] mb-1">{sectionGroup.sectionName}</div>
                        <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">
                          {sectionGroup.images.length} Image{sectionGroup.images.length !== 1 ? 's' : ''} Found
                        </div>
                      </div>
                      
                      <button
                        onClick={() => navigate(`/admin/content/${pageGroup.pageId}/sections/${sectionGroup.sectionId}`)}
                        className="flex items-center px-4 py-2 bg-brand-bg border border-brand-text/10 text-[9px] font-black uppercase tracking-[0.3em] hover:border-brand-accent hover:text-brand-accent transition-all"
                      >
                        <Edit3 className="w-3 h-3 mr-2" /> Edit Section Images
                      </button>
                    </div>

                    {/* Section Images */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {sectionGroup.images.map((img, index) => (
                          <div key={index} className="group relative">
                            <div className="aspect-square rounded-lg overflow-hidden border border-brand-text/10 bg-brand-bg relative">
                              <img 
                                src={img.url} 
                                alt={img.fieldLabel} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center">
                                <a 
                                  href={img.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="w-8 h-8 bg-brand-accent text-brand-dark rounded-full flex items-center justify-center hover:scale-110 transition-transform mb-2"
                                  title="View Full Size"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            </div>
                            <div className="mt-3 text-center">
                              <span className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] break-words line-clamp-2">
                                {img.fieldLabel}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
